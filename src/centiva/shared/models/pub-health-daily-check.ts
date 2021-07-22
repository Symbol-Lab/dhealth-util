import { PubHealthDailyReportRequest } from './proto/pub_health_daily_report_pb';
import { PubHealthDailyReportFormData } from './proto/pub_health_daily_check_form_data_pb';
import { PubHealthStatusData } from './proto/pub_health_status_data_pb';

export interface PubHealthSymptomAssessmentResult {
	responseCode: number;
	pubHealthStatus: PubHealthStatusData.PubHealthStatus;
}

export class PubHealthDailyCheckModel {
	public pubKey: string | undefined;
	public authToken: string | undefined;
	public signature: string | undefined;
	public languageCode: string | undefined;

	public gender: PubHealthDailyReportRequest.Gender | undefined;
	public ageBracket: number | undefined;
	public bracketSizeYear: number | undefined;
	public testPerformed: boolean | undefined;
	public testOutcomeKnown: boolean | undefined;
	public testOutcome: any;

	public fever: boolean | undefined;
	public coughSoreThroatOrShortnessOfBreath: boolean | undefined;
	public conjunctivitis: boolean | undefined;
	public headache: boolean | undefined;
	public headCold: boolean | undefined;
	public muscleAche: boolean | undefined;
	public diarrhea: boolean | undefined;
	public lossOfSmellOrTaste: boolean | undefined;

	public otherSymptom: string | undefined;

	public onMedsHypertension: boolean | undefined;
	public onMedsDiabetes: boolean | undefined;
	public chronicRespiratoryIssues: boolean | undefined;
	public onMedsImmunosuppression: boolean | undefined;
	public chemoOrRadioTherapy: boolean | undefined;
	public otherSpecifiedHealthCondition: boolean | undefined;

	public proximity: boolean | undefined;

	public countryCode: string | undefined;
	public placeName: string | undefined;
	public postCode: string | undefined;

	//
	public shareable: boolean | undefined;

	toPubHealthDailyReportFormData(): PubHealthDailyReportFormData {
		var pubHealthDailyReportRequest = this.toPubHealthDailyReportRequest();
		var pubHealthDailyReportFormData: PubHealthDailyReportFormData = new PubHealthDailyReportFormData();

		if (pubHealthDailyReportRequest) {
			pubHealthDailyReportFormData.setPubHealthDailyReportRequest(
				pubHealthDailyReportRequest
			);
		}

		if (this.shareable) {
			pubHealthDailyReportFormData.setShareable(this.shareable);
		}
		return pubHealthDailyReportFormData;
	}

