import * as sinon from 'sinon';
import { expect } from 'chai';
import  { mock } from 'ts-mockito';
import { EMPTY, of, throwError } from 'rxjs';
import { Account, AggregateTransaction, MosaicDefinitionTransaction, MosaicFlags, MosaicHttp, MosaicId, MosaicInfo, MosaicNonce, MosaicRepository, MosaicSupplyChangeTransaction, MosaicUtil, NamespaceHttp, NetworkUtil, RepositoryFactoryHttp, SignedTransaction, TransactionAnnounceResponse, TransactionHttp, UInt64 } from '../src';
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

        const expectedError = new Error('oh error!');
        const stubK = sinon.stub(mockRepositoryFactoryHttp, 'announce').throwsException(expectedError);

        // WHEN
        let error;
        try {
            await MosaicUtil.createMosaic(
                TestConstants.networkType,
                TestConstants.accountPriKey,
                1, true, true, false, 6, 10000
            );    
        } catch(err) {
            console.log('here');
            error = err;
        }

        // THEN
        expect(error).to.not.be.undefined;
        expect(error).equals(expectedError);
        sinon.assert.callOrder(stubA, stubB, stubC, stubD, stubE, stubF, stubG, stubH, stubI, stubJ, stubK);
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
        const expectedError = new Error('oh no!');
        const stubC = sinon.stub(mockMosaicHttp, 'getMosaic').returns(throwError(expectedError));

        // WHEN
        let result, error;
        try {
            result = await MosaicUtil.getMosaicInfo(TestConstants.networkType, TestConstants.mosaicIdHex);
        } catch(err) {
            error = err;
        }

        // THEN
        expect(result).to.be.undefined;
        expect(error).equals(expectedError);
        sinon.assert.callOrder(stubA, stubB, stubC);
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
        const stubC = sinon.stub(mockNamespaceHttp, 'getLinkedMosaicId').returns(EMPTY);

        // WHEN
        const result = await MosaicUtil.getMosaicIdFromNamespace(TestConstants.networkType, TestConstants.mosaicNamespace);

        // THEN
        expect(result).to.be.undefined;
        sinon.assert.callOrder(stubA, stubB, stubC);
    });
});