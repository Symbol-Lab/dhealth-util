// package: health.centiva.api
// file: pub_health_daily_report.proto

import * as jspb from "google-protobuf";

export class PubHealthDailyReportRequest extends jspb.Message {
  getPubKey(): string;
  setPubKey(value: string): void;

  getAuthToken(): string;
  setAuthToken(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  getLanguageCode(): string;
  setLanguageCode(value: string): void;

  getGender(): PubHealthDailyReportRequest.Gender;
  setGender(value: PubHealthDailyReportRequest.Gender): void;

  getAgeBracket(): number;
  setAgeBracket(value: number): void;

  getBracketSizeYears(): number;
  setBracketSizeYears(value: number): void;

  getTestPerformed(): boolean;
  setTestPerformed(value: boolean): void;

  getTestOutcomeKnown(): boolean;
  setTestOutcomeKnown(value: boolean): void;

  getTestOutcome(): boolean;
  setTestOutcome(value: boolean): void;

  getFever(): boolean;
  setFever(value: boolean): void;

  getCoughSoreThroatOrShortnessOfBreath(): boolean;
  setCoughSoreThroatOrShortnessOfBreath(value: boolean): void;

  getMuscleAche(): boolean;
  setMuscleAche(value: boolean): void;

  getLossOfSmellOrTaste(): boolean;
  setLossOfSmellOrTaste(value: boolean): void;

  getHeadache(): boolean;
  setHeadache(value: boolean): void;

  getDiarrhea(): boolean;
  setDiarrhea(value: boolean): void;

  getConjunctivitis(): boolean;
  setConjunctivitis(value: boolean): void;

  getHeadCold(): boolean;
  setHeadCold(value: boolean): void;

  getOtherSymptom(): string;
  setOtherSymptom(value: string): void;

  getOnMedsHypertension(): boolean;
  setOnMedsHypertension(value: boolean): void;

  getOnMedsDiabetes(): boolean;
  setOnMedsDiabetes(value: boolean): void;

  getChronicRespiratoryIssues(): boolean;
  setChronicRespiratoryIssues(value: boolean): void;

  getOnMedsImmunosuppression(): boolean;
  setOnMedsImmunosuppression(value: boolean): void;

  getChemoOrRadioTherapy(): boolean;
  setChemoOrRadioTherapy(value: boolean): void;

  getOtherSpecifiedHealthCondition(): boolean;
  setOtherSpecifiedHealthCondition(value: boolean): void;

  getProximity(): boolean;
  setProximity(value: boolean): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getPlaceName(): string;
  setPlaceName(value: string): void;

  getPostCode(): string;
  setPostCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PubHealthDailyReportRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PubHealthDailyReportRequest): PubHealthDailyReportRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PubHealthDailyReportRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PubHealthDailyReportRequest;
  static deserializeBinaryFromReader(message: PubHealthDailyReportRequest, reader: jspb.BinaryReader): PubHealthDailyReportRequest;
}

export namespace PubHealthDailyReportRequest {
  export type AsObject = {
    pubKey: string,
    authToken: string,
    signature: string,
    languageCode: string,
    gender: PubHealthDailyReportRequest.Gender,
    ageBracket: number,
    bracketSizeYears: number,
    testPerformed: boolean,
    testOutcomeKnown: boolean,
    testOutcome: boolean,
    fever: boolean,
    coughSoreThroatOrShortnessOfBreath: boolean,
    muscleAche: boolean,
    lossOfSmellOrTaste: boolean,
    headache: boolean,
    diarrhea: boolean,
    conjunctivitis: boolean,
    headCold: boolean,
    otherSymptom: string,
    onMedsHypertension: boolean,
    onMedsDiabetes: boolean,
    chronicRespiratoryIssues: boolean,
    onMedsImmunosuppression: boolean,
    chemoOrRadioTherapy: boolean,
    otherSpecifiedHealthCondition: boolean,
    proximity: boolean,
    countryCode: string,
    placeName: string,
    postCode: string,
  }

  export enum Gender {
    GENDER_UNSPECIFIED = 0,
    GENDER_MALE = 1,
    GENDER_FEMALE = 2,
    GENDER_OTHER = 3,
  }
}

export class PubHealthDailyReportResponse extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PubHealthDailyReportResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PubHealthDailyReportResponse): PubHealthDailyReportResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PubHealthDailyReportResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PubHealthDailyReportResponse;
  static deserializeBinaryFromReader(message: PubHealthDailyReportResponse, reader: jspb.BinaryReader): PubHealthDailyReportResponse;
}

export namespace PubHealthDailyReportResponse {
  export type AsObject = {
    ok: boolean,
    error: string,
  }
}

