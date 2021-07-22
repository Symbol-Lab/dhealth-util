// package: health.centiva.api
// file: pub_health_test_report.proto

import * as jspb from "google-protobuf";

export class PubHealthTestReportRequest extends jspb.Message {
  getPubKey(): string;
  setPubKey(value: string): void;

  getAuthToken(): string;
  setAuthToken(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getPlace(): string;
  setPlace(value: string): void;

  getPostCode(): string;
  setPostCode(value: string): void;

  getVerificationCode(): string;
  setVerificationCode(value: string): void;

  getGender(): PubHealthTestReportRequest.Gender;
  setGender(value: PubHealthTestReportRequest.Gender): void;

  getAgeBracket(): number;
  setAgeBracket(value: number): void;

  getBracketSizeYears(): number;
  setBracketSizeYears(value: number): void;

  getTestDate(): number;
  setTestDate(value: number): void;

  getResultDate(): number;
  setResultDate(value: number): void;

  getOutcome(): boolean;
  setOutcome(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PubHealthTestReportRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PubHealthTestReportRequest): PubHealthTestReportRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PubHealthTestReportRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PubHealthTestReportRequest;
  static deserializeBinaryFromReader(message: PubHealthTestReportRequest, reader: jspb.BinaryReader): PubHealthTestReportRequest;
}

export namespace PubHealthTestReportRequest {
  export type AsObject = {
    pubKey: string,
    authToken: string,
    signature: string,
    countryCode: string,
    place: string,
    postCode: string,
    verificationCode: string,
    gender: PubHealthTestReportRequest.Gender,
    ageBracket: number,
    bracketSizeYears: number,
    testDate: number,
    resultDate: number,
    outcome: boolean,
  }

  export enum Gender {
    GENDER_UNSPECIFIED = 0,
    GENDER_MALE = 1,
    GENDER_FEMALE = 2,
    GENDER_OTHER = 3,
  }
}

export class PubHealthTestReportResponse extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PubHealthTestReportResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PubHealthTestReportResponse): PubHealthTestReportResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PubHealthTestReportResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PubHealthTestReportResponse;
  static deserializeBinaryFromReader(message: PubHealthTestReportResponse, reader: jspb.BinaryReader): PubHealthTestReportResponse;
}

export namespace PubHealthTestReportResponse {
  export type AsObject = {
    ok: boolean,
    error: string,
  }
}

