import { expect } from 'chai';
import * as sinon from 'sinon';
import { of } from 'rxjs';
import {TestConstants} from './TestConstant.spec';
import { AccountHttp, AccountInfo, AccountType, AccountUtil, Address, NetworkConfig, NetworkType, NetworkUtil, RepositoryFactoryHttp, SupplementalPublicKeys, UInt64 } from '../src';

describe('AccountUtil', () => {

    after(() => {
        sinon.restore();
    });

    it('generate HD wallet mnemonic', async () => {
        const result = AccountUtil.generateHDWalletMnemonic();
        expect(result.plain).to.not.be.undefined;
    });

    it('generate protected seed from mnemonic', async () => {
        const result = AccountUtil.generateProtectedSeedFromMnemonic(
            TestConstants.mnemonicStr, TestConstants.passwordStr
        );
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.protectedSeed);
    });

    it('get HD wallet from protected seed', async () => {
        const result = AccountUtil.getHDWalletFromProtectedSeed(
            TestConstants.protectedSeed, TestConstants.passwordStr
        );
        //TODO: to add checks
        expect(result).to.not.be.undefined;
        // expect(result.extendedKey.toBase58()).equals(extendedKeyBase58);
        // expect(result.getAccountPrivateKey()).equals(accountPriKey);
        // expect(result.getAccountPublicKey()).equals(accountPubKey);
        // expect(result.getChildAccountPrivateKey()).equals(childAccPriKey);
        // expect(result.getChildAccountPublicKey()).equals(childAccPubKey);
    });

    it('get HD wallet from mnemonic', async () => {
        const result = AccountUtil.getHDWalletFromMnemonic(TestConstants.mnemonicStr);
        expect(result).to.not.be.undefined;
        expect(result.extendedKey.toBase58()).equals(TestConstants.extendedKeyBase58);
        expect(result.getAccountPrivateKey()).equals(TestConstants.accountPriKey);
        expect(result.getAccountPublicKey()).equals(TestConstants.accountPubKey);
        expect(result.getChildAccountPrivateKey()).equals(TestConstants.childAccPriKey);
        expect(result.getChildAccountPublicKey()).equals(TestConstants.childAccPubKey);
    });

    it('get account at index', async () => {
        const wallet = AccountUtil.getHDWalletFromMnemonic(TestConstants.mnemonicStr);
        const result = AccountUtil.getAccountAtIndex(wallet, 0, TestConstants.networkType);
        expect(result).to.not.be.undefined;
        expect(result.address.plain()).equals(TestConstants.accIndex0Address);
        expect(result.address.networkType).equals(TestConstants.networkType);
        expect(result.privateKey).equals(TestConstants.accIndex0PrivKey);
        expect(result.publicKey).equals(TestConstants.accIndex0PubKey);
    });

    it('generate account', async () => {
        const account = AccountUtil.generateAccount(TestConstants.networkType);
        expect(account).to.not.be.undefined;
        expect(account.networkType).equals(TestConstants.networkType);
    });

    it('generate account with private key', async () => {
        const account = AccountUtil.generateNewAccountWithPrivateKey(
            TestConstants.accountPriKey, TestConstants.networkType
        );
        expect(account).to.not.be.undefined;
        expect(account.networkType).equals(TestConstants.networkType);
        expect(account.privateKey.toLocaleLowerCase()).equals(TestConstants.accountPriKey);
        expect(account.publicKey.toLowerCase()).equals(TestConstants.accountPubKey);
        expect(account.address.plain()).equals(TestConstants.accountAddress);
        expect(account.address.networkType).equals(TestConstants.networkType);
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
            Address.createFromRawAddress(TestConstants.accountAddress),
            new UInt64([1,2]),
            TestConstants.accountPubKey,
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
        const result = await AccountUtil.getAccountInfo(TestConstants.accountAddress);
        expect(result).to.not.be.undefined;
        expect(result.publicKey).equals(TestConstants.accountPubKey);
        sinon.assert.callOrder(stub1, stub2, stub3, stub5);
    });

    it('get wallet address from public key', async () => {
        const result = AccountUtil.getWalletAddressFromPublicKey(
            TestConstants.accountPubKey, TestConstants.networkType
        );
        expect(result).to.not.be.undefined;
        expect(result.networkType).equals(TestConstants.networkType);
        expect(result.plain()).equals(TestConstants.accountAddress);
    });

    it('get publicKey from address', async () => {
        sinon.stub(AccountUtil, 'getAccountInfo').callsFake((rawAddress: string) => {
            return Promise.resolve(
                new AccountInfo(
                    1,
                    '1',
                    Address.createFromRawAddress(TestConstants.accountAddress),
                    new UInt64([1,2]),
                    TestConstants.accountPubKey,
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
        const result = await AccountUtil.getPublicKeyFromAddress(TestConstants.accountAddress);
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.accountPubKey);
    });

    it('is address valid', async () => {
        const result = AccountUtil.isAddressValid(TestConstants.validAddress);
        const result2 = AccountUtil.isAddressValid(TestConstants.invalidAddress);
        expect(result).to.be.true;
        expect(result2).to.be.false;
    });
});