import { NetworkType } from 'symbol-sdk';
import * as config from './NetworkConfig';
const axios = require('axios');

export class NetworkUtil {
  public static async getNodeFromNetwork(networkType: NetworkType) {
    const available_nodes = config.networks[networkType].nodes;
    for (const node of available_nodes) {
      const nodeIsUp = await this.nodeIsUp(`${node.url}/node/health`);
      if (nodeIsUp) {
        return node;
      }
    }
    throw new Error(`No available node from network ${networkType}`);
  }

  public static async nodeIsUp(nodeUrl: string) {
    const res = await axios.get(nodeUrl).catch(() => {
      return false;
    });
    if (res.data && res.data.status.apiNode === 'up' && res.data.status.db === 'up') {
      return true;
    }
    return false;
  }

  public static getNetworkTypeFromAddress(rawAddress: string) {
    return rawAddress.substring(0, 1) === 'T' ? NetworkType.TEST_NET : NetworkType.MAIN_NET;
  }
}