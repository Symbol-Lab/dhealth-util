import { expect } from 'chai';
import * as sinon from 'sinon';
import  { mock, when } from 'ts-mockito';

import { of } from 'rxjs';
import { BlockchainUtil, NetworkUtil } from "../src";
import { TestConstants } from './TestConstant.spec';
import { BlockHttp, BlockInfo, ChainHttp, ChainInfo, NormalBlockInfo, RepositoryFactoryHttp, UInt64 } from 'symbol-sdk';
import { NodeConfig } from '../src/NetworkConfig';

describe('BlockchainUtil', () => {
    afterEach(async () => {
        sinon.restore();
    });

    it('get block by height', async () => {
        const mockedBlockInfo: BlockInfo = mock(NormalBlockInfo);
        const stub = sinon.stub(BlockchainUtil, 'getBlockByHeightUInt64').returns(
            Promise.resolve(mockedBlockInfo)
        );
        const result = await BlockchainUtil.getBlockByHeight(TestConstants.networkType, 1);
        expect(result).to.not.be.undefined;
        expect(result).equals(mockedBlockInfo);
        sinon.assert.calledOnce(stub);
    });

    it('get block by height UInt64', async () => {
        const mockedBlockInfo: BlockInfo = mock(NormalBlockInfo);
        const mockedNode: NodeConfig = {
            roles: 1,
            friendlyName: '',
            url: ''
        };
        const stub = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(mockedNode));
        const mockedBlockHttp = mock(BlockHttp);
        const stub1 = sinon.stub(RepositoryFactoryHttp.prototype, 'createBlockRepository').returns(mockedBlockHttp);
        const stub2 = sinon.stub(mockedBlockHttp, 'getBlockByHeight').returns(of(mockedBlockInfo));
        const result = await BlockchainUtil.getBlockByHeightUInt64(
            TestConstants.networkType, TestConstants.blockHeigh
        );
        expect(result).to.not.be.undefined;
        expect(result).equals(mockedBlockInfo);
        sinon.assert.callOrder(stub, stub1, stub2);
    });

    it('get genesis block', async () => {
        const mockedBlockInfo: BlockInfo = mock(NormalBlockInfo);
        const stub = sinon.stub(BlockchainUtil, 'getBlockByHeight').returns(
            Promise.resolve(mockedBlockInfo)
        );
        const result = await BlockchainUtil.getGenesisBlock(TestConstants.networkType);
        expect(result).to.not.be.undefined;
        expect(result).equals(mockedBlockInfo);
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWithExactly(stub, TestConstants.networkType, 1);
    });

    it('get latest block height', async () => {
        const mockedNode: NodeConfig = {
            roles: 1,
            friendlyName: '',
            url: ''
        };
        const mockedChainInfo = mock(ChainInfo);
        const height = mock(UInt64);
        const mockedChainHttp = mock(ChainHttp);
        (mockedChainInfo as any).height = height;
        const stub = sinon.stub(NetworkUtil, 'getNodeFromNetwork').returns(Promise.resolve(mockedNode));
        const stub1 = sinon.stub(RepositoryFactoryHttp.prototype, 'createChainRepository').returns(mockedChainHttp);
        const stub2 = sinon.stub(mockedChainHttp, 'getChainInfo').returns(of(mockedChainInfo));
        const stub3 = sinon.stub(height, 'compact').returns(1);
        const result = await BlockchainUtil.getLatestBlockHeight(TestConstants.networkType);
        expect(result).to.not.be.undefined;
        expect(result).equals(1);
        sinon.assert.callOrder(stub, stub1, stub2, stub3);
    });

    it('get latest block height', async () => {
        const heightNumber = 2;
        const mockedBlockInfo = mock(NormalBlockInfo);
        const stub = sinon.stub(BlockchainUtil, 'getLatestBlockHeight').returns(
            Promise.resolve(heightNumber)
        )
        const stub1 = sinon.stub(BlockchainUtil, 'getBlockByHeight').returns(
            Promise.resolve(mockedBlockInfo)
        )
        const result = await BlockchainUtil.getLatestBlock(TestConstants.networkType);
        expect(result).to.not.be.undefined;
        expect(result).equals(mockedBlockInfo);
        sinon.assert.callOrder(stub, stub1);
    });
});