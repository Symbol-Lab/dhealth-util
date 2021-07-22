// package: health.centiva.api
// file: pub_health_geo_aid.proto

import * as jspb from "google-protobuf";

export class GeoCheckinsRequest extends jspb.Message {
  getPubKey(): string;
  setPubKey(value: string): void;

  getAuthToken(): string;
  setAuthToken(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  getVerificationCode(): string;
  setVerificationCode(value: string): void;

  clearCheckInsList(): void;
  getCheckInsList(): Array<GeoCheckinsRequest.CheckIn>;
  setCheckInsList(value: Array<GeoCheckinsRequest.CheckIn>): void;
  addCheckIns(value?: GeoCheckinsRequest.CheckIn, index?: number): GeoCheckinsRequest.CheckIn;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeoCheckinsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GeoCheckinsRequest): GeoCheckinsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeoCheckinsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeoCheckinsRequest;
  static deserializeBinaryFromReader(message: GeoCheckinsRequest, reader: jspb.BinaryReader): GeoCheckinsRequest;
}

export namespace GeoCheckinsRequest {
  export type AsObject = {
    pubKey: string,
    authToken: string,
    signature: string,
    verificationCode: string,
    checkInsList: Array<GeoCheckinsRequest.CheckIn.AsObject>,
  }

  export class CheckIn extends jspb.Message {
    getType(): number;
    setType(value: number): void;

    getPoiid(): string;
    setPoiid(value: string): void;

    getPoint(): string;
    setPoint(value: string): void;

    getArea(): string;
    setArea(value: string): void;

    getStarttime(): number;
    setStarttime(value: number): void;

    getEndtime(): number;
    setEndtime(value: number): void;

    getIsVerified(): boolean;
    setIsVerified(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckIn.AsObject;
    static toObject(includeInstance: boolean, msg: CheckIn): CheckIn.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckIn, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckIn;
    static deserializeBinaryFromReader(message: CheckIn, reader: jspb.BinaryReader): CheckIn;
  }

  export namespace CheckIn {
    export type AsObject = {
      type: number,
      poiid: string,
      point: string,
      area: string,
      starttime: number,
      endtime: number,
      isVerified: boolean,
    }
  }
}

export class GeoCheckinsResponse extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeoCheckinsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GeoCheckinsResponse): GeoCheckinsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeoCheckinsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeoCheckinsResponse;
  static deserializeBinaryFromReader(message: GeoCheckinsResponse, reader: jspb.BinaryReader): GeoCheckinsResponse;
}

export namespace GeoCheckinsResponse {
  export type AsObject = {
    ok: boolean,
    error: string,
  }
}

export class GeoGetCheckinsRequest extends jspb.Message {
  getPubKey(): string;
  setPubKey(value: string): void;

  getAuthToken(): string;
  setAuthToken(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  getArea(): string;
  setArea(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeoGetCheckinsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GeoGetCheckinsRequest): GeoGetCheckinsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeoGetCheckinsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeoGetCheckinsRequest;
  static deserializeBinaryFromReader(message: GeoGetCheckinsRequest, reader: jspb.BinaryReader): GeoGetCheckinsRequest;
}

export namespace GeoGetCheckinsRequest {
  export type AsObject = {
    pubKey: string,
    authToken: string,
    signature: string,
    area: string,
  }
}

export class GeoGetCheckinsResponse extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearDataList(): void;
  getDataList(): Array<GeoCheckinsRequest.CheckIn>;
  setDataList(value: Array<GeoCheckinsRequest.CheckIn>): void;
  addData(value?: GeoCheckinsRequest.CheckIn, index?: number): GeoCheckinsRequest.CheckIn;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeoGetCheckinsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GeoGetCheckinsResponse): GeoGetCheckinsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeoGetCheckinsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeoGetCheckinsResponse;
  static deserializeBinaryFromReader(message: GeoGetCheckinsResponse, reader: jspb.BinaryReader): GeoGetCheckinsResponse;
}

export namespace GeoGetCheckinsResponse {
  export type AsObject = {
    ok: boolean,
    error: string,
    dataList: Array<GeoCheckinsRequest.CheckIn.AsObject>,
  }
}

