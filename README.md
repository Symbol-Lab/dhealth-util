<h1 align="center">dHealth-utils - The dHealth chain utility.</h1>

<p align="center">
  <img src="https://dhealth.network/wp-content/uploads/2021/08/dHealth-Network-Logo-blue.png" alt="angular-logo" width="277" height="57"/>
  <br>
  <i>dHealth chain utility is a development library for performing operations and writing applications
  <br> on dHealth network using Typescript and JavaScript.</i>
  <br>
</p>

<p align="center">
  <a href="https://www.dhealth.network"><strong>www.dhealth.network</strong></a>
  <br>
</p>

<p align="center">
  <!-- <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  · -->
  <a href="https://github.com/dHealth-Symbol-Lab/dhealth-utils/issues">Submit an Issue</a>
  .
  <a href="https://dhealth.network/resources">Resources</a>
  .
  <a href="https://dhealth.network/news">News</a>
  <br>
  <br>
</p>

<p align="center">
  <a href="https://github.com/dHealth-Symbol-Lab/dhealth-utils">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/dHealth-Symbol-Lab/dhealth-utils?label=Github&logo=github&color=success">
  </a>&nbsp;
  <a href="https://www.npmjs.com/package/dhealth-utils">
    <img alt="npm" src="https://img.shields.io/npm/v/dhealth-utils?label=NPM%20Package&logo=npm&color=success">
  </a>&nbsp;
  <a href="https://circleci.com/gh/dHealth-Symbol-Lab/dhealth-utils/tree/main">
    <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/dHealth-Symbol-Lab/dhealth-utils/main?logo=circleci&logoColor=success">
  </a><br>
  <a href='https://coveralls.io/github/dHealth-Symbol-Lab/dhealth-utils'>
    <img alt="Coveralls" src="https://img.shields.io/coveralls/github/dHealth-Symbol-Lab/dhealth-utils?logo=coveralls">
  </a>&nbsp;
  <a href="https://t.me/dHealthCommunity">
    <img src="https://img.shields.io/badge/Telegram-dHealthCommunity-informational?style=flat&logo=telegram" />
  </a>
  <br>
</p>

<hr>

## Installation

### Prerequisites

- Install [Node.js] which includes [Node Package Manager][npm]

### npm
```sh
npm i dhealth-utils
```

### yarn
```sh
yarn add dhealth-utils
```

## Import

### Typescript
```ts
import {...} from 'dhealth-utils';
```

### Javascript
```js
const dhealth_utils = require('dhealth-utils');
```
<!------------------------------------>
<!-- COLLAPSIBLE SECTIONS FOR USAGE -->
<!------------------------------------>

## Usage

<!-- HD Wallet -->
### <b>HD Wallet</b>

<details>
<summary>Generate HD wallet mnemonic</summary>

#### Typescript
```ts
const mnemonic = AccountUtils.generateHDWalletMnemonic();
```
#### Javascript

```js
const mnemonic = dhealth_utils.AccountUtils.generateHDWalletMnemonic();
```
</details>

<details>
<summary>Get HD wallet from mnemonic</summary>

#### Typescript
```ts
const wallet = AccountUtils.getHDWalletFromMnemonic('second snow city expect toward flash lava have pulp attack health timber');
```
#### Javascript
```js
const wallet = dhealth_utils.AccountUtils.getHDWalletFromMnemonic('second snow city expect toward flash lava have pulp attack health timber');
```
</details>

<details>
<summary>Get master account private key from HD wallet</summary>

#### Typescript & Javascript
```js
const masterAccountPK = wallet.getAccountPrivateKey();
```
</details>

<details>
<summary>Get default account private key from HD wallet</summary>

#### Typescript & Javascript
```js
const defaultAccountPK = wallet.getChildAccountPrivateKey();
```
</details>

<details>
<summary>Derive specific child-path private key from HD wallet</summary>

