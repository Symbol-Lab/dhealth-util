import { expect } from 'chai';
import { AccountRepository, AccountUtil, NetworkConfig, NetworkType, NetworkUtil } from '../src';
import * as sinon from 'sinon';
import { AccountHttp, AccountInfo, AccountType, Address, RepositoryFactoryHttp, SupplementalPublicKeys, UInt64 } from 'symbol-sdk';
import { of } from 'rxjs';

describe('AccountUtil', () => {

    const mnemonicStr = 'other price cactus leave limit human earth achieve secret cry mad cliff';
    const passwordStr = 'password';
    const protectedSeed = '04f15a6cc86a6677805eafcf89a8b90492edd3af561b6413fa4889206866b4d8a9b580da439277374044908f33b3f63530f207d2ebd590b7dcbf627994564eeb';
    const extendedKeyBase58 = 'xprv9s21ZrQH143K2YWV24F9ZwQBWvHbgiYsdHxUgoQQURRM9TTvaFZYpy8aK1kXhMb6SVmbzsa4jtpVtvA8hzP8scQG66KiUGqdTMG4CnyXZ7z';
    const accountAddress = 'NCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4JQ';
    const accountPriKey = '827bff83d9ad6f569b353e4fe26539fe3de4a3878bc883607d095be7f15a1fb5';
    const accountPubKey = '84aa0dd4b2b14175faa5f0465af821017c24c675260fb84f4c672a1dd42432bb';
    const childAccPriKey = '22c2885e0c7d6753180e0d1b75722b356061f87eebaadb073d06f05a4c3684c5';
    const childAccPubKey = 'e80d0bb6a847a6eba908a8a33e65926058aec3e084a2ad9ba9c671abc3803a2c';
    const networkType = NetworkType.MAIN_NET;
    const accIndex0Address = 'NAFO3LOLJZP5HQYQTCAMN5ASUIJ23CTH34BPZJA';
    const accIndex0PrivKey = '22C2885E0C7D6753180E0D1B75722B356061F87EEBAADB073D06F05A4C3684C5';
    const accIndex0PubKey = 'E80D0BB6A847A6EBA908A8A33E65926058AEC3E084A2AD9BA9C671ABC3803A2C';
    const validAddress = 'NCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4JQ';
    const invalidAddress = 'NCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4J';

    it('generate HD wallet mnemonic', async () => {
        const result = AccountUtil.generateHDWalletMnemonic();
        expect(result.plain).to.not.be.undefined;
    });

    it('generate protected seed from mnemonic', async () => {
        const result = AccountUtil.generateProtectedSeedFromMnemonic(mnemonicStr, passwordStr);
        expect(result).to.not.be.undefined;
        expect(result).equals(protectedSeed);
    });

    it('get HD wallet from protected seed', async () => {
        const result = AccountUtil.getHDWalletFromProtectedSeed(protectedSeed, passwordStr);
        //TODO: to add checks
        expect(result).to.not.be.undefined;
        // expect(result.extendedKey.toBase58()).equals(extendedKeyBase58);
        // expect(result.getAccountPrivateKey()).equals(accountPriKey);
        // expect(result.getAccountPublicKey()).equals(accountPubKey);
        // expect(result.getChildAccountPrivateKey()).equals(childAccPriKey);
        // expect(result.getChildAccountPublicKey()).equals(childAccPubKey);
    });

    it('get HD wallet from mnemonic', async () => {
        const result = AccountUtil.getHDWalletFromMnemonic(mnemonicStr);
        expect(result).to.not.be.undefined;
        expect(result.extendedKey.toBase58()).equals(extendedKeyBase58);
        expect(result.getAccountPrivateKey()).equals(accountPriKey);
        expect(result.getAccountPublicKey()).equals(accountPubKey);
        expect(result.getChildAccountPrivateKey()).equals(childAccPriKey);
        expect(result.getChildAccountPublicKey()).equals(childAccPubKey);
    });

    it('get account at index', async () => {
        const wallet = AccountUtil.getHDWalletFromMnemonic(mnemonicStr);
        const result = AccountUtil.getAccountAtIndex(wallet, 0, networkType);
        expect(result).to.not.be.undefined;
        expect(result.address.plain()).equals(accIndex0Address);
        expect(result.address.networkType).equals(networkType);
        expect(result.privateKey).equals(accIndex0PrivKey);
        expect(result.publicKey).equals(accIndex0PubKey);
    });

    it('generate account', async () => {
        const account = AccountUtil.generateAccount(networkType);
        expect(account).to.not.be.undefined;
        expect(account.networkType === networkType);
    });

    it('generate account with private key', async () => {
        const account = AccountUtil.generateNewAccountWithPrivateKey(accountPriKey, networkType);
        expect(account).to.not.be.undefined;
        expect(account.networkType).equals(networkType);
        expect(account.privateKey.toLocaleLowerCase()).equals(accountPriKey);
        expect(account.publicKey.toLowerCase()).equals(accountPubKey);
        expect(account.address.plain()).equals(accountAddress);
        expect(account.address.networkType).equals(networkType);
    });

    it('get account info', async () => {
        const stub1 = sinon.stub(NetworkUtil, 'getNetworkTypeFromAddress').returns(
            NetworkType.MAIN_NET
        );
        const stub2 = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(
            Promise.resolve(
                NetworkConfig.defaultMainnetNetworkConfig.nodes[0]
            )
        );
        const accountHttp = new AccountHttp('test');
        const stub3 = sinon.stub(RepositoryFactoryHttp.prototype, 'createAccountRepository').returns(
            accountHttp
        )
        const accountInfo = new AccountInfo(
            1,
            '1',
            Address.createFromRawAddress(accountAddress),
            new UInt64([1,2]),
            accountPubKey,
            new UInt64([1,2]),
            AccountType.Main,
            new SupplementalPublicKeys(),
            [],
            [],
            new UInt64([1,2]),
            new UInt64([1,2])
        );
        const stub5 = sinon.stub(AccountHttp.prototype, 'getAccountInfo').returns(
            of(accountInfo)
        );
        const result = await AccountUtil.getAccountInfo(accountAddress);
        expect(result).to.not.be.undefined;
        expect(result.publicKey).equals(accountPubKey);
        sinon.assert.callOrder(stub1, stub2, stub3, stub5);
    });

    it('get wallet address from public key', async () => {
        const result = AccountUtil.getWalletAddressFromPublicKey(accountPubKey, networkType);
        expect(result).to.not.be.undefined;
        expect(result.networkType).equals(networkType);
        expect(result.plain()).equals(accountAddress);
    });

    it('get publicKey from address', async () => {
        sinon.stub(AccountUtil, 'getAccountInfo').callsFake((rawAddress: string) => {
            return Promise.resolve(
                new AccountInfo(
                    1,
                    '1',
                    Address.createFromRawAddress(accountAddress),
                    new UInt64([1,2]),
                    accountPubKey,
                    new UInt64([1,2]),
                    AccountType.Main,
                    new SupplementalPublicKeys(),
                    [],
                    [],
                    new UInt64([1,2]),
                    new UInt64([1,2])
                )
            )
        });
        const result = await AccountUtil.getPublicKeyFromAddress(accountAddress);
        expect(result).to.not.be.undefined;
        expect(result).equals(accountPubKey);
    });

    it('is address valid', async () => {
        const result = AccountUtil.isAddressValid(validAddress);
        const result2 = AccountUtil.isAddressValid(invalidAddress);
        expect(result).to.be.true;
        expect(result2).to.be.false;
    });
});