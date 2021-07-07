import { Account, Address, Deadline, Mosaic, MosaicId, MosaicUtil, NamespaceId, NetworkType, PlainMessage, RepositoryFactoryHttp, SignedTransaction, Transaction, TransactionAnnounceResponse, TransactionGroup, TransactionService, TransactionType, TransferTransaction, UInt64 } from "./";
import * as config from './NetworkConfig';
import { NetworkUtil } from "./NetworkUtil";
import { NetworkConfig } from ".";
import { Observable } from "rxjs";
import { map, mergeMap, filter, toArray } from 'rxjs/operators';

export class TransactionUtil {
    public static async sendTransferTransaction(
        nodeUrl: string,
        networkType: NetworkType,
        privateKey: string,
        recipientAddress: string, 
        mosaicDetails: Array<{namespaceId: string, amount: number}>,
        plainMessage: string, 
        maxFee: number
    ) {
        let aliasedMosaics = [];
        for (const mosaicDetail of mosaicDetails) {
            const aliasedMosaic = this.getMosaicFromNamespace(mosaicDetail.namespaceId, mosaicDetail.amount);
            aliasedMosaics.push(aliasedMosaic);
        }
        const transferTransaction = await this.createTransferTransaction(networkType, recipientAddress, aliasedMosaics, plainMessage, maxFee);
        const account = Account.createFromPrivateKey(privateKey, networkType);
        const signedTransaction = await this.signTransaction(networkType, account, transferTransaction);
        console.log('Payload:', signedTransaction.payload);
        console.log('Transaction Hash:', signedTransaction.hash);

        const response = (await this.announceTransaction(networkType, signedTransaction));
        return response;
    }

    public static getMosaicFromNamespace(namespaceId: string, amount: number) {
        const aliasedMosaic = new Mosaic(
            new NamespaceId(namespaceId),
            UInt64.fromUint(amount),
        );
        return aliasedMosaic;
    }

    public static async createTransferTransaction(networkType: NetworkType, recipientAddress: string, aliasedMosaics: Mosaic[], plainMessage: string, maxFee: number) {
        return TransferTransaction.create(
            Deadline.create(config.networks[networkType].networkConfigurationDefaults.epochAdjustment),
            Address.createFromRawAddress(recipientAddress),
            aliasedMosaics,
            PlainMessage.create(plainMessage),
            networkType,
            UInt64.fromUint(maxFee),
        );
    }

    public static async signTransaction(networkType: NetworkType, account: Account, transaction: Transaction) {
        const networkGenerationHash = NetworkConfig.networks[networkType].networkConfigurationDefaults.generationHash;
        const signedTransaction = account.sign(
            transaction,
            networkGenerationHash,
        );
        return signedTransaction;
    }

    public static async announceTransaction(networkType: NetworkType, signedTransaction: SignedTransaction): Promise<TransactionAnnounceResponse> {
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const response = transactionHttp.announce(signedTransaction)
        return response.toPromise();
    }

    public static async getTransactions(nodeUrl: string, group: TransactionGroup, rawAddress: string, pageNumber: number, pageSize: number, id?: string) {
        const address = Address.createFromRawAddress(rawAddress);
        const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const searchCriteria = {
            group: group,
            address,
            pageNumber: pageNumber,
            pageSize: pageSize,
            id: id
        };
        const page = await transactionHttp.search(searchCriteria).toPromise();
        return page.data;
    }

    public static async getMosaicSent(options: {
        signerPubKey: string, recipientRawAddress: string, mosaicIdHex: string
    }) {
        const networkType = NetworkUtil.getNetworkTypeFromAddress(options.recipientRawAddress);
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const signerPublicKey = options.signerPubKey;
        const recipientAddress = options.recipientRawAddress ? Address.createFromRawAddress(options.recipientRawAddress) : undefined;
        const mosaicInfo = await MosaicUtil.getMosaicInfo(node.url, options.mosaicIdHex);
        const divisibility = mosaicInfo.divisibility;
        const mosaicId = options.mosaicIdHex ? new MosaicId(options.mosaicIdHex) : undefined;
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const transactionHttp = repositoryFactory.createTransactionRepository();

        const searchCriteria = {
            group: TransactionGroup.Confirmed,
            signerPublicKey,
            recipientAddress,
            pageSize: 100,
            pageNumber: 1,
            type: [TransactionType.TRANSFER],
        };

        transactionHttp
        .search(searchCriteria)
        .pipe(
        map((_) => _.data),
        // Process each transaction individually.
        mergeMap((_) => _),
        // Map transaction as transfer transaction.
        map((_) => _ as TransferTransaction),
        // Filter transactions containing a given mosaic
        filter((_) => mosaicId ? _.mosaics.length === 1 && _.mosaics[0].id.equals(mosaicId) : true),
        // Transform absolute amount to relative amount.
        map((_) => _.mosaics[0].amount.compact() / Math.pow(10, divisibility)),
        // Add all amounts into an array.
        toArray(),
        // Sum all the amounts.
        map((_) => _.reduce((a: any, b: any) => a + b, 0)),
        )
        .subscribe(
            (total) =>
                console.log(
                'Total:',
                total,
                ),
            (err) => console.error(err),
        );
    }
}