#### Typescript & Javascript
```ts
const childAccount = wallet.getChildAccountPrivateKey('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.TEST_NET);
```
</details>

<details>
<summary>Create SimpleWallet on account private key</summary>

#### Typescript
```ts
const privateKey = 'your-private-key';
const simpleWallet = SimpleWallet.createFromPrivateKey('name', new Password('37777777'), privateKey, NetworkType.TEST_NET);
```

#### Javascript
```js
const privateKey = 'your-private-key';
const simpleWallet = dhealth_utils.SimpleWallet.createFromPrivateKey('name', new dhealth_utils.Password('37777777'), privateKey, dhealth_utils.NetworkType.TEST_NET);
```

</details>

<!-- Account -->
### <b>Account</b>

<details>
<summary>Create a new account</summary>

#### Typescript

```ts
const acc = AccountUtil.generateAccount(NetworkType.TEST_NET);
```

#### Javascript
```js
const acc = dhealth_utils.AccountUtil.generateAccount(dhealth_utils.NetworkType.TEST_NET);
```

</details>

<details>
<summary>Get Account info</summary>

#### Typescript
```ts
const accInfo = await AccountUtil.getAccountInfo('TA4J3PTVAHIVWDG3G7DOH3BAW7HWSKIQJWHIBNY');
```

#### Javascript
```ts
const accInfo = await dhealth_utils.AccountUtil.getAccountInfo('TA4J3PTVAHIVWDG3G7DOH3BAW7HWSKIQJWHIBNY');
```
</details>

<details>
<summary>Get Address from public key</summary>

#### Typescript
```ts
const address = AccountUtil.getWalletAddressFromPublicKey('414C930BB85456B6A3D03EEA025532F6D54F3A763612072895FC5808ED9367FD', NetworkType.TEST_NET);
```
#### Javascript
```js
const address = dhealth_utils.AccountUtil.getWalletAddressFromPublicKey('414C930BB85456B6A3D03EEA025532F6D54F3A763612072895FC5808ED9367FD', dhealth_utils.NetworkType.TEST_NET);
```
</details>

<!-- Blockchain -->
### <b>Blockchain</b>

<details>
<summary>Get genesis block</summary>

#### Typescript
```ts
const genesisBlock = await BlockchainUtil.getGenesisBlock(NetworkType.TEST_NET);
```

#### Javascript
```js
const genesisBlock = await dhealth_utils.BlockchainUtil.getGenesisBlock(NetworkType.TEST_NET);
```

</details>

<details>
<summary>Get latest block</summary>

##### Typescript
```ts
const block = await BlockchainUtil.getLatestBlock(NetworkType.TEST_NET);

console.log(block);
```

#### Javascript
```js
const block = await dhealth_utils.BlockchainUtil.getLatestBlock(dhealth_utils.NetworkType.TEST_NET);

console.log(block);
```

</details>

<details>
<summary>Get network timestamp of a block</summary>

#### Typescript
```ts
// block number to get timestamp
const height = 1;

// block instance
const block = await BlockchainUtil.getBlockByHeightUInt64(
    NetworkType.TEST_NET,
    height
);

// block timestamp in normal (dHealth network has a separate timestamp)
const timestampUInt64 = block.timestamp;

// get timestamp of block
const networkTimestamp = NetworkUtil.getNetworkTimestampFromUInt64(
    NetworkType.TEST_NET, timestampUInt64
);

// print result
console.log(networkTimestamp);
```

#### Javascript
```js
// block number to get timestamp
const height = 1;

// block instance
const block = await dhealth_utils.BlockchainUtil.getBlockByHeightUInt64(
    dhealth_utils.NetworkType.TEST_NET,
    height
);

// block timestamp in normal (dHealth network has a separate timestamp)
const timestampUInt64 = block.timestamp;

// get timestamp of block
const networkTimestamp = dhealth_utils.NetworkUtil.getNetworkTimestampFromUInt64(
    dhealth_utils.NetworkType.TEST_NET, timestampUInt64
);

// print result
console.log(networkTimestamp);
```

