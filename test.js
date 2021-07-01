const { NetworkType } = require('symbol-sdk');
const centiva = require('./lib/cjs/index');
const SimpleWallet = centiva.SimpleWallet;

run();
runHD();

async function run() {
    /**
     * create account
     */
    // const acc = centiva.AccountUtil.generateAccount(152);
    // console.log("Generated account's address: ", acc.address.address);
    // console.log("Generated account's privKey: ", acc.privateKey.toString());

    // const pk = acc.privateKey.toString();
    // const pklc = pk.toLowerCase();
    // console.log('pklc: ', pklc);

    // const accCHeck = centiva.AccountUtil.generateNewAccountWithPrivateKey(pklc, 152);
    // console.log("Generated account's address: ", accCHeck.address.address);
    // console.log("Generated account's privKey: ", accCHeck.privateKey.toString());

    /**
     * Get Account info
     */
    // const result = await centiva.AccountUtil.getAccountInfo('TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ');
    // console.log(result);
    // centiva.AccountUtil.getMosaicSent({
    //     recipientRawAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
    //     mosaicIdHex: '5A4935C1D66E6AC4'
    // });
    // centiva.AccountUtil.getMosaicSent({
    //     nodeUrl: 'http://61.27.29.85:3000',
    //     recipientRawAddress: 'TDG7K4QTI4Z6BDVM7LI2OWMCBS6IA5IKKHXXCGY',
    //     mosaicIdHex: '091F837E059AE13C'
    // });

    /**
     * Get mosaic info
     */
    // const result = await centiva.MosaicUtil.getMosaicInfo('https://api-01.dhealth.dev:3001', '5A4935C1D66E6AC4');
    // console.log(result);

    // const result = await centiva.AccountUtil.getTransactions(
    //     'https://api-01.dhealth.dev:3001', 'confirmed', 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ', 1, 1, '5A4935C1D66E6AC4'
    // );
    // const result = await centiva.AccountUtil.getTransactions(
    //     'http://61.27.29.85:3000', 'confirmed', 'TDG7K4QTI4Z6BDVM7LI2OWMCBS6IA5IKKHXXCGY', 1, 2, '091F837E059AE13C'
    // );
    // console.log(JSON.stringify(result));

    // const result = await centiva.BlockchainUtil.getLatestBlock('https://api-01.dhealth.dev:3001');
    // const result = await centiva.BlockchainUtil.getMosaicIdFromNamespace('https://api-01.dhealth.dev:3001', 'dhealth.dhp');
    // console.log(result);

    /**
     * create tx
     */
    // await centiva.TransactionUtil.sendTransferTransaction(
    //     'http://61.27.29.85:3000',
    //     152, '09E8303C4D6ECB45F8431A1C27380CB91C941F595A2E5AA6384C73F3AD907126',
    //     'TDG7K4QTI4Z6BDVM7LI2OWMCBS6IA5IKKHXXCGY', 'symbol.xym', 100000, 'test create transfer tx from sdk', 100000
    // ).catch(err => {
    //     console.log(err);
    // });

    /**
     * Create mosaic
     */
    //  await centiva.MosaicUtil.createMosaic(
    //     152,
    //     '09E8303C4D6ECB45F8431A1C27380CB91C941F595A2E5AA6384C73F3AD907126',
    //     0,
    //     false,
    //     true,
    //     false,
    //     6,
    //     100000000
    // )
}

function runHD() {
    // var base32 = require('hi-base32');
    // const hdwallet = require('symbol-hd-wallets');
    // const MnemonicPassPhrase = hdwallet.MnemonicPassPhrase;

    // const mnemonic = MnemonicPassPhrase.createRandom();
    // const secureSeedHex = mnemonic.toSeed('your-password');
    
    // console.log('mnemonic: ', mnemonic);
    // console.log('secureSeedHex: ', secureSeedHex.toString('hex'));

    // examples/GeneratingAHDWalletPublicNetworkCompatible.ts

    /** */
    // const Network = require("symbol-hd-wallets").Network;
    // const NetworkType = require("symbol-sdk").NetworkType;
    // const Wallet = require("symbol-hd-wallets").Wallet;
    // const ExtendedKey = require("symbol-hd-wallets").ExtendedKey;

    // const xkey = ExtendedKey.createFromSeed('000102030405060708090a0b0c0d0e0f', Network.SYMBOL);
    // const wallet = new Wallet(xkey);

    // // get master account
    // const masterAccountPK = wallet.getAccountPrivateKey();
    // console.log('masterAccountPK: ', masterAccountPK);

    // // get DEFAULT ACCOUNT
    // const defaultAccount = wallet.getChildAccountPrivateKey();
    // console.log('defaultAccount: ', defaultAccount);

    // // derive specific child path
    // const childAccount = wallet.getChildAccountPrivateKey('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.TEST_NET);
    // console.log('childAccount: ', childAccount);

    // get read-only wallet
    // const readOnlyWallet = new Wallet(xkey.getPublicNode());
    // const readOnlyAccount = readOnlyWallet.getPublicAccount(NetworkType.TEST_NET);

    // get read-only DEFAULT ACCOUNT
    // const readOnlyDefaultAccount = readOnlyWallet.getChildPublicAccount();

    // const mnemonic = centiva.AccountUtil.generateHDWalletMnemonic();
    // console.log(mnemonic.plain);

    // const seed = centiva.AccountUtil.generateProtectedSeedFromMnemonic(mnemonic.plain);
    // console.log('seed: ', seed);
    // const wallet = centiva.AccountUtil.getHDWalletFromMnemonic(mnemonic.plain);
    // const account0 = centiva.AccountUtil.getAccountAtIndex(wallet, 0, NetworkType.TEST_NET);
    // console.log('account privkey: ', account0.privateKey);

    // const sw = SimpleWallet.createFromPrivateKey('name', new centiva.Password('37777777'), account0.privateKey, centiva.NetworkType.TEST_NET);
    // console.log('sw.toDTO(): ', sw.toDTO());
    // console.log('base64 DTO: ', Buffer.from(JSON.stringify(sw.toDTO())).toString('base64'));

    // const nw = 104;
    // const createdWallet = SimpleWallet.createFromPrivateKey(
    //     'HIT',
    //     new centiva.Password('37777777'),
    //     account0.privateKey,
    //     nw.valueOf()
    // );
    // console.log(createdWallet.toDTO());
}