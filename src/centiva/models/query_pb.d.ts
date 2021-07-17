// package: hit_foundation.query
// file: query.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Query extends jspb.Message {
  hasQueryType(): boolean;
  clearQueryType(): void;
  getQueryType(): Query.Type | undefined;
  setQueryType(value: Query.Type): void;

  hasOp(): boolean;
  clearOp(): void;
  getOp(): Query.Operation | undefined;
  setOp(value: Query.Operation): void;

  hasSeekerName(): boolean;
  clearSeekerName(): void;
  getSeekerName(): string | undefined;
  setSeekerName(value: string): void;

  hasQueryId(): boolean;
  clearQueryId(): void;
  getQueryId(): number | undefined;
  setQueryId(value: number): void;

  hasExpirationDate(): boolean;
  clearExpirationDate(): void;
  getExpirationDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExpirationDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasQueryUrl(): boolean;
  clearQueryUrl(): void;
  getQueryUrl(): string | undefined;
  setQueryUrl(value: string): void;

  hasIncentiveTokenAmountMicros(): boolean;
  clearIncentiveTokenAmountMicros(): void;
  getIncentiveTokenAmountMicros(): number | undefined;
  setIncentiveTokenAmountMicros(value: number): void;

  hasSequenceNumber(): boolean;
  clearSequenceNumber(): void;
  getSequenceNumber(): number | undefined;
  setSequenceNumber(value: number): void;

  hasSeekerSignature(): boolean;
  clearSeekerSignature(): void;
  getSeekerSignature(): Uint8Array | string;
  getSeekerSignature_asU8(): Uint8Array;
  getSeekerSignature_asB64(): string;
  setSeekerSignature(value: Uint8Array | string): void;

  clearCountryCodeList(): void;
  getCountryCodeList(): Array<string>;
  setCountryCodeList(value: Array<string>): void;
  addCountryCode(value: string, index?: number): string;

  hasMinAgeYears(): boolean;
  clearMinAgeYears(): void;
  getMinAgeYears(): number | undefined;
  setMinAgeYears(value: number): void;

  hasMaxAgeYears(): boolean;
  clearMaxAgeYears(): void;
  getMaxAgeYears(): number | undefined;
  setMaxAgeYears(value: number): void;

  hasGender(): boolean;
  clearGender(): void;
  getGender(): Query.Gender | undefined;
  setGender(value: Query.Gender): void;

  hasMinHeightCm(): boolean;
  clearMinHeightCm(): void;
  getMinHeightCm(): number | undefined;
  setMinHeightCm(value: number): void;

  hasMaxHeightCm(): boolean;
  clearMaxHeightCm(): void;
  getMaxHeightCm(): number | undefined;
  setMaxHeightCm(value: number): void;

  hasMinWeightKg(): boolean;
  clearMinWeightKg(): void;
  getMinWeightKg(): number | undefined;
  setMinWeightKg(value: number): void;

  hasMaxWeightKg(): boolean;
  clearMaxWeightKg(): void;
  getMaxWeightKg(): number | undefined;
  setMaxWeightKg(value: number): void;

  hasMinPhysicalActivityLevel(): boolean;
  clearMinPhysicalActivityLevel(): void;
  getMinPhysicalActivityLevel(): Query.PhysicalActivityLevel | undefined;
  setMinPhysicalActivityLevel(value: Query.PhysicalActivityLevel): void;

  hasMaxPhysicalActivityLevel(): boolean;
  clearMaxPhysicalActivityLevel(): void;
  getMaxPhysicalActivityLevel(): Query.PhysicalActivityLevel | undefined;
  setMaxPhysicalActivityLevel(value: Query.PhysicalActivityLevel): void;

  hasMinSmokerStatus(): boolean;
  clearMinSmokerStatus(): void;
  getMinSmokerStatus(): Query.SmokerStatus | undefined;
  setMinSmokerStatus(value: Query.SmokerStatus): void;

  hasMaxSmokerStatus(): boolean;
  clearMaxSmokerStatus(): void;
  getMaxSmokerStatus(): Query.SmokerStatus | undefined;
  setMaxSmokerStatus(value: Query.SmokerStatus): void;

  hasQueryTitle(): boolean;
  clearQueryTitle(): void;
  getQueryTitle(): string | undefined;
  setQueryTitle(value: string): void;

  hasQueryDescription(): boolean;
  clearQueryDescription(): void;
  getQueryDescription(): string | undefined;
  setQueryDescription(value: string): void;

  hasEstimatedCompletionTimeSec(): boolean;
  clearEstimatedCompletionTimeSec(): void;
  getEstimatedCompletionTimeSec(): number | undefined;
  setEstimatedCompletionTimeSec(value: number): void;

  hasLanguageCode(): boolean;
  clearLanguageCode(): void;
  getLanguageCode(): string | undefined;
  setLanguageCode(value: string): void;

  hasOfferQuery(): boolean;
  clearOfferQuery(): void;
  getOfferQuery(): Query.OfferQuery | undefined;
  setOfferQuery(value?: Query.OfferQuery): void;

  hasProviderPublicKey(): boolean;
  clearProviderPublicKey(): void;
  getProviderPublicKey(): string | undefined;
  setProviderPublicKey(value: string): void;

  hasRestrictByRegisteredProvider(): boolean;
  clearRestrictByRegisteredProvider(): void;
  getRestrictByRegisteredProvider(): boolean | undefined;
  setRestrictByRegisteredProvider(value: boolean): void;

  clearDiagnosisCodeList(): void;
  getDiagnosisCodeList(): Array<string>;
  setDiagnosisCodeList(value: Array<string>): void;
  addDiagnosisCode(value: string, index?: number): string;

  hasPubHealthStatus(): boolean;
  clearPubHealthStatus(): void;
  getPubHealthStatus(): Query.PUB_HEALTH_STATUS | undefined;
  setPubHealthStatus(value: Query.PUB_HEALTH_STATUS): void;

  hasMustCompleteQueryId(): boolean;
  clearMustCompleteQueryId(): void;
  getMustCompleteQueryId(): number | undefined;
  setMustCompleteQueryId(value: number): void;

  hasReactivateAfterMinutes(): boolean;
  clearReactivateAfterMinutes(): void;
  getReactivateAfterMinutes(): number | undefined;
  setReactivateAfterMinutes(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Query.AsObject;
  static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Query;
  static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
  export type AsObject = {
    queryType?: Query.Type,
    op?: Query.Operation,
    seekerName?: string,
    queryId?: number,
    expirationDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    queryUrl?: string,
    incentiveTokenAmountMicros?: number,
    sequenceNumber?: number,
    seekerSignature: Uint8Array | string,
    countryCodeList: Array<string>,
    minAgeYears?: number,
    maxAgeYears?: number,
    gender?: Query.Gender,
    minHeightCm?: number,
    maxHeightCm?: number,
    minWeightKg?: number,
    maxWeightKg?: number,
    minPhysicalActivityLevel?: Query.PhysicalActivityLevel,
    maxPhysicalActivityLevel?: Query.PhysicalActivityLevel,
    minSmokerStatus?: Query.SmokerStatus,
    maxSmokerStatus?: Query.SmokerStatus,
    queryTitle?: string,
    queryDescription?: string,
    estimatedCompletionTimeSec?: number,
    languageCode?: string,
    offerQuery?: Query.OfferQuery.AsObject,
    providerPublicKey?: string,
    restrictByRegisteredProvider?: boolean,
    diagnosisCodeList: Array<string>,
    pubHealthStatus?: Query.PUB_HEALTH_STATUS,
    mustCompleteQueryId?: number,
    reactivateAfterMinutes?: number,
  }

  export class OfferQuery extends jspb.Message {
    hasTokenAmountMicros(): boolean;
    clearTokenAmountMicros(): void;
    getTokenAmountMicros(): number | undefined;
    setTokenAmountMicros(value: number): void;

    hasRedeemOffer(): boolean;
    clearRedeemOffer(): void;
    getRedeemOffer(): number | undefined;
    setRedeemOffer(value: number): void;

    hasMaxRedeemCount(): boolean;
    clearMaxRedeemCount(): void;
    getMaxRedeemCount(): number | undefined;
    setMaxRedeemCount(value: number): void;

    hasRedemptionPublicKey(): boolean;
    clearRedemptionPublicKey(): void;
    getRedemptionPublicKey(): string | undefined;
    setRedemptionPublicKey(value: string): void;

    clearFieldNameList(): void;
    getFieldNameList(): Array<string>;
    setFieldNameList(value: Array<string>): void;
    addFieldName(value: string, index?: number): string;

    hasRedeemPopupMessage(): boolean;
    clearRedeemPopupMessage(): void;
    getRedeemPopupMessage(): string | undefined;
    setRedeemPopupMessage(value: string): void;

    hasRedemptionUnitLabel(): boolean;
    clearRedemptionUnitLabel(): void;
    getRedemptionUnitLabel(): string | undefined;
    setRedemptionUnitLabel(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OfferQuery.AsObject;
    static toObject(includeInstance: boolean, msg: OfferQuery): OfferQuery.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OfferQuery, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OfferQuery;
    static deserializeBinaryFromReader(message: OfferQuery, reader: jspb.BinaryReader): OfferQuery;
  }

  export namespace OfferQuery {
    export type AsObject = {
      tokenAmountMicros?: number,
      redeemOffer?: number,
      maxRedeemCount?: number,
      redemptionPublicKey?: string,
      fieldNameList: Array<string>,
      redeemPopupMessage?: string,
      redemptionUnitLabel?: string,
    }
  }

  export enum Type {
    QUERY_TYPE_NIL = 0,
    QUERY_INFO_REQUEST = 1,
    QUERY_REFERRAL_BONUS = 2,
    QUERY_REDEMPTION_OFFER = 3,
    QUERY_COMMS = 4,
    QUERY_PUB_HEALTH = 5,
    QUERY_FEATURE_METADATA = 6,
  }

  export enum Operation {
    QUERY_NIL = 0,
    QUERY_NEW = 1,
    QUERY_UPDATE = 2,
    QUERY_DISABLE = 3,
  }

  export enum Gender {
    GENDER_NIL = 0,
    GENDER_FEMALE = 1,
    GENDER_MALE = 2,
    GENDER_OTHER = 3,
  }

  export enum PhysicalActivityLevel {
    PHYSICAL_ACTIVITY_NIL = 0,
    PHYSICAL_ACTIVITY_LOW = 1,
    PHYSICAL_ACTIVITY_OCCASIONAL_LIGHT = 2,
    PHYSICAL_ACTIVITY_REGULAR = 3,
    PHYSICAL_ACTIVITY_HIGH = 4,
  }

  export enum SmokerStatus {
    SMOKER_STATUS_NIL = 0,
    SMOKER_STATUS_NONSMOKER = 1,
    SMOKER_STATUS_OCCASIONAL = 2,
    SMOKER_STATUS_REGULAR = 3,
    SMOKER_STATUS_HEAVY = 4,
  }

  export enum PUB_HEALTH_STATUS {
    PUB_HEALTH_NO_STATUS = 0,
    PUB_HEALTH_SUSPECT = 1,
    PUB_HEALTH_DIAGNOSED = 2,
  }
}

export class QueryResponse extends jspb.Message {
  hasQueryId(): boolean;
  clearQueryId(): void;
  getQueryId(): number | undefined;
  setQueryId(value: number): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): boolean | undefined;
  setStatus(value: boolean): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): string | undefined;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryResponse): QueryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryResponse;
  static deserializeBinaryFromReader(message: QueryResponse, reader: jspb.BinaryReader): QueryResponse;
}

export namespace QueryResponse {
  export type AsObject = {
    queryId?: number,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    status?: boolean,
    message?: string,
  }
}

