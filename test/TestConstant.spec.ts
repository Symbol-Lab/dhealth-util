import { NetworkType, UInt64 } from "../src";

export class TestConstants {
    static mnemonicStr = 'other price cactus leave limit human earth achieve secret cry mad cliff';
    static passwordStr = 'password';
    static protectedSeed = '04f15a6cc86a6677805eafcf89a8b90492edd3af561b6413fa4889206866b4d8a9b580da439277374044908f33b3f63530f207d2ebd590b7dcbf627994564eeb';
    static extendedKeyBase58 = 'xprv9s21ZrQH143K2YWV24F9ZwQBWvHbgiYsdHxUgoQQURRM9TTvaFZYpy8aK1kXhMb6SVmbzsa4jtpVtvA8hzP8scQG66KiUGqdTMG4CnyXZ7z';
    static accountAddress = 'NCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4JQ';
    static accountAddressTESTNET = 'TCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4JQ';
    static accountPriKey = '827bff83d9ad6f569b353e4fe26539fe3de4a3878bc883607d095be7f15a1fb5';
    static accountPubKey = '84aa0dd4b2b14175faa5f0465af821017c24c675260fb84f4c672a1dd42432bb';
    static childAccPriKey = '22c2885e0c7d6753180e0d1b75722b356061f87eebaadb073d06f05a4c3684c5';
    static childAccPubKey = 'e80d0bb6a847a6eba908a8a33e65926058aec3e084a2ad9ba9c671abc3803a2c';
    static networkType = NetworkType.MAIN_NET;
    static accIndex0Address = 'NAFO3LOLJZP5HQYQTCAMN5ASUIJ23CTH34BPZJA';
    static accIndex0PrivKey = '22C2885E0C7D6753180E0D1B75722B356061F87EEBAADB073D06F05A4C3684C5';
    static accIndex0PubKey = 'E80D0BB6A847A6EBA908A8A33E65926058AEC3E084A2AD9BA9C671ABC3803A2C';
    static validAddress = 'NCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4JQ';
    static invalidAddress = 'NCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4J';
    static mosaicIdHex = '5A4935C1D66E6AC4';
    static mosaicNamespace = 'dhealth.dhp';

    static blockHeigh = new UInt64([1, 2]);
}