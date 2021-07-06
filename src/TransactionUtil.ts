import { Account, Address, Deadline, Mosaic, NamespaceId, NetworkType, PlainMessage, RepositoryFactoryHttp, SignedTransaction, Transaction, TransactionAnnounceResponse, TransactionService, TransferTransaction, UInt64 } from "symbol-sdk";
import * as config from './NetworkConfig';
import { NetworkUtil } from "./NetworkUtil";
import { NetworkConfig } from ".";
import { Observable } from "rxjs";

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

        const response = (await this.announceTransaction(networkType, signedTransaction)).toPromise();
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

    public static async announceTransaction(networkType: NetworkType, signedTransaction: SignedTransaction): Promise<Observable<TransactionAnnounceResponse>> {
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const response = transactionHttp.announce(signedTransaction)
        return response;
    }
}