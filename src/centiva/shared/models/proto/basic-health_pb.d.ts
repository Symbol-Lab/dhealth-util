// package: tutorial
// file: basic-health.proto

import * as jspb from "google-protobuf";

export class BasicHealth extends jspb.Message {
  hasGender(): boolean;
  clearGender(): void;
  getGender(): BasicHealth.Gender | undefined;
  setGender(value: BasicHealth.Gender): void;

  hasDateOfBirthMillis(): boolean;
  clearDateOfBirthMillis(): void;
  getDateOfBirthMillis(): number | undefined;
  setDateOfBirthMillis(value: number): void;

  hasHeightCm(): boolean;
  clearHeightCm(): void;
  getHeightCm(): number | undefined;
  setHeightCm(value: number): void;

  hasWeightKg(): boolean;
  clearWeightKg(): void;
  getWeightKg(): number | undefined;
  setWeightKg(value: number): void;

  clearDeprecatedEthnicityList(): void;
  getDeprecatedEthnicityList(): Array<BasicHealth.Ethnicity>;
  setDeprecatedEthnicityList(value: Array<BasicHealth.Ethnicity>): void;
  addDeprecatedEthnicity(value: BasicHealth.Ethnicity, index?: number): BasicHealth.Ethnicity;

  hasGeographicRegion(): boolean;
  clearGeographicRegion(): void;
  getGeographicRegion(): string | undefined;
  setGeographicRegion(value: string): void;

  hasPhysicalActivityLevel(): boolean;
  clearPhysicalActivityLevel(): void;
  getPhysicalActivityLevel(): BasicHealth.PhysicalActivityLevel | undefined;
  setPhysicalActivityLevel(value: BasicHealth.PhysicalActivityLevel): void;

  hasSmokerStatus(): boolean;
  clearSmokerStatus(): void;
  getSmokerStatus(): BasicHealth.SmokerStatus | undefined;
  setSmokerStatus(value: BasicHealth.SmokerStatus): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BasicHealth.AsObject;
  static toObject(includeInstance: boolean, msg: BasicHealth): BasicHealth.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BasicHealth, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BasicHealth;
  static deserializeBinaryFromReader(message: BasicHealth, reader: jspb.BinaryReader): BasicHealth;
}

export namespace BasicHealth {
  export type AsObject = {
    gender?: BasicHealth.Gender,
    dateOfBirthMillis?: number,
    heightCm?: number,
    weightKg?: number,
    deprecatedEthnicityList: Array<BasicHealth.Ethnicity>,
    geographicRegion?: string,
    physicalActivityLevel?: BasicHealth.PhysicalActivityLevel,
    smokerStatus?: BasicHealth.SmokerStatus,
  }

  export enum Gender {
    GENDER_NIL = 0,
    GENDER_FEMALE = 1,
    GENDER_MALE = 2,
    GENDER_OTHER = 3,
  }

  export enum Ethnicity {
    ETHNICITY_NIL = 0,
    ETHNICITY_WHITE = 1,
    ETHNICITY_BLACK = 2,
    ETHNICITY_AMERICAN_INDIAN_ALASKA_NATIVE = 3,
    ETHNICITY_ASIAN_INDIAN = 4,
    ETHNICITY_CHINESE = 5,
    ETHNICITY_FILIPINO = 6,
    ETHNICITY_JAPANESE = 7,
    ETHNICITY_KOREAN = 8,
    ETHNICITY_VIETNAMESE = 9,
    ETHNICITY_OTHER_ASIAN = 10,
    ETHNICITY_NATIVE_HAWAIIAN = 11,
    ETHNICITY_GUAMANIAN_CHAMORRO = 12,
    ETHNICITY_SAMOAN = 13,
    ETHNICITY_OTHER_PACIFIC_ISLANDER = 14,
    ETHNICITY_UNSPECIFIED = 99,
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
}

