import { BlockInfo, NetworkType, RepositoryFactoryHttp, UInt64 } from '@dhealth/sdk';
import { NetworkUtil } from './NetworkUtil';

export class BlockchainUtil {
    public static async getBlockByHeight(networkType: NetworkType, height: number): Promise<BlockInfo> {
        return await BlockchainUtil.getBlockByHeightUInt64(networkType, UInt64.fromUint(height));
    }

    public static async getBlockByHeightUInt64(networkType: NetworkType, height: UInt64): Promise<BlockInfo> {
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const blockHttp = repositoryFactory.createBlockRepository();
        return await blockHttp.getBlockByHeight(height).toPromise();
    }

    public static async getGenesisBlock(networkType: NetworkType): Promise<BlockInfo> {
        return await this.getBlockByHeight(networkType, 1);
    }

    public static async getLatestBlockHeight(networkType: NetworkType): Promise<number> {
        const node = await NetworkUtil.getNodeFromNetwork(networkType);
        const repositoryFactory = new RepositoryFactoryHttp(node.url);
        const chainHttp = repositoryFactory.createChainRepository();
        const info = await chainHttp.getChainInfo().toPromise();
        return info.height.compact();
    }

    public static async getLatestBlock(networkType: NetworkType): Promise<BlockInfo> {
        const blockheight = await this.getLatestBlockHeight(networkType);
        return await this.getBlockByHeight(networkType, blockheight);
    }
}