	public toPubHealthDailyReportRequest(): PubHealthDailyReportRequest {
		var pubHealthDailyReportRequest: PubHealthDailyReportRequest = new PubHealthDailyReportRequest();
		if (this.pubKey) {
			pubHealthDailyReportRequest.setPubKey(this.pubKey);
		}
		if (this.authToken) {
			pubHealthDailyReportRequest.setAuthToken(this.authToken);
		}
		if (this.signature) {
			pubHealthDailyReportRequest.setSignature(this.signature);
		}

		if (this.languageCode) {
			pubHealthDailyReportRequest.setLanguageCode(this.languageCode);
		}

		if (this.gender) {
			pubHealthDailyReportRequest.setGender(this.gender);
		}
		if (this.ageBracket) {
			pubHealthDailyReportRequest.setAgeBracket(this.ageBracket);
		}
		if (this.bracketSizeYear) {
			pubHealthDailyReportRequest.setBracketSizeYears(this.bracketSizeYear);
		}

		if (this.testPerformed != undefined) {
			pubHealthDailyReportRequest.setTestPerformed(this.testPerformed);
		}
		if (this.testOutcomeKnown != undefined) {
			pubHealthDailyReportRequest.setTestOutcomeKnown(this.testOutcomeKnown);
		}
		if (this.testOutcome != undefined) {
			pubHealthDailyReportRequest.setTestOutcome(this.testOutcome);
		}

		//symtomps
		if (this.fever != undefined) {
			pubHealthDailyReportRequest.setFever(this.fever);
		}
		if (this.coughSoreThroatOrShortnessOfBreath != undefined) {
			pubHealthDailyReportRequest.setCoughSoreThroatOrShortnessOfBreath(
				this.coughSoreThroatOrShortnessOfBreath
			);
		}
		if (this.conjunctivitis != undefined) {
			pubHealthDailyReportRequest.setConjunctivitis(this.conjunctivitis);
		}
		if (this.headache != undefined) {
			pubHealthDailyReportRequest.setHeadache(this.headache);
		}
		if (this.headCold != undefined) {
			pubHealthDailyReportRequest.setHeadCold(this.headCold);
		}
		if (this.muscleAche != undefined) {
			pubHealthDailyReportRequest.setMuscleAche(this.muscleAche);
		}
		if (this.diarrhea != undefined) {
			pubHealthDailyReportRequest.setDiarrhea(this.diarrhea);
		}
		if (this.lossOfSmellOrTaste != undefined) {
			pubHealthDailyReportRequest.setLossOfSmellOrTaste(this.lossOfSmellOrTaste);
		}
		if (this.otherSymptom) {
			pubHealthDailyReportRequest.setOtherSymptom(this.otherSymptom);
		}

		//related factor
		if (this.onMedsHypertension != undefined) {
			pubHealthDailyReportRequest.setOnMedsHypertension(this.onMedsHypertension);
		}
		if (this.onMedsDiabetes != undefined) {
			pubHealthDailyReportRequest.setOnMedsDiabetes(this.onMedsDiabetes);
		}
		if (this.chronicRespiratoryIssues != undefined) {
			pubHealthDailyReportRequest.setChronicRespiratoryIssues(
				this.chronicRespiratoryIssues
			);
		}
		if (this.onMedsImmunosuppression != undefined) {
			pubHealthDailyReportRequest.setOnMedsImmunosuppression(
				this.onMedsImmunosuppression
			);
		}
		if (this.chemoOrRadioTherapy != undefined) {
			pubHealthDailyReportRequest.setChemoOrRadioTherapy(this.chemoOrRadioTherapy);
		}
		if (this.otherSpecifiedHealthCondition != undefined) {
			pubHealthDailyReportRequest.setOtherSpecifiedHealthCondition(
				this.otherSpecifiedHealthCondition
			);
		}

		if (this.proximity != undefined) {
			pubHealthDailyReportRequest.setProximity(this.proximity);
		}
		if (this.countryCode) {
			pubHealthDailyReportRequest.setCountryCode(this.countryCode);
		}
		if (this.placeName) {
			pubHealthDailyReportRequest.setPlaceName(this.placeName);
		}
		if (this.postCode) {
			pubHealthDailyReportRequest.setPostCode(this.postCode);
		}

		console.log('pubHealthDailyReportRequest');
		console.log(pubHealthDailyReportRequest);
		return pubHealthDailyReportRequest;
	}

	public fromPubHealthDailyReportFormData(
		pubHealthDailyReportFormData: PubHealthDailyReportFormData
	) {
		const req = pubHealthDailyReportFormData.getPubHealthDailyReportRequest();
		if (req && pubHealthDailyReportFormData) {
			this.pubKey = req.getPubKey();
			this.authToken = req.getAuthToken();
			this.signature = req.getSignature();
			this.languageCode = req.getLanguageCode();
			this.gender = req.getGender();
			this.ageBracket = req.getAgeBracket();
			this.bracketSizeYear = req.getBracketSizeYears();
			this.testPerformed = req.getTestPerformed();
			this.testOutcomeKnown = req.getTestOutcomeKnown();
			this.testOutcomeKnown = req.getTestOutcome();

			this.fever = req.getFever();

			this.coughSoreThroatOrShortnessOfBreath = req.getCoughSoreThroatOrShortnessOfBreath();
			this.conjunctivitis = req.getConjunctivitis();
			this.headache = req.getHeadache();
			this.headCold = req.getHeadCold();
			this.muscleAche = req.getMuscleAche();
			this.diarrhea = req.getDiarrhea();
			this.lossOfSmellOrTaste = req.getLossOfSmellOrTaste();
			this.otherSymptom = req.getOtherSymptom();

			this.onMedsHypertension = req.getOnMedsHypertension();
			this.onMedsDiabetes = req.getOnMedsDiabetes();
			this.onMedsImmunosuppression = req.getOnMedsImmunosuppression();
			this.chemoOrRadioTherapy = req.getChemoOrRadioTherapy();
			this.otherSpecifiedHealthCondition = req.getOtherSpecifiedHealthCondition();

			this.proximity = req.getProximity();

			this.countryCode = req.getCountryCode();
			this.placeName = req.getPlaceName();
			this.postCode = req.getPostCode();
			this.shareable = pubHealthDailyReportFormData.getShareable();
		}
	}

