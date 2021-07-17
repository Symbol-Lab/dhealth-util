import { Query } from '../models/query_pb';
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import {
  Account
} from '../../';
import { Constants } from './ConstantsService';
import { DHealthService } from './DHealthService';
import { QueryInfo } from '../models/query-info';
import { BehaviorSubject } from 'rxjs';

export class QueryService {
  public numberQuery: number;
  public queryInfoBhv = new BehaviorSubject([]);
  public cachedListQueries: Array<QueryInfo>;
  constructor(
    private constants: Constants,
    private dHealthService: DHealthService) {
    this.queryInfoBhv.subscribe(value => {
      this.cachedListQueries = value;
    });
    this.numberQuery = 0;
    this.cachedListQueries = new Array<QueryInfo>();
  }

  async composeQuery(queryForm: any): Promise<void> {
    if (!queryForm.value.privateKey) {
      return;
    }
    const account = Account.createFromPrivateKey(queryForm.value.privateKey, this.constants.networkType);
    const message = this.createQueryMessage(queryForm);
    console.log('message', message);
    const sinkAddress = await this.constants.getSinkAddress();
    this.dHealthService.sendTxs(account, message, sinkAddress);
  }

  createQueryMessage(queryForm: any): any {
    if (queryForm) {
      const queryFormValue = queryForm.value;
      const childQueryFormValues = queryForm.value.childForm;
      const restrictionFormValues = queryForm.value.restrictionForm;

      console.log(queryFormValue);
      console.log(childQueryFormValues);
      console.log(restrictionFormValues);

      const query = new Query();
      const offerQuery = new Query.OfferQuery();

      if (+queryFormValue.queryType) {
        query.setQueryType(+queryFormValue.queryType);
      }

      if (queryFormValue.queryOperation) {
        query.setOp(+queryFormValue.queryOperation);
      }

      if (childQueryFormValues && childQueryFormValues.queryId) {
        query.setQueryId(+childQueryFormValues.queryId);
      }
      if (childQueryFormValues && childQueryFormValues.sequenceNumber) {
        query.setSequenceNumber(+childQueryFormValues.sequenceNumber);
      }

      if (childQueryFormValues && childQueryFormValues.queryTitle) {
        query.setQueryTitle(childQueryFormValues.queryTitle);
      }

      if (childQueryFormValues && childQueryFormValues.seekerName) {
        query.setSeekerName(childQueryFormValues.seekerName);
      }

      if (childQueryFormValues && childQueryFormValues.queryDescription) {
        query.setQueryDescription(childQueryFormValues.queryDescription);
      }

      if (childQueryFormValues && childQueryFormValues.incentiveTokenAmountMicros) {
        query.setIncentiveTokenAmountMicros(+childQueryFormValues.incentiveTokenAmountMicros);
      }

      if (childQueryFormValues && childQueryFormValues.estimateTime) {
        query.setEstimatedCompletionTimeSec(+childQueryFormValues.estimateTime * 60);
      }

      if (childQueryFormValues && childQueryFormValues.expiredDate) {
        let timestampPb = new google_protobuf_timestamp_pb.Timestamp;
        timestampPb.fromDate(new Date(childQueryFormValues.expiredDate));
        query.setExpirationDate(timestampPb);
      }

      if (childQueryFormValues && childQueryFormValues.queryUrl) {
        query.setQueryUrl(childQueryFormValues.queryUrl);
      }

      if (restrictionFormValues && restrictionFormValues.countryCode) {
        query.addCountryCode(restrictionFormValues.countryCode);
      }

      if (restrictionFormValues && restrictionFormValues.minAgeYears) {
        query.setMinAgeYears(+restrictionFormValues.minAgeYears);
      }

      if (restrictionFormValues && restrictionFormValues.maxAgeYears) {
        query.setMaxAgeYears(+restrictionFormValues.maxAgeYears);
      }

      if (restrictionFormValues && restrictionFormValues.minHeightCm) {
        query.setMinHeightCm(+restrictionFormValues.minHeightCm);
      }

      if (restrictionFormValues && restrictionFormValues.maxHeightCm) {
        query.setMaxHeightCm(+restrictionFormValues.maxHeightCm);
      }

      if (restrictionFormValues && restrictionFormValues.minWeightKg) {
        query.setMinWeightKg(+restrictionFormValues.minWeightKg);
      }

      if (restrictionFormValues && restrictionFormValues.maxWeightKg) {
        query.setMaxWeightKg(+restrictionFormValues.maxWeightKg);
      }

      if (restrictionFormValues && restrictionFormValues.minPhysicalActivityLevel) {
        query.setMinPhysicalActivityLevel(+restrictionFormValues.minPhysicalActivityLevel);
      }

      if (restrictionFormValues && restrictionFormValues.maxPhysicalActivityLevel) {
        query.setMaxPhysicalActivityLevel(+restrictionFormValues.maxPhysicalActivityLevel);
      }

      if (restrictionFormValues && restrictionFormValues.minSmokerStatus) {
        query.setMinSmokerStatus(+restrictionFormValues.minSmokerStatus);
      }

      if (restrictionFormValues && restrictionFormValues.maxSmokerStatus) {
        query.setMaxSmokerStatus(+restrictionFormValues.maxSmokerStatus);
      }

      if (restrictionFormValues && restrictionFormValues.gender) {
        query.setGender(+restrictionFormValues.gender);
      }

      if (restrictionFormValues && restrictionFormValues.providerPublicKey) {
        query.setProviderPublicKey(restrictionFormValues.providerPublicKey);
      }

      if (restrictionFormValues && restrictionFormValues.diagnosisCode) {
        query.addDiagnosisCode(restrictionFormValues.diagnosisCode);
      }

      if (restrictionFormValues && restrictionFormValues.mustCompleteQueryId) {
        query.setMustCompleteQueryId(+restrictionFormValues.mustCompleteQueryId);
      }

      if (restrictionFormValues && restrictionFormValues.reactivateAfterMinutes) {
        query.setReactivateAfterMinutes(+restrictionFormValues.reactivateAfterMinutes);
      }

      //Offer query
      if (+queryFormValue.queryType === Query.Type.QUERY_REDEMPTION_OFFER &&
        +queryFormValue.queryOperation !== Query.Operation.QUERY_DISABLE) {
        offerQuery.setTokenAmountMicros(childQueryFormValues.tokensRequiredMicros);
        offerQuery.setMaxRedeemCount(childQueryFormValues.maxRedeemCount);
        offerQuery.addFieldName(childQueryFormValues.fieldName);
        offerQuery.setRedeemPopupMessage(childQueryFormValues.redeemPopupMessage);
        offerQuery.setRedemptionUnitLabel(childQueryFormValues.redemptionUnitLabel);
        if (childQueryFormValues.providerPublicKey) {
          offerQuery.setRedemptionPublicKey(childQueryFormValues.providerPublicKey);
        }
        query.setOfferQuery(offerQuery);
      }

      console.log('query.service.ts__query', query);
      console.log('query.service.ts__childQueryFormValues', childQueryFormValues);
      console.log('query.service.ts__restrictionFormValues', restrictionFormValues);

      const queryBytes = query.serializeBinary();
      const message = 'fe' + this.processingQueryBytesData(queryBytes);

      return message;
    }
  }

