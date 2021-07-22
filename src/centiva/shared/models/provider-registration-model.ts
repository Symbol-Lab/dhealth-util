import { ProviderRegistrationData } from './proto/provider_registration_data_pb';
import { ProviderRegis } from './provider-regis';

export class ProviderRegistrationModel implements ProviderRegis {
	provider_name?: string;
	patient_id: string;
	provider_public_key: string;
	URL: string;
	wm?: string;
	info_text?: string;
	signature: string;

	constructor(
		patient_id: string,
		provider_public_key: string,
		URL: string,
		wm: string,
		signature: string
	) {
		(this.patient_id = patient_id), (this.provider_public_key = provider_public_key);
		this.URL = URL;
		this.wm = wm ? wm : undefined;
		this.signature = signature;
	}

	public static deserializeRegistrationData(serializationRegistrationQrData: string) {
		const array: string[] = serializationRegistrationQrData.split(',');
		const data: Uint8Array = Uint8Array.from(array.map(x => +x));
		const providerRegistrationData: ProviderRegistrationData = ProviderRegistrationData.deserializeBinary(
			data
		);
		const qrData: any = {
			Patient_id: providerRegistrationData.getPatientId(),
			Provider_public_key: providerRegistrationData.getProviderPublicKey(),
			URL: providerRegistrationData.getUrl(),
			Wm: providerRegistrationData.getWm() ? '1' : undefined,
			Signature: providerRegistrationData.getSignature()
		};
		if (providerRegistrationData.getInfoText()) {
			qrData['Info_text'] = providerRegistrationData.getInfoText();
		}
		return JSON.stringify(qrData);
	}

	public toJSONQrDta() {
		// JSON.stringify({ "Patient_id": "bJpGEhAkKGOkoPbVWN908A==", "Provider_public_key": "2703f8ef3e8d1b70b5617127572aa65e3594bc19b75578703d0ad36dd12ba83c", "Patient_name": "Đỗ Duy Mậu", "URL": "https://us-central1-nlh-qr-registration.cloudfunctions.net/register", "Wm": "1", "Signature": "d3129e7ef059980e1143d34787e5366ea012a23d232712e4a80815de9b4d9e1b26126635b8629abebf4734e17f2f41f5d11692b16e134f2fabc3a4ddba7b090f" });
		var jsonQrData = {
			Patient_id: this.patient_id,
			Provider_public_key: this.provider_public_key,
			URL: this.URL,
			Wm: this.wm,
			Signature: this.signature
		};
		return JSON.stringify(jsonQrData);
	}
	public serializeProviderRegis(): string {
		var providerRegistrationData: ProviderRegistrationData = new ProviderRegistrationData();
		providerRegistrationData.setPatientId(this.patient_id);
		providerRegistrationData.setProviderPublicKey(this.provider_public_key);
		providerRegistrationData.setUrl(this.URL);
		if (this.wm) providerRegistrationData.setWm(true);
		providerRegistrationData.setSignature(this.signature);
		return providerRegistrationData.serializeBinary().toString();
	}
}
