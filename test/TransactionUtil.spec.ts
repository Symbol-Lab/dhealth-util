import * as sinon from 'sinon';
import { expect } from 'chai';
import {
    Account, Address, Deadline, NetworkConfig, NetworkType, PlainMessage,
    TransactionUtil, TransferTransaction, UInt64
} from '../src';
import { TestConstants } from './TestConstant.spec';

describe('TransactionUtil', () => {
    before(() => {
        TestConstants.networkDefaults.epochAdjustment = 2;
        TestConstants.networkDefaults.generationHash = TestConstants.mockString;
        NetworkConfig.networks[TestConstants.networkType].networkConfigurationDefaults = TestConstants.networkDefaults;
    });

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
});