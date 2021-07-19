import { Account, Address, NetworkType, RepositoryFactoryHttp } from 'symbol-sdk';
import { ExtendedKey, MnemonicPassPhrase, Network, Wallet } from 'symbol-hd-wallets';
import { NetworkUtil } from './'


export class AccountUtil {
    public static generateHDWalletMnemonic() {
        return MnemonicPassPhrase.createRandom('english', 128);
    }

    public static generateProtectedSeedFromMnemonic(words: string, password: string) {
        const mnemonic = new MnemonicPassPhrase(words);
        const protectedSeed = mnemonic.toSeed(password);
        return protectedSeed.toString('hex');
    }

    public static getHDWalletFromProtectedSeed(protectedSeed: string, password: string) {
        const xkey = ExtendedKey.createFromSeed(protectedSeed, Network.SYMBOL);
        const wallet = new Wallet(xkey);
        return wallet;
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

    public static getWalletAddressFromPublicKey(publicKey: string, network: NetworkType) {
        return Address.createFromPublicKey(publicKey, network);
    }

    public static async getPublicKeyFromAddress(rawAddress: string) {
        const accountInfo = await AccountUtil.getAccountInfo(rawAddress);
        return accountInfo.publicKey;
    }

    public static isAddressValid(rawAddress: string) {
        return Address.isValidRawAddress(rawAddress);
    }
}