</details>

<!-- Mosaic -->
### <b>Mosaic</b>
<details>
<summary>Create mosaic</summary>

#### Typescript
```ts
const network = NetworkType.TEST_NET;
const privateKey = '09E8303C4D6ECB45F8431A1C27380CB91C941F595A2E5AA6384C73F3AD907126';
const durationBlock = 0;
const isSupplyMutable = false;
const isTransferable = true;
const isRestrictable = false;
const divisibility = 6;
const supply = 100000000;

const result = await MosaicUtil.createMosaic(
    network,
    privateKey,
    durationBlock,
    isSupplyMutable,
    isTransferable,
    isRestrictable,
    divisibility,
    supply
)
```

#### Javascript
```js
const network = NetworkType.TEST_NET;
const privateKey = '09E8303C4D6ECB45F8431A1C27380CB91C941F595A2E5AA6384C73F3AD907126';
const durationBlock = 0;
const isSupplyMutable = false;
const isTransferable = true;
const isRestrictable = false;
const divisibility = 6;
const supply = 100000000;

const result = await dhealth_utils.MosaicUtil.createMosaic(
    network,
    privateKey,
    durationBlock,
    isSupplyMutable,
    isTransferable,
    isRestrictable,
    divisibility,
    supply
)
```

</details>

<details>
<summary>Get mosaic ID from name</summary>

#### Typescript
```ts
const nodeUrl = 'https://api-01.dhealth.dev:3001';
const mosaicName = 'dhealth.dhp';
const mosaicIdHex = await MosaicUtil.getMosaicIdFromNamespace(nodeUrl, mosaicName);
```

#### Javascript
```js
const nodeUrl = 'https://api-01.dhealth.dev:3001';
const mosaicName = 'dhealth.dhp';
const mosaicIdHex = await dhealth_utils.MosaicUtil.getMosaicIdFromNamespace(nodeUrl, mosaicName);
```

</details>

<details>
<summary>Get mosaic info from ID</summary>

#### Typescript
```ts
const mosaicIdHex = '5A4935C1D66E6AC4';
const mosaicInfo = await MosaicUtil.getMosaicInfo(NetworkType.TEST_NET, mosaicIdHex);
```

#### Javascript
```js
const mosaicIdHex = '5A4935C1D66E6AC4';
const mosaicInfo = await dhealth_utils.MosaicUtil.getMosaicInfo(dhealth_utils.NetworkType.TEST_NET, mosaicIdHex);
```

</details>

<!-- Network -->
### <b>Network</b>
<details>
<summary>Get an available node from network</summary>

#### Typescript
```ts
const node = await NetworkUtil.getNodeFromNetwork(NetworkType.TEST_NET);
```

#### Javascript
```js
const node = await dhealth_utils.NetworkUtil.getNodeFromNetwork(NetworkType.TEST_NET);
```
</details>

<details>
<summary>Check if a node is up</summary>

#### Typescript
```ts
const isNodeUp = await NetworkUtil.nodeIsUp('https://api-01.dhealth.dev:3001');
```

#### Javascript
```js
const isNodeUp = await dhealth_utils.NetworkUtil.nodeIsUp('https://api-01.dhealth.dev:3001');
```
</details>

<details>
<summary>Get network type from a wallet address</summary>

#### Typescript
```ts
const networkType = NetworkUtil.getNetworkTypeFromAddress('TA4J3PTVAHIVWDG3G7DOH3BAW7HWSKIQJWHIBNY');
```

#### Javascript
```js
const networkType = dhealth_utils.NetworkUtil.getNetworkTypeFromAddress('TA4J3PTVAHIVWDG3G7DOH3BAW7HWSKIQJWHIBNY');
```
</details>

<!-- Transaction -->
### <b>Transaction</b>
<details>
<summary>Get all incoming transactions</summary>

