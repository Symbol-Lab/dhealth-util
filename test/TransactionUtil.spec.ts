import * as sinon from 'sinon';
import { expect } from 'chai';
import {
    Account,
    Address,
    Deadline,
    Mosaic,
    MosaicId,
    NetworkType,
    PlainMessage,
    RepositoryFactoryHttp,
    TransactionInfo,
    TransferTransaction,
    UInt64
} from '@dhealth/sdk';
import { AccountUtil, MosaicUtil, NetworkConfig, NetworkUtil, TransactionUtil } from '../src';
import { TestConstants } from './TestConstant.spec';
import { of, throwError } from 'rxjs';

describe('TransactionUtil', () => {
    before(() => {
        TestConstants.networkDefaults.epochAdjustment = 2;
        TestConstants.networkDefaults.generationHash = TestConstants.mockString;
        NetworkConfig.networks[TestConstants.networkType].networkConfigurationDefaults = TestConstants.networkDefaults;

        Object.defineProperty(TestConstants.mockPageTx, 'data', {
            value: expectedResult,
            writable: true
        });

        Object.defineProperty(TestConstants.mockTransactionInfo, 'height', {
            value: TestConstants.mockUInt64,
            writable: false
        });

        Object.defineProperty(TestConstants.mockTransferTx, 'networkType', {
            value: TestConstants.mockNetworkType,
            writable: true
        });

        Object.defineProperty(TestConstants.mockTransferTx, 'mosaics', {
            value: [TestConstants.mockMosaic],
            writable: true
        });

        Object.defineProperty(TestConstants.mockMosaic, 'amount', {
            value: TestConstants.mockUInt64,
            writable: true
        });

        Object.defineProperty(TestConstants.mockMosaic, 'id', {
            value: new MosaicId(TestConstants.mosaicIdHex),
            writable: true
        });

        Object.defineProperty(TestConstants.mockTransferTx, 'transactionInfo', {
            value: TestConstants.mockTransactionInfo,
            writable: true
        });

        Object.defineProperty(TestConstants.mockBlockInfo, 'timestamp', {
            value: TestConstants.mockNumber,
            writable: false
        });
    });
    const expectedResult = [TestConstants.mockTransferTx];

    afterEach(async () => {
        sinon.restore();
    });

    it('send transfer transaction', async () => {
        // GIVEN
        const stubA = sinon.stub(TransactionUtil, 'getMosaicFromNamespace').returns(
            TestConstants.mockMosaic
        );
        const stubB = sinon.stub(TransactionUtil, 'createTransferTransaction').returns(
            Promise.resolve(TestConstants.mockTransferTx)
        );
        const stubC = sinon.stub(Account, 'createFromPrivateKey').returns(TestConstants.mockAcc);
        const stubD = sinon.stub(TransactionUtil, 'signTransaction').returns(
            Promise.resolve(TestConstants.mockSignedTx)
        );
        const stubE = sinon.stub(TransactionUtil, 'announceTransaction').returns(
            Promise.resolve(TestConstants.mockTxAnnouceRes)
        )
        // WHEN
        const result = await TransactionUtil.sendTransferTransaction(
            TestConstants.mockNetworkType,
            TestConstants.mockPrivateKey,
            TestConstants.mockRecipientAddr,
            TestConstants.mockMosaicDetails,
            TestConstants.mockPlainMsg,
            TestConstants.mockFee
        )
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockTxAnnouceRes);
        sinon.assert.callOrder(stubA, stubB, stubC, stubD, stubE);
    });

    it('get mosaic from namespace', async () => {
        // GIVEN
        const stubA = sinon.stub(UInt64, 'fromUint').returns(TestConstants.mockUInt64);
        // WHEN
        const result = TransactionUtil.getMosaicFromNamespace(TestConstants.mockString, TestConstants.mockNumber);
        // GIVEN
        expect(result).to.not.be.undefined;
        sinon.assert.called(stubA);
    });

    it('create transfer transaction', async () => {
        // GIVEN
        const stubA = sinon.stub(Deadline, 'create').returns(TestConstants.mockDeadline);
        const stubB = sinon.stub(Address, 'createFromRawAddress').returns(TestConstants.mockAddr);
        const stubC = sinon.stub(PlainMessage, 'create').returns(TestConstants.mockPlainMessage);
        const stubD = sinon.stub(UInt64, 'fromUint').returns(TestConstants.mockUInt64);
        const stubE = sinon.stub(TransferTransaction, 'create').returns(TestConstants.mockTransferTx);
        // WHEN
        const result = await TransactionUtil.createTransferTransaction(
            TestConstants.networkType,
            TestConstants.mockRecipientAddr,
            TestConstants.mockMosaicDetails,
            TestConstants.mockPlainMsg,
            TestConstants.mockFee
        )
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockTransferTx);
        sinon.assert.callOrder(stubA, stubB, stubC, stubD, stubE);
    });

    it('sign transaction', async () => {
        // GIVEN
        const stubA = sinon.stub(TestConstants.mockAcc, 'sign').returns(TestConstants.mockSignedTx);
        (TestConstants.mockTransferTx.networkType as NetworkType) = TestConstants.networkType;
        // WHEN
        const result = await TransactionUtil.signTransaction(
            TestConstants.mockAcc,
            TestConstants.mockTransferTx
        );
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockSignedTx);
        sinon.assert.called(stubA);
    });

    it('announce transaction', async () => {
        // GIVEN
        const stubA = sinon.stub(NetworkUtil, 'getNodeFromNetwork')
            .returns(Promise.resolve(TestConstants.mockNode));
        const stubB = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository')
            .returns(TestConstants.mockTransactionRepository);
        const stubC = sinon.stub(TestConstants.mockTransactionRepository, 'announce')
            .returns(of(TestConstants.mockTxAnnouceRes));
        // WHEN
        const result = await TransactionUtil.announceTransaction(TestConstants.mockSignedTx);
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockTxAnnouceRes);
        sinon.assert.callOrder(stubA, stubB, stubC);
    });

    it('get transactions', async () => {
        // GIVEN
        const stubA = sinon.stub(NetworkUtil, 'getNodeFromNetwork')
        .returns(Promise.resolve(TestConstants.mockNode));
        const stubB = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository')
        .returns(TestConstants.mockTransactionRepository);
        const stubC = sinon.stub(TestConstants.mockTransactionRepository, 'search').returns(
            of(TestConstants.mockPageTx)
        );
        // WHEN
        const result = await TransactionUtil.getTransactions(TestConstants.networkType, TestConstants.mockSearchCriteria);
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(expectedResult);
        sinon.assert.callOrder(stubA, stubB, stubC);
    });

    it('get incoming transactions', async () => {
        // GIVEN
        const stubA = sinon.stub(Address, 'createFromRawAddress').returns(TestConstants.mockAddr);
        const stubB = sinon.stub(NetworkUtil, 'getNetworkTypeFromAddress').returns(NetworkType.TEST_NET);
        const stubC = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(TestConstants.mockNode));
        const stubD = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository')
            .returns(TestConstants.mockTransactionRepository);
        const stubE = sinon.stub(TestConstants.mockTransactionRepository, 'search').returns(
            of(TestConstants.mockPageTx)
        );
        // WHEN
        const result = await TransactionUtil.getIncomingTransactions(
            TestConstants.mockString,
            TestConstants.mockTransactionGroup,
            TestConstants.mockNumber,
            TestConstants.mockNumber
        );
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(expectedResult);
        sinon.assert.callOrder(stubA, stubB, stubC, stubD, stubE);
    });

    it('get outgoing transactions', async () => {
        // GIVEN
        const stubA = sinon.stub(NetworkUtil, 'getNetworkTypeFromAddress').returns(NetworkType.TEST_NET);
        const stubB = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(TestConstants.mockNode));
        const stubC = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository')
            .returns(TestConstants.mockTransactionRepository);
        const stubD = sinon.stub(AccountUtil, 'getPublicKeyFromAddress').returns(
            Promise.resolve(TestConstants.mockString)
        );
        const stubE = sinon.stub(TestConstants.mockTransactionRepository, 'search').returns(
            of(TestConstants.mockPageTx)
        );
        // WHEN
        const result = await TransactionUtil.getOutgoingTransactions(
            TestConstants.mockString,
            TestConstants.mockTransactionGroup,
            TestConstants.mockNumber,
            TestConstants.mockNumber
        );
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(expectedResult);
        sinon.assert.callOrder(stubA, stubB, stubC, stubD, stubE);
    });

    it('get mosaic sent', async () => {
        // GIVEN
        const stubA = sinon.stub(Address, 'createFromRawAddress').returns(TestConstants.mockAddr);
        const stubB = sinon.stub(NetworkUtil, 'getNetworkTypeFromAddress').returns(NetworkType.TEST_NET);
        const stubC = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(TestConstants.mockNode));
        const stubD = sinon.stub(MosaicUtil, 'getMosaicInfo').returns(Promise.resolve(TestConstants.mockMosaicInfo));
        Object.defineProperty(TestConstants.mockMosaicInfo, 'divisibility', {
            value: TestConstants.mockNumber,
            writable: false
        });
        const stubE = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository')
            .returns(TestConstants.mockTransactionRepository);
        const observableMockPageTx = of(TestConstants.mockPageTx);
        const stubF = sinon.stub(TestConstants.mockTransactionRepository, 'search').returns(
            of(TestConstants.mockPageTx)
        );
        const stubG = sinon.stub(observableMockPageTx, 'pipe').returns(observableMockPageTx);
        // WHEN
        await TransactionUtil.getMosaicSent({
            signerPubKey: TestConstants.accountPubKey,
            recipientRawAddress: TestConstants.mockString,
            mosaicIdHex: TestConstants.mosaicIdHex
        });
        // THEN
        sinon.assert.callOrder(stubB, stubC, stubD, stubE, stubF);
    });

    it('get mosaic sent empty params', async () => {
        // GIVEN
        const stubA = sinon.stub(Address, 'createFromRawAddress').returns(TestConstants.mockAddr);
        const stubB = sinon.stub(NetworkUtil, 'getNetworkTypeFromAddress').returns(NetworkType.TEST_NET);
        const stubC = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(TestConstants.mockNode));
        const stubD = sinon.stub(MosaicUtil, 'getMosaicInfo').returns(Promise.resolve(TestConstants.mockMosaicInfo));
        Object.defineProperty(TestConstants.mockMosaicInfo, 'divisibility', {
            value: TestConstants.mockNumber,
            writable: false
        });
        const stubE = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository')
            .returns(TestConstants.mockTransactionRepository);
        const observableMockPageTx = of(TestConstants.mockPageTx);
        const stubF = sinon.stub(TestConstants.mockTransactionRepository, 'search').returns(
            of(TestConstants.mockPageTx)
        );
        // const stubG = sinon.stub(observableMockPageTx, 'pipe').returns(throwError(new Error('error')));
        const stubG = sinon.stub(observableMockPageTx , 'pipe').returns(
            observableMockPageTx
        );
        const stubH = sinon.stub(observableMockPageTx, 'subscribe').throwsException(
            new Error('error')
        );
        // WHEN
        await TransactionUtil.getMosaicSent({
            signerPubKey: TestConstants.mockString,
            recipientRawAddress: '',
            mosaicIdHex: ''
        });
        // THEN
        sinon.assert.callOrder(stubB, stubC, stubD, stubE, stubF);
    });

    it('get mosaic sent error', async () => {
        // GIVEN
        const stubA = sinon.stub(Address, 'createFromRawAddress').returns(TestConstants.mockAddr);
        const stubB = sinon.stub(NetworkUtil, 'getNetworkTypeFromAddress').returns(NetworkType.TEST_NET);
        const stubC = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(TestConstants.mockNode));
        const stubD = sinon.stub(MosaicUtil, 'getMosaicInfo').returns(Promise.resolve(TestConstants.mockMosaicInfo));
        Object.defineProperty(TestConstants.mockMosaicInfo, 'divisibility', {
            value: TestConstants.mockNumber,
            writable: false
        });
        const stubE = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository')
            .returns(TestConstants.mockTransactionRepository);
        const observableMockPageTx = of(TestConstants.mockPageTx);
        const stubF = sinon.stub(TestConstants.mockTransactionRepository, 'search').returns(
            throwError('error!')
        );
        // WHEN
        await TransactionUtil.getMosaicSent({
            signerPubKey: TestConstants.mockString,
            recipientRawAddress: '',
            mosaicIdHex: ''
        });
        // THEN
        sinon.assert.callOrder(stubB, stubC, stubD, stubE, stubF);
    });

    it('get timestamp from transaction', async () => {
        // GIVEN
        const obsBlockInfo = of(TestConstants.mockBlockInfo);
        const stubA = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(TestConstants.mockNode));
        const stubB = sinon.stub(RepositoryFactoryHttp.prototype, 'createBlockRepository').returns(TestConstants.mockBlockRepository);
        const stubC = sinon.stub(TestConstants.mockBlockRepository, 'getBlockByHeight').returns(obsBlockInfo);
        const stubD = sinon.stub(NetworkUtil, 'getNetworkTimestampFromUInt64').returns(
            TestConstants.mockNumber
        );
        // WHEN
        const result = await TransactionUtil.getTimestampFromTransaction(TestConstants.mockTransferTx);
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockNumber);
        sinon.assert.callOrder(stubA, stubB, stubC, stubD);
    });

    it('get timestamp from transaction error', async () => {
        // GIVEN
        Object.defineProperty(TestConstants.mockTransferTx, 'transactionInfo', {
            value: undefined,
            writable: false
        });
        const expectedErrorMsg = "Transaction object doesn't have transactionInfo value";
        let error: any;
        // WHEN
        const result = await TransactionUtil.getTimestampFromTransaction(TestConstants.mockTransferTx)
        .catch(err => {
            error = err;
        });
        // THEN
        expect(result).to.be.undefined;
        expect(error).to.not.be.undefined;
        expect(error.message).equals(expectedErrorMsg);
    });

    it('transaction to JSON', async () => {
        // GIVEN
        const expectedJSONObj = {"transaction":{"type":16724,"network":104,"version":1,"maxFee":"4294967297","deadline":"1633339973424","signature":"","recipientAddress":{"address":"TCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4JQ","networkType":152},"mosaics":[{"amount":"4294967297","id":"5A4935C1D66E6AC4"}],"message":"006D657373616765"},"transactionInfo":{"height":{"lower":1,"higher":1},"index":1,"id":"id","hash":"hash"}};
        const tx = new TransferTransaction(
            TestConstants.networkType,
            1,
            Deadline.create(1, 1),
            new UInt64([1, 1]),
            Address.createFromRawAddress('TCUAU4XEZTYX5TWGFGO2RTGKU5VF3ZOZI2FJ4JQ'),
            [new Mosaic(
                new MosaicId('5A4935C1D66E6AC4'),
                new UInt64([1,1])
            )],
            PlainMessage.create('message'),
            undefined,
            undefined,
            new TransactionInfo(
                new UInt64([1, 1]),
                1,
                'id',
                'hash'
            )
        )
        // WHEN
        const result = TransactionUtil.transactionToJSON(tx);
        // THEN
        const deadline = JSON.parse(result).transaction.deadline;
        expectedJSONObj.transaction.deadline = deadline;
        expect(result).to.not.be.undefined;
        expect(result).equals(JSON.stringify(expectedJSONObj));
    });
});