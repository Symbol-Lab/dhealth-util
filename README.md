<h1 align="center">dHealth-utils - The dHealth chain utility.</h1>

<p align="center">
  <img src="https://dhealth.network/wp-content/uploads/2021/08/dHealth-Network-Logo-blue.png" alt="angular-logo" width="577" height="100"/>
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
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/dHealth-Symbol-Lab/dhealth-utils?color=bright%20green&label=Github&logo=github">
  </a>&nbsp;
  <a href="https://www.npmjs.com/package/dhealth-utils">
    <img alt="npm" src="https://img.shields.io/npm/v/dhealth-utils?color=bright%20green&label=NPM%20Package&logo=npm">
  </a>&nbsp;
  <a href="https://t.me/dHealthCommunity">
    <img src="https://img.shields.io/badge/Telegram-dHealthCommunity-informational?style=flat&logo=telegram" />
  </a>
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

<!-- COLLAPSIBLE SECTIONS FOR USAGE -->
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
<summary>Derive specific child-path from HD wallet</summary>

#### Typescript
```ts
const childAccount = wallet.getChildAccountPrivateKey('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.TEST_NET);
```
#### Javascript
```js
const childAccount = wallet.getChildAccountPrivateKey('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.TEST_NET);
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
<summary>Mosaic</summary>

### Heading
1. A numbered
2. list
    * With some
    * Sub bullets
</details>

<!-- Network -->
### <b>Network</b>
<details>
<summary>Network</summary>

### Heading
1. A numbered
2. list
    * With some
    * Sub bullets

    <details>
    <summary>Account</summary>

    ### Heading
    1. A numbered
    2. list
        * With some
        * Sub bullets
    </details>
</details>

<!-- Transaction -->
### <b>Transaction</b>
<details>
<summary>Transaction</summary>

### Heading
1. A numbered
2. list
    * With some
    * Sub bullets

    <details>
    <summary>Account</summary>

    ### Heading
    1. A numbered
    2. list
        * With some
        * Sub bullets
    </details>
</details>

<!-- COLLAPSIBLE SECTIONS FOR USAGE -->

## Community

Join the conversation and help the community.

- [Twitter][twitter]
- [Facebook][facebook]
- [Telegram][telegram]

[![Twitter Follow](https://img.shields.io/twitter/follow/dHealth_Network?style=social)](https://twitter.com/dHealth_Network)
[![Facebook](https://img.shields.io/badge/Facebook-dhealthfoundation-blue?style=social&logo=facebook)](https://www.facebook.com/dhealthfoundation)
[![Love Angular badge](https://img.shields.io/badge/Telegram-dHealthCommunity-informational?style=social&logo=telegram)](https://t.me/dHealthCommunity)


<!-- [contributing]: CONTRIBUTING.md
[changelog]: CHANGELOG.md
[codeofconduct]: CODE_OF_CONDUCT.md -->
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
[twitter]: https://twitter.com/dHealth_Network
[meetup]: https://www.meetup.com/find/?keywords=angular"
[facebook]: https://www.facebook.com/dhealthfoundation
[telegram]: https://t.me/dHealthCommunity
