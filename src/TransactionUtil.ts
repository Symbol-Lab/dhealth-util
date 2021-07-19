import {
    Account,
    AccountUtil,
    Address,
    BlockchainUtil,
    Deadline,
    Mosaic,
    MosaicId,
    MosaicUtil,
    NamespaceId,
    NetworkConfig,
    NetworkType,
    NetworkUtil,
    PlainMessage,
    RepositoryFactoryHttp,
    SignedTransaction,
    Transaction,
    TransactionAnnounceResponse,
    TransactionGroup,
    TransactionSearchCriteria,
    TransactionType,
    TransferTransaction,
    UInt64
} from ".";
import { map, mergeMap, filter, toArray } from 'rxjs/operators';

export class TransactionUtil {
    public static async sendTransferTransaction(
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
        const signedTransaction = await this.signTransaction(account, transferTransaction);
        console.log('Payload:', signedTransaction.payload);
        console.log('Transaction Hash:', signedTransaction.hash);

        const response = (await this.announceTransaction(signedTransaction));
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
            Deadline.create(NetworkConfig.networks[networkType].networkConfigurationDefaults.epochAdjustment),
            Address.createFromRawAddress(recipientAddress),
            aliasedMosaics,
            PlainMessage.create(plainMessage),
            networkType,
            UInt64.fromUint(maxFee),
        );
    }

    public static async signTransaction(account: Account, transaction: Transaction) {
        const networkType = transaction.networkType;
        const networkGenerationHash = NetworkConfig.networks[networkType].networkConfigurationDefaults.generationHash;
        const signedTransaction = account.sign(
            transaction,
            networkGenerationHash,
        );
        return signedTransaction;
    }

    public static async announceTransaction(signedTransaction: SignedTransaction): Promise<TransactionAnnounceResponse> {
        const networkType = signedTransaction.networkType;
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const response = transactionHttp.announce(signedTransaction)
        return response.toPromise();
    }

    /**
     * More about TransactionSearchCriteria:
     * https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html
     * @param networkType
     * @param searchCriteria
     * @returns all transactions that meet the search criteria
     */
    public static async getTransactions(networkType: NetworkType ,searchCriteria: TransactionSearchCriteria) {
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const page = await transactionHttp.search(searchCriteria).toPromise();
        return page.data;
    }

    /**
     * Get incoming transactions from address.
     * @param rawAddress
     * @param group
     * @param pageNumber
     * @param pageSize
     * @param mosaicIdHex
     * @returns all incoming transactions
     */
    public static async getIncomingTransactions(rawAddress: string, group: TransactionGroup, pageNumber: number, pageSize: number, mosaicIdHex?: string) {
        const address = Address.createFromRawAddress(rawAddress);
        const networkType = NetworkUtil.getNetworkTypeFromAddress(rawAddress);
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const searchCriteria = {
            recipientAddress: address,
            group: group,
            pageNumber: pageNumber,
            pageSize: pageSize,
            mosaicIdHex: mosaicIdHex
        };
        const page = await transactionHttp.search(searchCriteria).toPromise();
        return page.data;
    }

    /**
     * Get outgoing transactions from address.
     * @param rawAddress
     * @param signerPubKey
     * @param group
     * @param pageNumber
     * @param pageSize
     * @param mosaicIdHex
     * @returns all outgoing transactions
     */
    public static async getOutgoingTransactions(rawAddress: string, group: TransactionGroup, pageNumber: number, pageSize: number, mosaicIdHex?: string) {
        const networkType = NetworkUtil.getNetworkTypeFromAddress(rawAddress);
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        const signerPubKey = await AccountUtil.getPublicKeyFromAddress(rawAddress);
        const searchCriteria = {
            signerPublicKey: signerPubKey,
            group: group,
            pageNumber: pageNumber,
            pageSize: pageSize,
            mosaicIdHex: mosaicIdHex
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
        const mosaicInfo = await MosaicUtil.getMosaicInfo(networkType, options.mosaicIdHex);
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

    public static async getTimestampFromTransaction(transaction: Transaction) {
        if (!transaction.transactionInfo) {
            throw new Error("Transaction object doesn't have transactionInfo value");
        }
        const height = transaction.transactionInfo.height;
        const networkType = transaction.networkType;
        const block = await BlockchainUtil.getBlockByHeightUInt64(networkType, height);
        const timestamp = NetworkUtil.getNetworkTimestampFromUInt64(networkType, block.timestamp);
        return timestamp;
    }
}