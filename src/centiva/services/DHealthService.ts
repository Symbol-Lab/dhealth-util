import { Instant, LocalDateTime, ZoneId } from 'js-joda';
import {
  Account, AccountHttp, Convert, TransactionGroup, NetworkUtil,
  MosaicUtil, Transaction, TransactionType, TransferTransaction, TransactionUtil
} from '../../';
import { Constants } from './ConstantsService';
import { SeekerProperties } from '../models/seeker-properties';
import { Query } from '../models/query_pb';
import { QueryInfo } from '../models/query-info';

export class DHealthService {
  private seekerApprovedMap: Map<string, SeekerProperties>;

  constructor(
    private constants: Constants,
    private accountHttp: AccountHttp
  ) {
    // this.initialConectionPull();
    this.seekerApprovedMap = new Map();
  }


  private async getListSeekerApprovedTxs(loadPage: number): Promise<any> {
    let countPage = 0;
    let lastId: number;
    let allTxs: Array<TransferTransaction> = new Array();
    const authorityAddress: string = await this.constants.getApprovevalAuthorityAddress();
    while (countPage < loadPage) {
      const result = await TransactionUtil.getOutgoingTransactions(
        authorityAddress,
        TransactionGroup.Confirmed,
        countPage,
        100,
        await MosaicUtil.getMosaicIdFromNamespace(
          NetworkUtil.getNetworkTypeFromAddress(authorityAddress),
          'dhealth.dhp'
        )
      )
      if (result && result.length > 0) {
        allTxs = allTxs.concat(result as TransferTransaction[]);
      }
      else {
        break;
      }
      countPage++;
    }
    allTxs = allTxs.filter(x => x.isConfirmed() && x.type === TransactionType.TRANSFER);
    console.log('allTxs', allTxs);
    return allTxs;
  }

  public async getMapSeekerApproved(): Promise<any> {
    const seekerApprovedList = await this.getListSeekerApprovedTxs(1);
    this.seekerApprovedMap = new Map();
    for (const approvedTxs of seekerApprovedList) {
      const message: any = approvedTxs.message;
      const plainMessage: string = message.payload;
      const timestampTx = await TransactionUtil.getTimestampFromTransaction(approvedTxs);
      const timestampLocalDateTime = LocalDateTime.ofInstant(
        Instant.ofEpochMilli(timestampTx * 1000),
        ZoneId.systemDefault()
      );

      if (!this.seekerApprovedMap.has(approvedTxs.recipientAddress.plain())) {
        if (plainMessage.includes('SEEKER_APPROVED')) {
          const seekerName = message.payload.substring(16, message.payload.length);
          this.seekerApprovedMap.set(approvedTxs.recipientAddress.plain(),
            new SeekerProperties
              (
                this.constants.SEEKER_PERMISSION.SEEKER_APPROVED,
                timestampLocalDateTime,
                seekerName
              )
          );
        }
        else if (plainMessage.includes('SEEKER_DISAPPROVED')) {
          this.seekerApprovedMap.set(approvedTxs.recipientAddress.plain(),
            new SeekerProperties(
              this.constants.SEEKER_PERMISSION.SEEKER_DISAPPROVED,
              timestampLocalDateTime,
            ));
        }
      }
    }
    console.log('sync-queries-task.ts--initializeSeekerApprovedMap()__approveTransactionMap', this.seekerApprovedMap);
    return this.seekerApprovedMap;
  }

  async getSinkAddressTxs(loadPage: number): Promise<Array<Transaction>> {
    let countPage = 0;
    let allTransactions: Array<Transaction> = [];
    const sinkAddress: string = await this.constants.getSinkAddress();
    console.log("account https", this.accountHttp)
    while (countPage < loadPage) {
      const result = await TransactionUtil.getIncommingTransactions(
        sinkAddress,
        TransactionGroup.Confirmed,
        countPage,
        100,
        await MosaicUtil.getMosaicIdFromNamespace(
          NetworkUtil.getNetworkTypeFromAddress(sinkAddress),
          'dhealth.dhp'
        )
      )
      if (result && result.length > 0) {
        allTransactions = allTransactions.concat(result as TransferTransaction[]);
      }
      else {
        break;
      }
      countPage++;
    }
    return allTransactions;
  }

  filterTxsFromSeeker(sinkAddressTxs: Array<Transaction>, seekerApprovedMap: Map<string, SeekerProperties>): Array<Transaction> {
    if (sinkAddressTxs && sinkAddressTxs.length > 0) {
      return sinkAddressTxs.filter(async txs => {
          const transaction = txs as TransferTransaction;
          await this.isTxsFromSeeker(seekerApprovedMap, transaction)
      });
    }
    return [];
  }

  public async isTxsFromSeeker(seekerAppredMap: Map<string, SeekerProperties>, txs: TransferTransaction): Promise<boolean> {
    const seekerPubAddress = txs.signer?.address.plain();
    if (seekerPubAddress && seekerAppredMap.has(seekerPubAddress)) {
      const timestampTx = await TransactionUtil.getTimestampFromTransaction(txs);
      const timestampLocalDateTime = LocalDateTime.ofInstant(
        Instant.ofEpochMilli(timestampTx * 1000),
        ZoneId.systemDefault()
      );
      const seekerProperties = seekerAppredMap.get(seekerPubAddress);
      if (seekerProperties?.seekerApproved === this.constants.SEEKER_PERMISSION.SEEKER_APPROVED &&
        seekerProperties.timestamp < timestampLocalDateTime) {
        return true;
      }
    }
    return false;
  }

