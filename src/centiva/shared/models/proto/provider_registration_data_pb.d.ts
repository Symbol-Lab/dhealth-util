// package: 
// file: provider_registration_data.proto

import * as jspb from "google-protobuf";

export class ProviderRegistrationData extends jspb.Message {
  getPatientId(): string;
  setPatientId(value: string): void;

  getProviderPublicKey(): string;
  setProviderPublicKey(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getWm(): boolean;
  setWm(value: boolean): void;

  getSignature(): string;
  setSignature(value: string): void;

  getInfoText(): string;
  setInfoText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProviderRegistrationData.AsObject;
  static toObject(includeInstance: boolean, msg: ProviderRegistrationData): ProviderRegistrationData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProviderRegistrationData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProviderRegistrationData;
  static deserializeBinaryFromReader(message: ProviderRegistrationData, reader: jspb.BinaryReader): ProviderRegistrationData;
}

export namespace ProviderRegistrationData {
  export type AsObject = {
    patientId: string,
    providerPublicKey: string,
    url: string,
    wm: boolean,
    signature: string,
    infoText: string,
  }
}

