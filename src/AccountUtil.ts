import { Account, Address, MosaicId, NetworkType, RepositoryFactoryHttp, TransactionGroup, TransactionType, TransferTransaction } from 'symbol-sdk';
import { ExtendedKey, MnemonicPassPhrase, Network, Wallet } from 'symbol-hd-wallets';
import { map, mergeMap, filter, toArray } from 'rxjs/operators';
import { MosaicUtil, NetworkUtil } from './'


export class AccountUtil {
    public static generateHDWalletMnemonic() {
        return MnemonicPassPhrase.createRandom('english', 128);
    }

    public static getHDWalletFromMnemonic(words: string) {
        const mnemonic = new MnemonicPassPhrase(words);
        const bip32Seed = mnemonic.toSeed(); // using empty password
        const xkey = ExtendedKey.createFromSeed(bip32Seed.toString('hex'), Network.SYMBOL);
        const wallet = new Wallet(xkey);
        return wallet;
    }

    public static getAccountAtIndex(wallet: Wallet, index: number, networkType: NetworkType) {
        const privateKey = wallet.getChildAccountPrivateKey(`m/44/4343/0/0/${index}`);
        const account = this.generateNewAccountWithPrivateKey(privateKey, networkType);
        return account;
    }

    public static generateAccount(networkType: NetworkType) {
        const account = Account.generateNewAccount(networkType);
        return account;
    }

    public static generateNewAccountWithPrivateKey(privateKey: string, networkType: NetworkType) {
        const account = Account.createFromPrivateKey(privateKey, networkType);
        return account;
    }

    public static async getAccountInfo(rawAddress: string) {
        const networkType = NetworkUtil.getNetworkTypeFromAddress(rawAddress);
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const address = Address.createFromRawAddress(rawAddress);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const accountHttp = repositoryFactory.createAccountRepository();
        return await accountHttp.getAccountInfo(address).toPromise();
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

    public static getWalletAddressFromPublicKey(publicKey: string, network: NetworkType) {
        return Address.createFromPublicKey(publicKey, network);
    }

    public static isAddressValid(rawAddress: string) {
        return Address.isValidRawAddress(rawAddress);
    }
}