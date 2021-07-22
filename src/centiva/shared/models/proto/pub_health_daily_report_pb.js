/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.health.centiva.api.PubHealthDailyReportRequest', null, global);
goog.exportSymbol('proto.health.centiva.api.PubHealthDailyReportRequest.Gender', null, global);
goog.exportSymbol('proto.health.centiva.api.PubHealthDailyReportResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.health.centiva.api.PubHealthDailyReportRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.health.centiva.api.PubHealthDailyReportRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.health.centiva.api.PubHealthDailyReportRequest.displayName = 'proto.health.centiva.api.PubHealthDailyReportRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.health.centiva.api.PubHealthDailyReportResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.health.centiva.api.PubHealthDailyReportResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.health.centiva.api.PubHealthDailyReportResponse.displayName = 'proto.health.centiva.api.PubHealthDailyReportResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.health.centiva.api.PubHealthDailyReportRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.health.centiva.api.PubHealthDailyReportRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.health.centiva.api.PubHealthDailyReportRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pubKey: jspb.Message.getFieldWithDefault(msg, 1, ""),
    authToken: jspb.Message.getFieldWithDefault(msg, 2, ""),
    signature: jspb.Message.getFieldWithDefault(msg, 3, ""),
    languageCode: jspb.Message.getFieldWithDefault(msg, 4, ""),
    gender: jspb.Message.getFieldWithDefault(msg, 5, 0),
    ageBracket: jspb.Message.getFieldWithDefault(msg, 6, 0),
    bracketSizeYears: jspb.Message.getFieldWithDefault(msg, 7, 0),
    testPerformed: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    testOutcomeKnown: jspb.Message.getBooleanFieldWithDefault(msg, 9, false),
    testOutcome: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    fever: jspb.Message.getBooleanFieldWithDefault(msg, 11, false),
    coughSoreThroatOrShortnessOfBreath: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
    muscleAche: jspb.Message.getBooleanFieldWithDefault(msg, 13, false),
    lossOfSmellOrTaste: jspb.Message.getBooleanFieldWithDefault(msg, 14, false),
    headache: jspb.Message.getBooleanFieldWithDefault(msg, 15, false),
    diarrhea: jspb.Message.getBooleanFieldWithDefault(msg, 16, false),
    conjunctivitis: jspb.Message.getBooleanFieldWithDefault(msg, 17, false),
    headCold: jspb.Message.getBooleanFieldWithDefault(msg, 18, false),
    otherSymptom: jspb.Message.getFieldWithDefault(msg, 19, ""),
    onMedsHypertension: jspb.Message.getBooleanFieldWithDefault(msg, 20, false),
    onMedsDiabetes: jspb.Message.getBooleanFieldWithDefault(msg, 21, false),
    chronicRespiratoryIssues: jspb.Message.getBooleanFieldWithDefault(msg, 22, false),
    onMedsImmunosuppression: jspb.Message.getBooleanFieldWithDefault(msg, 23, false),
    chemoOrRadioTherapy: jspb.Message.getBooleanFieldWithDefault(msg, 24, false),
    otherSpecifiedHealthCondition: jspb.Message.getBooleanFieldWithDefault(msg, 25, false),
    proximity: jspb.Message.getBooleanFieldWithDefault(msg, 26, false),
    countryCode: jspb.Message.getFieldWithDefault(msg, 27, ""),
    placeName: jspb.Message.getFieldWithDefault(msg, 28, ""),
    postCode: jspb.Message.getFieldWithDefault(msg, 29, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.health.centiva.api.PubHealthDailyReportRequest}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.health.centiva.api.PubHealthDailyReportRequest;
  return proto.health.centiva.api.PubHealthDailyReportRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.health.centiva.api.PubHealthDailyReportRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.health.centiva.api.PubHealthDailyReportRequest}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPubKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAuthToken(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSignature(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setLanguageCode(value);
      break;
    case 5:
      var value = /** @type {!proto.health.centiva.api.PubHealthDailyReportRequest.Gender} */ (reader.readEnum());
      msg.setGender(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAgeBracket(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBracketSizeYears(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTestPerformed(value);
      break;
    case 9:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTestOutcomeKnown(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTestOutcome(value);
      break;
    case 11:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFever(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCoughSoreThroatOrShortnessOfBreath(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setMuscleAche(value);
      break;
    case 14:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setLossOfSmellOrTaste(value);
      break;
    case 15:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHeadache(value);
      break;
    case 16:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDiarrhea(value);
      break;
    case 17:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setConjunctivitis(value);
      break;
    case 18:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHeadCold(value);
      break;
    case 19:
      var value = /** @type {string} */ (reader.readString());
      msg.setOtherSymptom(value);
      break;
    case 20:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOnMedsHypertension(value);
      break;
    case 21:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOnMedsDiabetes(value);
      break;
    case 22:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setChronicRespiratoryIssues(value);
      break;
    case 23:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOnMedsImmunosuppression(value);
      break;
    case 24:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setChemoOrRadioTherapy(value);
      break;
    case 25:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOtherSpecifiedHealthCondition(value);
      break;
    case 26:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setProximity(value);
      break;
    case 27:
      var value = /** @type {string} */ (reader.readString());
      msg.setCountryCode(value);
      break;
    case 28:
      var value = /** @type {string} */ (reader.readString());
      msg.setPlaceName(value);
      break;
    case 29:
      var value = /** @type {string} */ (reader.readString());
      msg.setPostCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.health.centiva.api.PubHealthDailyReportRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.health.centiva.api.PubHealthDailyReportRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.health.centiva.api.PubHealthDailyReportRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPubKey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAuthToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSignature();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getLanguageCode();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getGender();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getAgeBracket();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getBracketSizeYears();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getTestPerformed();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getTestOutcomeKnown();
  if (f) {
    writer.writeBool(
      9,
      f
    );
  }
  f = message.getTestOutcome();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getFever();
  if (f) {
    writer.writeBool(
      11,
      f
    );
  }
  f = message.getCoughSoreThroatOrShortnessOfBreath();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
  f = message.getMuscleAche();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
  f = message.getLossOfSmellOrTaste();
  if (f) {
    writer.writeBool(
      14,
      f
    );
  }
  f = message.getHeadache();
  if (f) {
    writer.writeBool(
      15,
      f
    );
  }
  f = message.getDiarrhea();
  if (f) {
    writer.writeBool(
      16,
      f
    );
  }
  f = message.getConjunctivitis();
  if (f) {
    writer.writeBool(
      17,
      f
    );
  }
  f = message.getHeadCold();
  if (f) {
    writer.writeBool(
      18,
      f
    );
  }
  f = message.getOtherSymptom();
  if (f.length > 0) {
    writer.writeString(
      19,
      f
    );
  }
  f = message.getOnMedsHypertension();
  if (f) {
    writer.writeBool(
      20,
      f
    );
  }
  f = message.getOnMedsDiabetes();
  if (f) {
    writer.writeBool(
      21,
      f
    );
  }
  f = message.getChronicRespiratoryIssues();
  if (f) {
    writer.writeBool(
      22,
      f
    );
  }
  f = message.getOnMedsImmunosuppression();
  if (f) {
    writer.writeBool(
      23,
      f
    );
  }
  f = message.getChemoOrRadioTherapy();
  if (f) {
    writer.writeBool(
      24,
      f
    );
  }
  f = message.getOtherSpecifiedHealthCondition();
  if (f) {
    writer.writeBool(
      25,
      f
    );
  }
  f = message.getProximity();
  if (f) {
    writer.writeBool(
      26,
      f
    );
  }
  f = message.getCountryCode();
  if (f.length > 0) {
    writer.writeString(
      27,
      f
    );
  }
  f = message.getPlaceName();
  if (f.length > 0) {
    writer.writeString(
      28,
      f
    );
  }
  f = message.getPostCode();
  if (f.length > 0) {
    writer.writeString(
      29,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.Gender = {
  GENDER_UNSPECIFIED: 0,
  GENDER_MALE: 1,
  GENDER_FEMALE: 2,
  GENDER_OTHER: 3
};

/**
 * optional string pub_key = 1;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getPubKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setPubKey = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string auth_token = 2;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getAuthToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setAuthToken = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string signature = 3;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getSignature = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setSignature = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string language_code = 4;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getLanguageCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setLanguageCode = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional Gender gender = 5;
 * @return {!proto.health.centiva.api.PubHealthDailyReportRequest.Gender}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getGender = function() {
  return /** @type {!proto.health.centiva.api.PubHealthDailyReportRequest.Gender} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {!proto.health.centiva.api.PubHealthDailyReportRequest.Gender} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setGender = function(value) {
  jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional int32 age_bracket = 6;
 * @return {number}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getAgeBracket = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/** @param {number} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setAgeBracket = function(value) {
  jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 bracket_size_years = 7;
 * @return {number}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getBracketSizeYears = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/** @param {number} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setBracketSizeYears = function(value) {
  jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional bool test_performed = 8;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getTestPerformed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setTestPerformed = function(value) {
  jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional bool test_outcome_known = 9;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getTestOutcomeKnown = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 9, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setTestOutcomeKnown = function(value) {
  jspb.Message.setProto3BooleanField(this, 9, value);
};


/**
 * optional bool test_outcome = 10;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getTestOutcome = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setTestOutcome = function(value) {
  jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional bool fever = 11;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getFever = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 11, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setFever = function(value) {
  jspb.Message.setProto3BooleanField(this, 11, value);
};


/**
 * optional bool cough_sore_throat_or_shortness_of_breath = 12;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getCoughSoreThroatOrShortnessOfBreath = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setCoughSoreThroatOrShortnessOfBreath = function(value) {
  jspb.Message.setProto3BooleanField(this, 12, value);
};


/**
 * optional bool muscle_ache = 13;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getMuscleAche = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setMuscleAche = function(value) {
  jspb.Message.setProto3BooleanField(this, 13, value);
};


/**
 * optional bool loss_of_smell_or_taste = 14;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getLossOfSmellOrTaste = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 14, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setLossOfSmellOrTaste = function(value) {
  jspb.Message.setProto3BooleanField(this, 14, value);
};


/**
 * optional bool headache = 15;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getHeadache = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 15, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setHeadache = function(value) {
  jspb.Message.setProto3BooleanField(this, 15, value);
};


/**
 * optional bool diarrhea = 16;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getDiarrhea = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 16, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setDiarrhea = function(value) {
  jspb.Message.setProto3BooleanField(this, 16, value);
};


/**
 * optional bool conjunctivitis = 17;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getConjunctivitis = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 17, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setConjunctivitis = function(value) {
  jspb.Message.setProto3BooleanField(this, 17, value);
};


/**
 * optional bool head_cold = 18;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getHeadCold = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 18, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setHeadCold = function(value) {
  jspb.Message.setProto3BooleanField(this, 18, value);
};


/**
 * optional string other_symptom = 19;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getOtherSymptom = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 19, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setOtherSymptom = function(value) {
  jspb.Message.setProto3StringField(this, 19, value);
};


/**
 * optional bool on_meds_hypertension = 20;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getOnMedsHypertension = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 20, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setOnMedsHypertension = function(value) {
  jspb.Message.setProto3BooleanField(this, 20, value);
};


/**
 * optional bool on_meds_diabetes = 21;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getOnMedsDiabetes = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 21, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setOnMedsDiabetes = function(value) {
  jspb.Message.setProto3BooleanField(this, 21, value);
};


/**
 * optional bool chronic_respiratory_issues = 22;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getChronicRespiratoryIssues = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 22, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setChronicRespiratoryIssues = function(value) {
  jspb.Message.setProto3BooleanField(this, 22, value);
};


/**
 * optional bool on_meds_immunosuppression = 23;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getOnMedsImmunosuppression = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 23, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setOnMedsImmunosuppression = function(value) {
  jspb.Message.setProto3BooleanField(this, 23, value);
};


/**
 * optional bool chemo_or_radio_therapy = 24;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getChemoOrRadioTherapy = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 24, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setChemoOrRadioTherapy = function(value) {
  jspb.Message.setProto3BooleanField(this, 24, value);
};


/**
 * optional bool other_specified_health_condition = 25;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getOtherSpecifiedHealthCondition = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 25, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setOtherSpecifiedHealthCondition = function(value) {
  jspb.Message.setProto3BooleanField(this, 25, value);
};


/**
 * optional bool proximity = 26;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getProximity = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 26, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setProximity = function(value) {
  jspb.Message.setProto3BooleanField(this, 26, value);
};


/**
 * optional string country_code = 27;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getCountryCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 27, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setCountryCode = function(value) {
  jspb.Message.setProto3StringField(this, 27, value);
};


/**
 * optional string place_name = 28;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getPlaceName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 28, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setPlaceName = function(value) {
  jspb.Message.setProto3StringField(this, 28, value);
};


/**
 * optional string post_code = 29;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.getPostCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 29, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportRequest.prototype.setPostCode = function(value) {
  jspb.Message.setProto3StringField(this, 29, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.health.centiva.api.PubHealthDailyReportResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.health.centiva.api.PubHealthDailyReportResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.health.centiva.api.PubHealthDailyReportResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.health.centiva.api.PubHealthDailyReportResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    ok: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    error: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.health.centiva.api.PubHealthDailyReportResponse}
 */
proto.health.centiva.api.PubHealthDailyReportResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.health.centiva.api.PubHealthDailyReportResponse;
  return proto.health.centiva.api.PubHealthDailyReportResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.health.centiva.api.PubHealthDailyReportResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.health.centiva.api.PubHealthDailyReportResponse}
 */
proto.health.centiva.api.PubHealthDailyReportResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOk(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.health.centiva.api.PubHealthDailyReportResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.health.centiva.api.PubHealthDailyReportResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.health.centiva.api.PubHealthDailyReportResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.health.centiva.api.PubHealthDailyReportResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOk();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional bool ok = 1;
 * @return {boolean}
 */
proto.health.centiva.api.PubHealthDailyReportResponse.prototype.getOk = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/** @param {boolean} value */
proto.health.centiva.api.PubHealthDailyReportResponse.prototype.setOk = function(value) {
  jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string error = 2;
 * @return {string}
 */
proto.health.centiva.api.PubHealthDailyReportResponse.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.health.centiva.api.PubHealthDailyReportResponse.prototype.setError = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.health.centiva.api);