#### Typescript
```ts
const address = 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ';
const transactionGroup = TransactionGroup.Confirmed;
const pageNumber = 1;
const pageSize = 100;
// optional - can leave null
const mosaicIdHex = '5A4935C1D66E6AC4';
const imcomingTxs = await TransactionUtil.getIncomingTransactions(
    address,
    transactionGroup,
    pageNumber,
    pageSize,
    mosaicIdHex
);
```

#### Javascript
```js
const address = 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ';
const transactionGroup = dhealth_utils.TransactionGroup.Confirmed;
const pageNumber = 1;
const pageSize = 100;
// optional - can leave null
const mosaicIdHex = '5A4935C1D66E6AC4';
const incomingTxs = await dhealth_utils.TransactionUtil.getIncomingTransactions(
    address,
    transactionGroup,
    pageNumber,
    pageSize,
    mosaicIdHex
);
```
</details>

<details>
<summary>Get all outgoing transactions</summary>

#### Typescript
```ts
const address = 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ';
const transactionGroup = TransactionGroup.Confirmed;
const pageNumber = 1;
const pageSize = 100;
// optional - can leave null
const mosaicIdHex = '5A4935C1D66E6AC4';

const outgoingTxs = await TransactionUtil.getOutgoingTransactions(
    address,
    transactionGroup,
    pageNumber,
    pageSize,
    mosaicIdHex
);
```

#### Javascript
```js
const address = 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ';
const transactionGroup = dhealth_utils.TransactionGroup.Confirmed;
const pageNumber = 1;
const pageSize = 100;
// optional - can leave null
const mosaicIdHex = '5A4935C1D66E6AC4';

const outgoingTxs = await dhealth_utils.TransactionUtil.getOutgoingTransactions(
    address,
    transactionGroup,
    pageNumber,
    pageSize,
    mosaicIdHex
);
```
</details>

<details>
<summary>Get transactions with custom search criteria</summary>

Find out more about: [TransactionSearchCriteria](https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html).

| Properties | | | | | |
|:---:|:---:|:---:|:---:|:---:|:---:|
| [address][address] | [embedded][embedded] | [fromHeight][fromHeight] | [fromTransferAmount][fromTransferAmount] | [group][group] | [height][height] |
| [offset][offset] | [order][order] | [pageNumber][pageNumber] | [pageSize][pageSize] | [recipientAddress][recipientAddress] | [signerPublicKey][signerPublicKey] |
| [toHeight][toHeight] | [toTransferAmount][toTransferAmount] | [transferMosaicId][transferMosaicId] | [type][type] |


#### Typescript
```ts
const networkType = NetworkType.TEST_NET;

// You can modify/add more fields based on your needs
const searchCriteria = {
    recipientAddress: address,
    group: group,
    pageNumber: pageNumber,
    pageSize: pageSize,
    mosaicIdHex: mosaicIdHex
}

const txs = await TransactionUtil.getTransactions(
    networkType,
    searchCriteria
);
```

#### Javascript
```js
const networkType = dhealth_utils.NetworkType.TEST_NET;

// You can modify/add more fields based on your needs
const searchCriteria = {
    recipientAddress: address,
    group: group,
    pageNumber: pageNumber,
    pageSize: pageSize,
    mosaicIdHex: mosaicIdHex
}

const txs = await dhealth_utils.TransactionUtil.getTransactions(
    networkType,
    searchCriteria
);
```
</details>

<details>
<summary>Get timestamp of a transaction</summary>

#### Typescript
```ts
const transaction = incomingTxs[0];
const timestamp = await TransactionUtil.getTimestampFromTransaction(transaction);
```

#### Javascript
```js
const transaction = incomingTxs[0];
const timestamp = await dhealth_utils.TransactionUtil.getTimestampFromTransaction(transaction);
```
</details>

</details>

<details>
<summary>Create and announce a transfer transaction</summary>

