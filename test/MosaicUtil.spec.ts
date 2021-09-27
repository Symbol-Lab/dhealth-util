import * as sinon from 'sinon';
import { Account, AggregateTransaction, MosaicDefinitionTransaction, MosaicNonce, MosaicRepository, MosaicSupplyChangeTransaction, MosaicUtil, NetworkUtil, RepositoryFactoryHttp, UInt64 } from '../src';
import  { mock } from 'ts-mockito';
import { expect } from 'chai';
import { MosaicFlags, MosaicHttp, MosaicId, MosaicInfo, NamespaceHttp, SignedTransaction, TransactionAnnounceResponse, TransactionHttp } from 'symbol-sdk';
import { EMPTY, of, throwError } from 'rxjs';
import { TestConstants } from './TestConstant.spec';
import { NodeConfig } from '../src/NetworkConfig';

describe('MosaicUtil', () => {
    afterEach(async () => {
        sinon.restore();
    });

    it('create mosaic', async () => {
        // GIVEN
        const mockAcc = mock(Account);
        const stubA = sinon.stub(Account, 'createFromPrivateKey').returns(mockAcc);
        const mockDuration = mock(UInt64);
        const stubB = sinon.stub(UInt64, 'fromUint').returns(mockDuration);
        const mockNonce = mock(MosaicNonce);
        const stubC = sinon.stub(MosaicNonce, 'createRandom').returns(mockNonce);

        const mockMosaicId = mock(MosaicId);
        const stubD = sinon.stub(MosaicId, 'createFromNonce').returns(mockMosaicId);
        const mockMosaicFlags = mock(MosaicFlags);
        const stubE = sinon.stub(MosaicFlags, 'create').returns(mockMosaicFlags);
        const mockMosaicDefinitionTx = mock(MosaicDefinitionTransaction);
        const stubF = sinon.stub(MosaicDefinitionTransaction, 'create').returns(mockMosaicDefinitionTx);

        const mockMosaicSupplyTx = mock(MosaicSupplyChangeTransaction);
        const stubG = sinon.stub(MosaicSupplyChangeTransaction, 'create').returns(mockMosaicSupplyTx);
        const mockAggregateTx = mock(AggregateTransaction);
        const stubH = sinon.stub(AggregateTransaction, 'createComplete').returns(mockAggregateTx);

        const mockSignedTransaction = mock(SignedTransaction);
        Object.assign(mockSignedTransaction, 'hash', 'test_hash');
        const stubI = sinon.stub(mockAcc, 'sign').returns(mockSignedTransaction);

        const mockRepositoryFactoryHttp = mock(TransactionHttp);
        const stubJ = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository').returns(mockRepositoryFactoryHttp);

        const mockTxAnnounceRes = mock(TransactionAnnounceResponse);
        const stubK = sinon.stub(mockRepositoryFactoryHttp, 'announce').returns(of(mockTxAnnounceRes));

        // WHEN
        await MosaicUtil.createMosaic(
            TestConstants.networkType,
            TestConstants.accountPriKey,
            1, true, true, false, 6, 10000
        );

        // THEN
        sinon.assert.callOrder(stubA, stubB, stubC, stubD, stubE, stubF, stubG, stubH, stubI, stubJ, stubK);
    });

    it('create mosaic expect error', async () => {
        // GIVEN
        const mockAcc = mock(Account);
        const stubA = sinon.stub(Account, 'createFromPrivateKey').returns(mockAcc);
        const mockDuration = mock(UInt64);
        const stubB = sinon.stub(UInt64, 'fromUint').returns(mockDuration);
        const mockNonce = mock(MosaicNonce);
        const stubC = sinon.stub(MosaicNonce, 'createRandom').returns(mockNonce);

        const mockMosaicId = mock(MosaicId);
        const stubD = sinon.stub(MosaicId, 'createFromNonce').returns(mockMosaicId);
        const mockMosaicFlags = mock(MosaicFlags);
        const stubE = sinon.stub(MosaicFlags, 'create').returns(mockMosaicFlags);
        const mockMosaicDefinitionTx = mock(MosaicDefinitionTransaction);
        const stubF = sinon.stub(MosaicDefinitionTransaction, 'create').returns(mockMosaicDefinitionTx);

        const mockMosaicSupplyTx = mock(MosaicSupplyChangeTransaction);
        const stubG = sinon.stub(MosaicSupplyChangeTransaction, 'create').returns(mockMosaicSupplyTx);
        const mockAggregateTx = mock(AggregateTransaction);
        const stubH = sinon.stub(AggregateTransaction, 'createComplete').returns(mockAggregateTx);

        const mockSignedTransaction = mock(SignedTransaction);
        Object.assign(mockSignedTransaction, 'hash', 'test_hash');
        const stubI = sinon.stub(mockAcc, 'sign').returns(mockSignedTransaction);

        const mockRepositoryFactoryHttp = mock(TransactionHttp);
        const stubJ = sinon.stub(RepositoryFactoryHttp.prototype, 'createTransactionRepository').returns(mockRepositoryFactoryHttp);

        const error = new Error('oh error!');
        const stubK = sinon.stub(mockRepositoryFactoryHttp, 'announce').returns(throwError(error));

        // WHEN
        await MosaicUtil.createMosaic(
            TestConstants.networkType,
            TestConstants.accountPriKey,
            1, true, true, false, 6, 10000
        ).catch(err => {
            // THEN
            expect(err).equals(error);
            sinon.assert.callOrder(stubA, stubB, stubC, stubD, stubE, stubF, stubG, stubH, stubI, stubJ, stubK);
        })

    });

    it('get mosaic info', async () => {
        // GIVEN
        const mockNode: NodeConfig = {
            roles: 1,
            friendlyName: '',
            url: ''
        };
        const stubA = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(
            Promise.resolve(mockNode)
        );
        const mockMosaicHttp = mock(MosaicHttp);
        const stubB = sinon.stub(RepositoryFactoryHttp.prototype, 'createMosaicRepository').returns(mockMosaicHttp);
        const mockMosaicInfo = mock(MosaicInfo);
        const stubC = sinon.stub(mockMosaicHttp, 'getMosaic').returns(of(mockMosaicInfo));

        // WHEN
        const result = await MosaicUtil.getMosaicInfo(TestConstants.networkType, TestConstants.mosaicIdHex);

        // THEN
        expect(result).to.be.not.undefined;
        expect(result).equals(mockMosaicInfo);
        sinon.assert.callOrder(stubA, stubB, stubC);
    });

    it('get mosaic info expect error', async () => {
        // GIVEN
        const mockNode: NodeConfig = {
            roles: 1,
            friendlyName: '',
            url: ''
        };
        const stubA = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(
            Promise.resolve(mockNode)
        );
        const mockMosaicHttp = mock(MosaicHttp);
        const stubB = sinon.stub(RepositoryFactoryHttp.prototype, 'createMosaicRepository').returns(mockMosaicHttp);
        const error = new Error('oh no!');
        const stubC = sinon.stub(mockMosaicHttp, 'getMosaic').returns(throwError(error));

        // WHEN
        const result = await MosaicUtil.getMosaicInfo(TestConstants.networkType, TestConstants.mosaicIdHex)
        .catch(err => {

            // THEN
            expect(err).equals(error);
            sinon.assert.callOrder(stubA, stubB, stubC);
        });
        expect(result).to.be.undefined;
    });

    it('get mosaic Id from namespace', async () => {
        // GIVEN
        const mockNode: NodeConfig = {
            roles: 1,
            friendlyName: '',
            url: ''
        };
        const stubA = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(
            Promise.resolve(mockNode)
        );
        const mockNamespaceHttp = mock(NamespaceHttp);
        const stubB = sinon.stub(RepositoryFactoryHttp.prototype, 'createNamespaceRepository').returns(mockNamespaceHttp);
        const mockMosaicId = mock(MosaicId);
        const stubC = sinon.stub(mockNamespaceHttp, 'getLinkedMosaicId').returns(of(mockMosaicId));
        const stubD = sinon.stub(mockMosaicId, 'toHex').returns('testHexId');

        // WHEN
        const result = await MosaicUtil.getMosaicIdFromNamespace(TestConstants.networkType, TestConstants.mosaicNamespace);

        // THEN
        expect(result).to.not.be.undefined;
        sinon.assert.callOrder(stubA, stubB, stubC, stubD);
    });

    it('get mosaic Id from namespace expect null result', async () => {
        // GIVEN
        const mockNode: NodeConfig = {
            roles: 1,
            friendlyName: '',
            url: ''
        };
        const stubA = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(
            Promise.resolve(mockNode)
        );
        const mockNamespaceHttp = mock(NamespaceHttp);
        const stubB = sinon.stub(RepositoryFactoryHttp.prototype, 'createNamespaceRepository').returns(mockNamespaceHttp);
        const mockMosaicId = mock(MosaicId);
        const stubC = sinon.stub(mockNamespaceHttp, 'getLinkedMosaicId').returns(EMPTY);

        // WHEN
        const result = await MosaicUtil.getMosaicIdFromNamespace(TestConstants.networkType, TestConstants.mosaicNamespace);

        // THEN
        expect(result).to.be.undefined;
        sinon.assert.callOrder(stubA, stubB, stubC);
    });
});