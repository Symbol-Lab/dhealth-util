const dhealth_utils = require('./lib/cjs/index');
const SimpleWallet = dhealth_utils.SimpleWallet;

run();
runHD();
query();

async function run() {
    const addr = dhealth_utils.AccountUtil.getWalletAddressFromPublicKey('D9D69E7F6685BE1F337AF85A3F46E08431A356B4E23293CFBE25E9A8797C0B67', dhealth_utils.NetworkType.MAIN_NET);
    console.log(addr);
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
    result = await dhealth_utils.TransactionUtil.getIncommingTransactions(
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
    await dhealth_utils.TransactionUtil.sendTransferTransaction(
        104,
        '486D6CF5798C0B9BD1107BA622190372F018ABB5A4712F72A92222D3403D5EC3',
        'NBNEW47D2U74UO3CI2K53K3GMEXDXOI4VC6COUA',
        [{namespaceId: 'dhealth.dhp', amount: 0}],
        `00000000000000000000000000000000d001010801120b41636d6520506861726d6118b9db9ec30722060890e09088062a3868747470733a2f2f61636d652e6869742e666f756e646174696f6e2f7265646361702f737572766579732f3f733d585937544b4c584c43593080ade204a81f01b201244c69666520776974682068656d6f7068696c69613a20496e697469616c20737572766579ba013c4f626a6563746976653a20556e6465727374616e6420746865206368616c6c656e676573206f662068656d6f7068696c69612070617469656e74732ec001d08c01e2014035363630363741383335443546333332384335333246364146454537444538373836314637333638354136443942324234373435304245334535303737323742`,
        100000
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

async function query() {
    const c = new dhealth_utils.Constants(
        dhealth_utils.NetworkType.MAIN_NET,
        'ND5SGD5Y6NYY4ZG7EG32BS36LDY237BL3Y3U3RA',
        'NBNEW47D2U74UO3CI2K53K3GMEXDXOI4VC6COUA'
    );
    const a = new dhealth_utils.AccountHttp(
        (await dhealth_utils.NetworkUtil.getNodeFromNetwork(dhealth_utils.NetworkType.MAIN_NET)).url
    );
    const ds = new dhealth_utils.DHealthService(c, a);
    const qs = new dhealth_utils.QueryService(c, ds);
    await qs.updateQUeryInfoList()
    const qil = await qs.getQueryInfoList();
    console.log('===== queries list: ===== : ', qil);
    console.log('===== number of queries: =====', await qs.getNumberQuery());
}