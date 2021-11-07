import * as sinon from 'sinon';
import { expect } from 'chai';
import { NetworkType, TransferTransaction } from '@dhealth/sdk';
import { TransactionUtil, TransferTransactionStrategy } from '../../src';
import { TestConstants } from '../TestConstant.spec';

describe('TransactionUtil', () => {
    afterEach(async () => {
        sinon.restore();
    });

    it('create transfer transaction with mosaicId - TransferTransaction', async () => {
        // GIVEN
        const transferTransactionStrategy = new TransferTransactionStrategy();
        const stubA = sinon.stub(TransactionUtil, 'getMosaicFromId').returns(TestConstants.mockMosaic);
        const stubB = sinon.stub(TransferTransaction, 'create').returns(TestConstants.mockTransferTx);
        const transactionCreationParams = {
            networkType: NetworkType.TEST_NET,
            maxFee: 100000,
            recipientAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
            mosaicDetails: [{mosaicId: '5A4935C1D66E6AC4', amount: 100000}],
            plainMessage: 'test transaction'
        }
        // WHEN
        const result = transferTransactionStrategy.create(
            transactionCreationParams
        )
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockTransferTx);
        sinon.assert.callOrder(stubA, stubB);
    });

    it('create transfer transaction with namespaceId - TransferTransaction', async () => {
        // GIVEN
        const transferTransactionStrategy = new TransferTransactionStrategy();
        const stubA = sinon.stub(TransactionUtil, 'getMosaicFromNamespace').returns(TestConstants.mockMosaic);
        const stubB = sinon.stub(TransferTransaction, 'create').returns(TestConstants.mockTransferTx);
        const transactionCreationParams = {
            networkType: NetworkType.TEST_NET,
            maxFee: 100000,
            recipientAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
            mosaicDetails: [{namespaceId: 'dhealth.dhp', amount: 100000}],
            plainMessage: 'test transaction'
        }
        // WHEN
        const result = transferTransactionStrategy.create(
            transactionCreationParams
        )
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockTransferTx);
        sinon.assert.callOrder(stubA, stubB);
    });

    it('create transfer transaction with no mosaicId and no namespaceId - TransferTransaction', async () => {
        // GIVEN
        const transferTransactionStrategy = new TransferTransactionStrategy();
        const stubA = sinon.stub(TransferTransaction, 'create').returns(TestConstants.mockTransferTx);
        const transactionCreationParams = {
            networkType: NetworkType.TEST_NET,
            maxFee: 100000,
            recipientAddress: 'TBEFN3SSXFFEIUOJQLXSZBRJGN56G4XHW647OQQ',
            mosaicDetails: [{amount: 100000}],
            plainMessage: 'test transaction'
        }
        // WHEN
        const result = transferTransactionStrategy.create(
            transactionCreationParams
        )
        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.mockTransferTx);
        sinon.assert.callOrder(stubA);
    });
});