#### Typescript - with mosaic ID
```ts
const privateKey = '008D53A06B75DAB055034F436B85DFA77E027A8485B16C6604C35A1D2483254B';
const transactionCreationParams = {
  networkType: NetworkType.TEST_NET,
  maxFee: 100000, // 0.1 dhp - 1 million basic units equal 1 dhp
  recipientAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
  mosaicDetails: [{mosaicId: '5A4935C1D66E6AC4', amount: 100000}],
  plainMessage: `test create transfer tx - ${new Date().getTime()}`
}

const result = await TransactionUtil.createAndAnnounceTransaction(
  TransferTransaction,
  transactionCreationParams,
  privateKey
).catch(err => {
  console.log(err);
});
```
#### Typescript - with namespace ID
```ts
const privateKey = '008D53A06B75DAB055034F436B85DFA77E027A8485B16C6604C35A1D2483254B';
const transactionCreationParams = {
  networkType: NetworkType.TEST_NET,
  maxFee: 100000, // 0.1 dhp - 1 million basic units equal 1 dhp
  recipientAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
  mosaicDetails: [{namespaceId: 'dhealth.dhp', amount: 100000}],
  plainMessage: `test create transfer tx - ${new Date().getTime()}`
}

const result = await TransactionUtil.createAndAnnounceTransaction(
  TransferTransaction,
  transactionCreationParams,
  privateKey
).catch(err => {
  console.log(err);
});
```

#### Javascript - with mosaic ID
```js
const privateKey = '008D53A06B75DAB055034F436B85DFA77E027A8485B16C6604C35A1D2483254B';
const transactionCreationParams = {
  networkType: NetworkType.TEST_NET,
  maxFee: 100000, // 0.1 dhp - 1 million basic units equal 1 dhp
  recipientAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
  mosaicDetails: [{mosaicId: '5A4935C1D66E6AC4', amount: 100000}],
  plainMessage: `test create transfer tx - ${new Date().getTime()}`
}

const result = await dhealth_utils.TransactionUtil.createAndAnnounceTransaction(
  TransferTransaction,
  transactionCreationParams,
  privateKey
).catch(err => {
  console.log(err);
});
```

#### Javascript - with namespace ID
```js
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
```
</details>

<!------------------------------------------>
<!-- COLLAPSIBLE SECTIONS FOR USAGE ~ END -->
<!------------------------------------------>

## Community

Join the conversation and help the community.

[![Twitter Follow](https://img.shields.io/twitter/follow/dHealth_Network?style=social)](https://twitter.com/dHealth_Network)

[![Facebook](https://img.shields.io/badge/Facebook-dhealthfoundation-blue?style=social&logo=facebook)](https://www.facebook.com/dhealthfoundation)
[![Love Angular badge](https://img.shields.io/badge/Telegram-dHealthCommunity-informational?style=social&logo=telegram)](https://t.me/dHealthCommunity)


<!-- [contributing]: CONTRIBUTING.md
[changelog]: CHANGELOG.md
[codeofconduct]: CODE_OF_CONDUCT.md -->
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
[twitter]: https://twitter.com/dHealth_Network
[facebook]: https://www.facebook.com/dhealthfoundation
[telegram]: https://t.me/dHealthCommunity

[address]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#address
[embedded]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#embedded
[fromHeight]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#fromheight
[fromTransferAmount]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#fromtransferamount
[group]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#group
[height]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#height

[offset]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#offset

[order]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#order
[pageNumber]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#pagenumber
[pageSize]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#pagesize
[recipientAddress]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#recipientaddress
[signerPublicKey]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#signerpublickey

[toHeight]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#toheight
[toTransferAmount]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#totransferamount
[transferMosaicId]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#transfermosaicid
[type]: https://docs.symbolplatform.com/symbol-sdk-typescript-javascript/1.0.1/interfaces/infrastructure_searchcriteria_transactionsearchcriteria.transactionsearchcriteria.html#type