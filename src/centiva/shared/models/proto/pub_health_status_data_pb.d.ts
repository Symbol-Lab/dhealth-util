// package: hit_foundation.pub_health
// file: pub_health_status_data.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class PubHealthStatusData extends jspb.Message {
  hasPubHealthStatus(): boolean;
  clearPubHealthStatus(): void;
  getPubHealthStatus(): PubHealthStatusData.PubHealthStatus | undefined;
  setPubHealthStatus(value: PubHealthStatusData.PubHealthStatus): void;

  hasDiagnosisDate(): boolean;
  clearDiagnosisDate(): void;
  getDiagnosisDate(): number | undefined;
  setDiagnosisDate(value: number): void;

  hasShareable(): boolean;
  clearShareable(): void;
  getShareable(): boolean | undefined;
  setShareable(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PubHealthStatusData.AsObject;
  static toObject(includeInstance: boolean, msg: PubHealthStatusData): PubHealthStatusData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PubHealthStatusData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PubHealthStatusData;
  static deserializeBinaryFromReader(message: PubHealthStatusData, reader: jspb.BinaryReader): PubHealthStatusData;
}

export namespace PubHealthStatusData {
  export type AsObject = {
    pubHealthStatus?: PubHealthStatusData.PubHealthStatus,
    diagnosisDate?: number,
    shareable?: boolean,
  }

  export enum PubHealthStatus {
    NO_STATUS = 0,
    SUSPECTED = 1,
    POSITIVE = 2,
  }
}