  createSeekerSignature(queryId: number, sequenceNumber: number, privateKey: string): any {
    const account = Account.createFromPrivateKey(privateKey, this.constants.networkType);
    const address = account.address;
    const seekerSignature = address + ':' + queryId + ':' + sequenceNumber;
    return account.signData(seekerSignature);
  }

  // convert byte to hex and add  16 Byte 0
  processingQueryBytesData(queryBytes: Uint8Array): string {
    return '00000000000000000000000000000000'.concat('', this.ua2hex(queryBytes));
  }

  ua2hex(ua: Uint8Array): string {
    const hexEncodeArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let s = '';
    for (let i = 0; i < ua.length; i++) {
      let code = ua[i];
      s += hexEncodeArray[code >>> 4];
      s += hexEncodeArray[code & 0x0F];
    }
    return s;
  }

  async getNumberQuery(): Promise<number> {
    const surveyList = await this.dHealthService.getSurveys();
    this.numberQuery = surveyList.length;
    return this.numberQuery;
  }

  checkUpdatedQueryInfoList(listNewQueries: Array<QueryInfo>, cachedListQueries: Array<QueryInfo>): boolean {
    // number
    if (listNewQueries.length !== cachedListQueries.length) {
      return true;
    }
    else if (listNewQueries.length > 0 && cachedListQueries.length > 0
      && listNewQueries) {
      if (listNewQueries[0].rawQueryData?.getQueryId() !== cachedListQueries[0].rawQueryData?.getQueryId()) {
        return true;
      }
    }
    return false;
  }

  async getQueryInfoList(): Promise<any> {
    if (!this.cachedListQueries) {
      this.cachedListQueries = await this.dHealthService.getSurveys();
    } else {
      return this.cachedListQueries;
    }
  }

  async updateQUeryInfoList(): Promise<void> {
    if (!this.cachedListQueries || this.cachedListQueries.length === 0) {
      const queryInfoList = await this.dHealthService.getSurveys();
      this.queryInfoBhv.next(queryInfoList as any);
      this.cachedListQueries = queryInfoList;
    } else {
      this.queryInfoBhv.next(this.cachedListQueries as any);
      const queryInfoList = await this.dHealthService.getSurveys();
      if (this.checkUpdatedQueryInfoList(queryInfoList, this.cachedListQueries)) {
        this.queryInfoBhv.next(queryInfoList as any);
        this.cachedListQueries = queryInfoList;
      }
    }
  }
}
