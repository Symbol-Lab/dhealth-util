import * as sinon from 'sinon';
import { expect } from 'chai';
import { mock } from 'ts-mockito'
import { NetworkConfigurationDefaults, NodeConfig } from '../src/NetworkConfig';
import { NetworkConfig, NetworkUtil, NetworkType, UInt64 } from '../src';
import { TestConstants } from './TestConstant.spec';
const axios = require('axios');

describe('NetworkUtil', () => {
    afterEach(async () => {
        sinon.restore();
    });

    it('get node from network', async () => {
        // GIVEN
        const mockNodes: NodeConfig[] = [
            { friendlyName: 'test-node', roles: 2, url: 'test-url' }
        ];
        NetworkConfig.networks[TestConstants.networkType].nodes = mockNodes;
        const stubA = sinon.stub(NetworkUtil, 'nodeIsUp').returns(Promise.resolve(true));

        // WHEN
        const result = await NetworkUtil.getNodeFromNetwork(TestConstants.networkType);

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(mockNodes[0]);
        sinon.assert.calledOnce(stubA);
    });

    it('get node from network expect error', async () => {
        // GIVEN
        const expectedError = new Error(`No available node from network ${TestConstants.networkType}`);
        const mockNodes: NodeConfig[] = [
            { friendlyName: 'test-node', roles: 2, url: 'test-url' }
        ];
        NetworkConfig.networks[TestConstants.networkType].nodes = mockNodes;
        const stubA = sinon.stub(NetworkUtil, 'nodeIsUp').returns(Promise.resolve(false));
        async function fn(networkType: NetworkType) { return await NetworkUtil.getNodeFromNetwork(networkType); }
        const fnSpy = sinon.spy(fn);

        // WHEN
        let result, error;
        try {
            result = await fnSpy(TestConstants.networkType);
        } catch(err) {
            error = err;
        };

        // THEN
        expect(result).to.be.undefined;
        expect((error as Error).message).equals(expectedError.message);
        sinon.assert.calledOnce(stubA);
    });

    it('node is up', async () => {
        // GIVEN
        const res = {
            data: {
                status: {
                    apiNode: 'up',
                    db: 'up'
                }
            }
        };
        const stubA = sinon.stub(axios, 'get').returns(Promise.resolve(res));

        // WHEN
        const result = await NetworkUtil.nodeIsUp('test_url');

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).to.be.true;
        sinon.assert.called(stubA);
    });

    it('node is up expect result: false', async () => {
        // GIVEN
        const res = {};
        const stubA = sinon.stub(axios, 'get').returns(Promise.resolve(res));

        // WHEN
        const result = await NetworkUtil.nodeIsUp('test_url');

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).to.be.false;
        sinon.assert.called(stubA);
    });

    it('node is up expect error handling: return false', async () => {
        // GIVEN
        const expectedError = new Error('ughh!')
        const stubA = sinon.stub(axios, 'get').returns(Promise.reject(expectedError));

        // WHEN
        const result = await NetworkUtil.nodeIsUp('test_url');

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).to.be.false;
        sinon.assert.called(stubA);
    });

    it('get network type from address MAINNET', async () => {
        // GIVEN
        const address = TestConstants.accountAddress;

        // WHEN
        const result = NetworkUtil.getNetworkTypeFromAddress(address);

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(TestConstants.networkType);
    });

    it('get network type from address TESTNET', async () => {
        // GIVEN
        const address = TestConstants.accountAddressTESTNET;

        // WHEN
        const result = NetworkUtil.getNetworkTypeFromAddress(address);

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(NetworkType.TEST_NET);
    });

    it('get network timestamp from UInt64', async () => {
        // GIVEN
        const mockTimestampUInt64 = mock(UInt64);
        const mockTimestamp = 1;
        const stubA = sinon.stub(NetworkUtil, 'getNetworkTimestampFromRaw').returns(mockTimestamp);

        // WHEN
        const result = NetworkUtil.getNetworkTimestampFromUInt64(
            TestConstants.networkType, mockTimestampUInt64
        );

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(mockTimestamp);
        sinon.assert.called(stubA);
    });

    it('get network timestamp from raw', async () => {
        // GIVEN
        const networkDefaults: NetworkConfigurationDefaults = mock();
        networkDefaults.epochAdjustment = 2;
        NetworkConfig.networks[TestConstants.networkType].networkConfigurationDefaults = networkDefaults;
        const timestamp = 5000;
        const expectedResult = 7;

        // WHEN
        const result = NetworkUtil.getNetworkTimestampFromRaw(TestConstants.networkType, timestamp);

        // THEN
        expect(result).to.not.be.undefined;
        expect(result).equals(expectedResult);
    });
});