	public setShareable(shareable: boolean) {
		this.shareable = shareable;
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

	public setLanguageCode(languageCode: string) {
		this.languageCode = languageCode;
	}

	public setGender(gender: PubHealthDailyReportRequest.Gender) {
		this.gender = gender;
	}
	public setAgeBracket(ageBracket: number) {
		this.ageBracket = ageBracket;
	}

	public setBracketSizeYear(bracketSizeYear: number) {
		this.bracketSizeYear = bracketSizeYear;
	}

	public setTestPerformed(testPerformed: boolean) {
		this.testPerformed = testPerformed;
	}
	public setTestOutcomeKnow(testOutcomeKnown: boolean) {
		this.testOutcomeKnown = testOutcomeKnown;
	}
	public setTestOutcome(testOutcome: boolean) {
		this.testOutcome = testOutcome;
	}

	//symtomps
	public setFever(fever: boolean) {
		this.fever = fever;
	}
	public setCoughSoreThroatOrShortnessOfBreath(
		coughSoreThroatOrShortnessOfBreath: boolean
	) {
		this.coughSoreThroatOrShortnessOfBreath = coughSoreThroatOrShortnessOfBreath;
	}
	public setConjunctivitis(conjunctivitis: boolean) {
		this.conjunctivitis = conjunctivitis;
	}
	public setHeadache(headache: boolean) {
		this.headache = headache;
	}
	public setHeadCold(headCold: boolean) {
		this.headCold = headCold;
	}
	public setMuscleAche(muscleAche: boolean) {
		this.muscleAche = muscleAche;
	}
	public setDiarrhea(diarrhea: boolean) {
		this.diarrhea = diarrhea;
	}
	public setLossOfSmellOrTaste(lossOfSmellOrTaste: boolean) {
		this.lossOfSmellOrTaste = lossOfSmellOrTaste;
	}
	public setOtherSymptom(otherSymptom: string) {
		this.otherSymptom = otherSymptom;
	}

	//related factors

	public setOnMedsHypertension(onMedsHypertension: boolean) {
		this.onMedsHypertension = onMedsHypertension;
	}
	public setOnMedsDiabetes(onMedsDiabetes: boolean) {
		this.onMedsDiabetes = onMedsDiabetes;
	}
	public setChronicRespiratoryIssues(chronicRespiratoryIssues: boolean) {
		this.chronicRespiratoryIssues = chronicRespiratoryIssues;
	}

	public setOnMedsImmunosuppression(onMedsImmunosuppression: boolean) {
		this.onMedsImmunosuppression = onMedsImmunosuppression;
	}
	public setChemoOrRadioTherapy(chemoOrRadioTherapy: boolean) {
		this.chemoOrRadioTherapy = chemoOrRadioTherapy;
	}
	public setOtherSpecifiedHealthCondition(otherSpecifiedHealthCondition: boolean) {
		this.otherSpecifiedHealthCondition = otherSpecifiedHealthCondition;
	}

	public setProximity(proximity: boolean) {
		this.proximity = proximity;
	}
	public setCountryCode(countryCode: string) {
		this.countryCode = countryCode;
	}
	public setPlaceName(placeName: string) {
		this.placeName = placeName;
	}
	public setPostCode(postCode: string) {
		this.postCode = postCode;
	}

	public getCountryCode() {
		return this.countryCode;
	}
	public getPlaceName() {
		return this.placeName;
	}
	public getPostCode() {
		return this.postCode;
	}

	public getShareable() {
		return this.shareable;
	}

	public getAgeBracket() {
		return this.ageBracket;
	}
	public getGender() {
		return this.gender;
	}
}
