const { NetworkType, TransferTransaction } = require('@dhealth/sdk');
const dhealth_utils = require('./lib/cjs/index');
const SimpleWallet = dhealth_utils.SimpleWallet;

run();
runHD();

async function run() {
    /**
     * create account
     */
    const acc = dhealth_utils.AccountUtil.generateAccount(152);
    console.log("Generated account's address: ", acc.address.address);
    console.log("Generated account's privKey: ", acc.privateKey.toString());

    const privateKey = acc.privateKey.toString();

    const accCHeck = dhealth_utils.AccountUtil.generateNewAccountWithPrivateKey(privateKey, 152);
    console.log("Generated account's address: ", accCHeck.address.address);
    console.log("Generated account's privKey: ", accCHeck.privateKey.toString());

    /**
     * Get Account info
     */
    let result = await dhealth_utils.AccountUtil.getAccountInfo('TA4J3PTVAHIVWDG3G7DOH3BAW7HWSKIQJWHIBNY');
    console.log(result.mosaics);

    await dhealth_utils.TransactionUtil.getMosaicSent({
        recipientRawAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
        mosaicIdHex: '5A4935C1D66E6AC4'
    });

    /**
     * Get Address from public key
     */
    const address = dhealth_utils.AccountUtil.getWalletAddressFromPublicKey('414C930BB85456B6A3D03EEA025532F6D54F3A763612072895FC5808ED9367FD', dhealth_utils.NetworkType.TEST_NET);
    console.log(address);

    /**
     * Get mosaic info
     */
    result = await dhealth_utils.MosaicUtil.getMosaicInfo(dhealth_utils.NetworkType.TEST_NET, '5A4935C1D66E6AC4');
    console.log(result);

    /**
     * Get transactions
     */
    result = await dhealth_utils.TransactionUtil.getIncomingTransactions(
        'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ', 'confirmed', 1, 1, '5A4935C1D66E6AC4'
    );
    console.log(JSON.stringify(result));

    result = await dhealth_utils.TransactionUtil.getOutgoingTransactions(
        'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ', 'confirmed', 1, 1, '5A4935C1D66E6AC4'
    );
    console.log(result);

    /**
     * Get timestamp from transaction
     */
    const timestamp = await dhealth_utils.TransactionUtil.getTimestampFromTransaction(result[0]);
    console.log(timestamp);

    /**
     * Get network timestamp
     */
    const block = await dhealth_utils.BlockchainUtil.getBlockByHeightUInt64(
        dhealth_utils.NetworkType.TEST_NET,
        result[0].transactionInfo.height
    );
    const timestampUInt64 = block.timestamp;
    const networkTimestamp = dhealth_utils.NetworkUtil.getNetworkTimestampFromUInt64(
        dhealth_utils.NetworkType.TEST_NET, timestampUInt64
    )
    console.log(networkTimestamp);

    /**
     * Get latest block
     */
    result = await dhealth_utils.BlockchainUtil.getLatestBlock(dhealth_utils.NetworkType.TEST_NET);
    console.log(result);

    /**
     * Get mosaic ID from namespace
     */
    result = await dhealth_utils.MosaicUtil.getMosaicIdFromNamespace('https://api-01.dhealth.dev:3001', 'dhealth.dhp');
    console.log(result);

    /**
     * create tx
     */
     const privateKey = '008D53A06B75DAB055034F436B85DFA77E027A8485B16C6604C35A1D2483254B';
     const transactionCreationParams = {
       networkType: NetworkType.TEST_NET,
       maxFee: 100000, // 0.1 dhp - 1 million basic units equal 1 dhp
       recipientAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
       mosaicDetails: [{namespaceId: 'dhealth.dhp', amount: 100000}],
       plainMessage: `test create transfer tx - ${new Date().getTime()}`
     }

     const result = await dhealth_utils.TransactionUtil.createAndAnnounceTransaction(
       TransferTransaction,
       transactionCreationParams,
       privateKey
     ).catch(err => {
       console.log(err);
     });

    /**
     * Create mosaic
     */
     await dhealth_utils.MosaicUtil.createMosaic(
        152,
        '09E8303C4D6ECB45F8431A1C27380CB91C941F595A2E5AA6384C73F3AD907126',
        0,
        false,
        true,
        false,
        6,
        100000000
    )
}

function runHD() {
    /**
     * Create mnemonic pass phrase
     */
    const MnemonicPassPhrase = dhealth_utils.AccountUtil.generateHDWalletMnemonic();
    console.log('MnemonicPassPhrase: ', MnemonicPassPhrase);

    /**
     * Create wallet from seed
     */
    const Network = require("symbol-hd-wallets").Network;
    const NetworkType = require("symbol-sdk").NetworkType;
    const Wallet = require("symbol-hd-wallets").Wallet;
    const ExtendedKey = require("symbol-hd-wallets").ExtendedKey;

    const xkey = ExtendedKey.createFromSeed('000102030405060708090a0b0c0d0e0f', Network.SYMBOL);
    const wallet = new Wallet(xkey);

    /**
     * Get master account
     */ 
    const masterAccountPK = wallet.getAccountPrivateKey();
    console.log('masterAccountPK: ', masterAccountPK);

    /**
     * Get default account
     */
    const defaultAccount = wallet.getChildAccountPrivateKey();
    console.log('defaultAccount: ', defaultAccount);

    /**
     * Derive specific child path
     */
    const childAccount = wallet.getChildAccountPrivateKey('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.TEST_NET);
    console.log('childAccount: ', childAccount);

    /**
     * Create SimpleWallet & generate DTO string
     */
    const sw = SimpleWallet.createFromPrivateKey('name', new dhealth_utils.Password('37777777'), childAccount, dhealth_utils.NetworkType.TEST_NET);
    console.log('sw.toDTO(): ', sw.toDTO());
    console.log('base64 DTO: ', Buffer.from(JSON.stringify(sw.toDTO())).toString('base64'));

    // networkType is a number
    const nw = 104;
    const createdWallet = SimpleWallet.createFromPrivateKey(
        'HIT',
        new dhealth_utils.Password('37777777'),
        childAccount,
        nw.valueOf()
    );
    console.log(createdWallet.toDTO());
}