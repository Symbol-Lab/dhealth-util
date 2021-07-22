export interface ProviderRegis {
	provider_name?: string;
	provider_public_key: string;
	patient_id: string;
	URL: string;
	signature: string;
	wm?: string;
	info_text?: string;
}

export interface ProviderRegisQr {
	Patient_id: string;
	Wm: string;
	Provider_public_key: string;
	URL: string;
	Signature: string;
	Info_text: string;
}
