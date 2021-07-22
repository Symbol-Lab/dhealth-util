import { PubHealthTestReportRequest } from './proto/pub_health_test_report_pb';
import { PubHealthTestReportFormData } from './proto/pub_health_test_report_form_data_pb';

export class PubHealthTestReportModel {
	public pubKey: string = '';
	public authToken: string = '';
	public signature: string = '';
	public countryCode: string = '';
	public verificationCode: string = '';
	public gender: PubHealthTestReportRequest.Gender = PubHealthTestReportRequest.Gender.GENDER_UNSPECIFIED;
	public ageBracket: number = 0;
	public bracketSizeYear: number = 0;
	public place: string = '';
	public postCode: string = '';
	public testDate: number = 0;
	public resultDate: number = 0;
	public outcome: boolean = false;

	public shareable: boolean = false;
	constructor() {}

	public toPubHealthTestReportProto(): PubHealthTestReportRequest {
		var pubHealthTestReportRequest: PubHealthTestReportRequest = new PubHealthTestReportRequest();
		if (this.pubKey) {
			pubHealthTestReportRequest.setPubKey(this.pubKey);
		}
		if (this.authToken) {
			pubHealthTestReportRequest.setAuthToken(this.authToken);
		}
		if (this.signature) {
			pubHealthTestReportRequest.setSignature(this.signature);
		}
		if (this.countryCode) {
			pubHealthTestReportRequest.setCountryCode(this.countryCode);
		}
		if (this.place) {
			pubHealthTestReportRequest.setPlace(this.place);
		}
		if (this.postCode) {
			pubHealthTestReportRequest.setPostCode(this.postCode);
		}
		if (this.verificationCode) {
			pubHealthTestReportRequest.setVerificationCode(this.verificationCode);
		}
		if (this.testDate) {
			pubHealthTestReportRequest.setTestDate(this.testDate);
		}
		if (this.resultDate) {
			pubHealthTestReportRequest.setResultDate(this.resultDate);
		}

		if (this.outcome != undefined) {
			pubHealthTestReportRequest.setOutcome(this.outcome);
		}

		if (this.gender) {
			pubHealthTestReportRequest.setGender(this.gender);
		}

		if (this.ageBracket) {
			pubHealthTestReportRequest.setAgeBracket(this.ageBracket);
		}

		if (this.bracketSizeYear) {
			pubHealthTestReportRequest.setBracketSizeYears(this.bracketSizeYear);
		}

		console.log('pubHealthTestReportProto', pubHealthTestReportRequest.toObject());

		return pubHealthTestReportRequest;
	}

	toPubHealthTestReportFormData(): PubHealthTestReportFormData {
		var pubHealthTestReportRequest = this.toPubHealthTestReportProto();
		var pubHealthTestReportFormData: PubHealthTestReportFormData = new PubHealthTestReportFormData();

		if (pubHealthTestReportRequest) {
			pubHealthTestReportFormData.setPubHealthTestReportRequest(
				pubHealthTestReportRequest
			);
		}

		if (this.shareable) {
			pubHealthTestReportFormData.setShareable(this.shareable);
		}
		return pubHealthTestReportFormData;
	}

	public fromPubHealthTestReportFormData(
		pubHealthTestReportFormData: PubHealthTestReportFormData
	) {
		const req = pubHealthTestReportFormData.getPubHealthTestReportRequest();
		if (req && pubHealthTestReportFormData) {
			this.pubKey = req.getPubKey();
			this.authToken = req.getAuthToken();
			this.signature = req.getSignature();
			this.countryCode = req.getCountryCode();
			this.place = req.getPlace();
			this.postCode = req.getPostCode();
			this.verificationCode = req.getVerificationCode();
			this.testDate = req.getTestDate();
			this.resultDate = req.getResultDate();
			this.outcome = req.getOutcome();
			this.gender = req.getGender();
			this.ageBracket = req.getAgeBracket();
			this.bracketSizeYear = req.getBracketSizeYears();
			this.shareable = pubHealthTestReportFormData.getShareable();
		}
	}

	public setPubKey(pubKey: string) {
		this.pubKey = pubKey;
	}

	public setAuthToken(authToken: string) {
		this.authToken = authToken;
	}

	public setSignature(signature: string) {
		this.signature = signature;
	}

	public setCountryCode(countryCode: string) {
		this.countryCode = countryCode;
	}

	public setPlace(place: string) {
		this.place = place;
	}

	public setPostCode(postCode: string) {
		this.postCode = postCode;
	}
	public setVerificationCode(verificationCode: string) {
		this.verificationCode = verificationCode;
	}
	public setTestDate(testDate: number) {
		this.testDate = testDate;
	}

	public setResultDate(resultDate: number) {
		this.resultDate = resultDate;
	}

	public setOutcome(outcome: boolean) {
		this.outcome = outcome;
	}

	public setGender(gender: PubHealthTestReportRequest.Gender) {
		this.gender = gender;
	}

	public setAgeBracket(ageBracket: number) {
		this.ageBracket = ageBracket;
	}

	public setBracketSizeYear(bracketSizeYear: number) {
		this.bracketSizeYear = bracketSizeYear;
	}

	public setShareable(shareable: boolean) {
		this.shareable = shareable;
	}

	public getShareable() {
		return this.shareable;
	}

	public getCountryCode() {
		return this.countryCode;
	}
	public getPlaceName() {
		return this.place;
	}
	public getPostCode() {
		return this.postCode;
	}
	public getAgeBracket() {
		return this.ageBracket;
	}
	public getGender() {
		return this.gender;
	}
}