  getHexMessage(message: string): string {
    return message.startsWith('fe') ? message.substring(2, message.length) : message;
  }

  async getSurveys(): Promise<Array<QueryInfo>> {
    const sinkAddressTxs = await this.getSinkAddressTxs(this.constants.LOAD_PAGE_TXS);
    const seekerApprovedMap = await this.getMapSeekerApproved();
    const txsFromSeeker = await this.filterTxsFromSeeker(sinkAddressTxs, seekerApprovedMap);
    const queryInfoList: Array<QueryInfo> = await this.filterQueriesProtobuf(txsFromSeeker);
    const activeQueryInfo: Array<QueryInfo> = this.filterActiveQueries(queryInfoList);
    console.log('queries', activeQueryInfo, activeQueryInfo.length);
    return activeQueryInfo;
  }

  async filterQueriesProtobuf(txsFromSeeker: Array<Transaction>): Promise<QueryInfo[]> {
    if (txsFromSeeker) {
      const result = new Array<QueryInfo>();
      for (const txs of txsFromSeeker) {
        const tx = await this.parseTxToQueryInfo(txs);
        result.push(tx as QueryInfo);
      }
      return result;
    }
    return [];
  }

  filterActiveQueries(queryList: Array<QueryInfo>): Array<QueryInfo> {
    if (!queryList) {
      return [];
    }
    const activeQueryMap: Map<number, QueryInfo> = new Map(); // include update, new query
    for (const queryInfo of queryList) {
        const rawQueryData = queryInfo.rawQueryData;
        const queryId = queryInfo.rawQueryData?.getQueryId();
        const queryOp = rawQueryData?.getOp();
        const queryExpired = this.isExpiredQuery(rawQueryData as Query);
        const existingActiveQuery = activeQueryMap.get(Number(queryId));
        // Disable type
        if (queryOp === Query.Operation.QUERY_DISABLE) {
            if (existingActiveQuery) {
                activeQueryMap.delete(Number(queryId));
            }
        }
        // Other types
        if (queryOp !== Query.Operation.QUERY_DISABLE && !queryExpired) {
            activeQueryMap.set(Number(queryId), queryInfo);
        }
    }
    return Array.from(activeQueryMap, ([name, value]) => (value));
  }

  isQueryNewUpdate(query: Query): boolean {
    if (query.hasOp() && (query.getOp() === Query.Operation.QUERY_NEW
      || query.getOp() === Query.Operation.QUERY_UPDATE)) {
      return true;
    }
    return false;
  }

  isIncomingDisableQuery( // incoming query is query disable
    activeQueryMap: Map<number, QueryInfo>,
    disableQueryMap: Map<number, QueryInfo>,
    query: Query
  ): boolean {
    if (query.hasQueryId() && !activeQueryMap.has(Number(query.getQueryId()))
      && !disableQueryMap.has(Number(query.getQueryId()))
      && query.hasOp() && (query.getOp() === Query.Operation.QUERY_DISABLE)) {
      return true;
    }
    return false;
  }

  isExpiredQuery(queryData: Query): boolean {
    if (queryData && queryData.hasExpirationDate()) {
      const expirationDate = queryData.getExpirationDate()
      if (expirationDate) {
        return expirationDate.getSeconds() - (new Date().getTime() / 1000) <= 0;
      }
    }
    return true;
  }

  async parseTxToQueryInfo(txs: Transaction): Promise<undefined | QueryInfo> {
    const transferTx = txs as TransferTransaction;
    if (transferTx && transferTx.message && transferTx.message.payload) {
      const message = this.getHexMessage(transferTx.message.payload);
      if (message.length > 16) {
        try {
          const byte: Uint8Array = Convert.hexToUint8(message);
          const txTimestamp = await TransactionUtil.getTimestampFromTransaction(transferTx);
          const queryInfo = new QueryInfo(
            transferTx.signer?.address.plain(),
            txTimestamp,
            Query.deserializeBinary(byte)
          );
          return queryInfo;
        } catch (error) {
          console.log('nem.service.ts__parseTxToQuery_fail', error);
        }
      }
    }
    return undefined;
  }

  public async sendTxs(account: Account, message: string, sinkAddress: string): Promise<void> {
    const txs = await TransactionUtil.createTransferTransaction(
      this.constants.networkType,
      this.constants.getSinkAddress(),
      [TransactionUtil.getMosaicFromNamespace('dhealth.dhp', 0)],
      message,
      100000
    );
    console.log('txs: ', txs);
    await this.announceTransaction(account, txs);
  }

  private async announceTransaction(account: Account, transferTxs: Transaction) {
    const signTxs = await TransactionUtil.signTransaction(account, transferTxs);
    console.log('Transaction Hash:', signTxs.hash);
    const result = await TransactionUtil.announceTransaction(signTxs).catch(err => {
      console.log('There was an error when sending txs', err);
    });
    console.log('Anounce txs succesfuly!', result);
  }
}
