import { expect } from 'chai';
import { AccountUtil, NetworkType } from '../src';

describe('AccountUtil', () => {

    const mnemonicStr = 'other price cactus leave limit human earth achieve secret cry mad cliff';
    const passwordStr = 'password';
    const protectedSeed = '04f15a6cc86a6677805eafcf89a8b90492edd3af561b6413fa4889206866b4d8a9b580da439277374044908f33b3f63530f207d2ebd590b7dcbf627994564eeb';
    const extendedKeyBase58 = 'xprv9s21ZrQH143K2YWV24F9ZwQBWvHbgiYsdHxUgoQQURRM9TTvaFZYpy8aK1kXhMb6SVmbzsa4jtpVtvA8hzP8scQG66KiUGqdTMG4CnyXZ7z';
    const accountPriKey = '827bff83d9ad6f569b353e4fe26539fe3de4a3878bc883607d095be7f15a1fb5';
    const accountPubKey = '84aa0dd4b2b14175faa5f0465af821017c24c675260fb84f4c672a1dd42432bb';
    const childAccPriKey = '22c2885e0c7d6753180e0d1b75722b356061f87eebaadb073d06f05a4c3684c5';
    const childAccPubKey = 'e80d0bb6a847a6eba908a8a33e65926058aec3e084a2ad9ba9c671abc3803a2c';
    const accIndex0Address = 'NAFO3LOLJZP5HQYQTCAMN5ASUIJ23CTH34BPZJA';
    const accIndex0NetWorkType = NetworkType.MAIN_NET;
    const accIndex0PrivKey = '22C2885E0C7D6753180E0D1B75722B356061F87EEBAADB073D06F05A4C3684C5';
    const accIndex0PubKey = 'E80D0BB6A847A6EBA908A8A33E65926058AEC3E084A2AD9BA9C671ABC3803A2C';

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
        const result = AccountUtil.getAccountAtIndex(wallet, 0, NetworkType.MAIN_NET);
        expect(result).to.not.be.undefined;
        expect(result.address.plain()).equals(accIndex0Address);
        expect(result.address.networkType).equals(accIndex0NetWorkType);
        expect(result.privateKey).equals(accIndex0PrivKey);
        expect(result.publicKey).equals(accIndex0PubKey);
    });
});