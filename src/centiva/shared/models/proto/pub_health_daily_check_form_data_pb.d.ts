// package: 
// file: pub_health_daily_check_form_data.proto

import * as jspb from "google-protobuf";
import * as pub_health_daily_report_pb from "./pub_health_daily_report_pb";

export class PubHealthDailyReportFormData extends jspb.Message {
  hasPubHealthDailyReportRequest(): boolean;
  clearPubHealthDailyReportRequest(): void;
  getPubHealthDailyReportRequest(): pub_health_daily_report_pb.PubHealthDailyReportRequest | undefined;
  setPubHealthDailyReportRequest(value?: pub_health_daily_report_pb.PubHealthDailyReportRequest): void;

  getShareable(): boolean;
  setShareable(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PubHealthDailyReportFormData.AsObject;
  static toObject(includeInstance: boolean, msg: PubHealthDailyReportFormData): PubHealthDailyReportFormData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PubHealthDailyReportFormData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PubHealthDailyReportFormData;
  static deserializeBinaryFromReader(message: PubHealthDailyReportFormData, reader: jspb.BinaryReader): PubHealthDailyReportFormData;
}

export namespace PubHealthDailyReportFormData {
  export type AsObject = {
    pubHealthDailyReportRequest?: pub_health_daily_report_pb.PubHealthDailyReportRequest.AsObject,
    shareable: boolean,
  }
}

