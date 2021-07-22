// package: hit_foundation.OfferUserData
// file: offer-user-data.proto

import * as jspb from "google-protobuf";

export class OfferUserData extends jspb.Message {
  hasOfferId(): boolean;
  clearOfferId(): void;
  getOfferId(): number | undefined;
  setOfferId(value: number): void;

  clearUserDataList(): void;
  getUserDataList(): Array<string>;
  setUserDataList(value: Array<string>): void;
  addUserData(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OfferUserData.AsObject;
  static toObject(includeInstance: boolean, msg: OfferUserData): OfferUserData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OfferUserData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OfferUserData;
  static deserializeBinaryFromReader(message: OfferUserData, reader: jspb.BinaryReader): OfferUserData;
}

export namespace OfferUserData {
  export type AsObject = {
    offerId?: number,
    userDataList: Array<string>,
  }
}

