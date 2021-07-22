// package: 
// file: pub_health_test_report_form_data.proto

import * as jspb from "google-protobuf";
import * as pub_health_test_report_pb from "./pub_health_test_report_pb";

export class PubHealthTestReportFormData extends jspb.Message {
  hasPubHealthTestReportRequest(): boolean;
  clearPubHealthTestReportRequest(): void;
  getPubHealthTestReportRequest(): pub_health_test_report_pb.PubHealthTestReportRequest | undefined;
  setPubHealthTestReportRequest(value?: pub_health_test_report_pb.PubHealthTestReportRequest): void;

  getShareable(): boolean;
  setShareable(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PubHealthTestReportFormData.AsObject;
  static toObject(includeInstance: boolean, msg: PubHealthTestReportFormData): PubHealthTestReportFormData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PubHealthTestReportFormData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PubHealthTestReportFormData;
  static deserializeBinaryFromReader(message: PubHealthTestReportFormData, reader: jspb.BinaryReader): PubHealthTestReportFormData;
}

export namespace PubHealthTestReportFormData {
  export type AsObject = {
    pubHealthTestReportRequest?: pub_health_test_report_pb.PubHealthTestReportRequest.AsObject,
    shareable: boolean,
  }
}

