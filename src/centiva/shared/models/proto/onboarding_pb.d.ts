// package: health.centiva.api
// file: onboarding.proto

import * as jspb from "google-protobuf";

export class ChangeTokenRequest extends jspb.Message {
  getPrimaryPubKey(): string;
  setPrimaryPubKey(value: string): void;

  getPrimaryAuthToken(): string;
  setPrimaryAuthToken(value: string): void;

  getNewPubKey(): string;
  setNewPubKey(value: string): void;

  getPrimaryKeySignature(): string;
  setPrimaryKeySignature(value: string): void;

  getNewKeySignature(): string;
  setNewKeySignature(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeTokenRequest): ChangeTokenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangeTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeTokenRequest;
  static deserializeBinaryFromReader(message: ChangeTokenRequest, reader: jspb.BinaryReader): ChangeTokenRequest;
}

export namespace ChangeTokenRequest {
  export type AsObject = {
    primaryPubKey: string,
    primaryAuthToken: string,
    newPubKey: string,
    primaryKeySignature: string,
    newKeySignature: string,
  }
}

export class ChangeTokenResponse extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  getAuthToken(): string;
  setAuthToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeTokenResponse): ChangeTokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangeTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeTokenResponse;
  static deserializeBinaryFromReader(message: ChangeTokenResponse, reader: jspb.BinaryReader): ChangeTokenResponse;
}

export namespace ChangeTokenResponse {
  export type AsObject = {
    ok: boolean,
    error: string,
    authToken: string,
  }
}

