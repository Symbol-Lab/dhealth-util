// import { Injectable } from '@angular/core';
import { ProviderRegis, ProviderRegisQr } from '../../../../shared/models/provider-regis';
import { Base64 } from 'js-base64';
// import { HTTP } from '@ionic-native/http/ngx';
import { AppConstants } from '../app-constants/app-constants.service';
// import { AlertsService } from '@services/support-service/alerts/alerts.service';
import { retry } from 'ts-retry-promise';
import { DiagnosisPatient } from '../../../../shared/models/diagnosis.interface';
// import { BuildConfigService } from '@services/support-service/build-config/build-config.service';
import { ProviderRegistrationModel } from '../../../../shared/models/provider-registration-model';
import { Mcrypto } from '../../../../shared/models/crypto/mcrypto';
import { ProviderMetaData } from '../../../../shared/models/provider-meta-data.model';
// import { FirebaseEventsService } from '@services/cordova/firebase-events/firebase-events.service';
import { SeekerProperties } from '../../../../shared/models/seeker-properties.model';
// import { LoginService } from '@services/main-services/login/login.service';
// import { ProviderPatientRepo } from '@services/repository/provider-patient-repo/provider-patient-repo.service';
// import { WalletService } from '@services/blockchain/wallet2/wallet.service';
import { PublicAccount, Password, SimpleWallet, Account, Convert } from '../../../../..';
// import { environment } from '@environments/environment';

const buildUrl = require('build-url');

// @Injectable({
// 	providedIn: 'root'
// })
export class ProviderPatientService {
	providerRegistrationBranchData: any;
	private providerPublicAccount: any;
	private providerRegis: any; // to save in storage
	private providerRegisQr: ProviderRegisQr | undefined; // get from QR code

	private readonly diagnosisNLHPatientURL: string =
		'https://us-central1-nlh-qr-registration.cloudfunctions.net/diagnosis/get/';

	constructor(
		private providerPatientRepo: any,
		private httpNative: any,
		private alertProvider: any,
		private buildConfig: any,
		private firebaseEvents: any,
		private walletService: any,
		private loginService: any,
		private environment: any
	) {}

	isValidProvider(qrData: string) {
		console.log('provider-patient.ts__isValidProvider()_qrData', qrData);
		try {
			const providerRegisQr: any = JSON.parse(qrData);
			console.log(
				'provider-patient.ts__isValidProvider()__providerRegisQr',
				providerRegisQr
			);
			if (
				this.isValidPublicKey(providerRegisQr.Provider_public_key) &&
				providerRegisQr.Patient_id !== undefined &&
				providerRegisQr.URL !== undefined &&
				providerRegisQr.Signature !== undefined
			) {
				const data: any = {
					Patient_id: providerRegisQr['Patient_id'],
					Wm: providerRegisQr['Wm'],
					Provider_public_key: providerRegisQr['Provider_public_key'],
					Provider_name: providerRegisQr['Provider_name']
				};
				if (providerRegisQr['Patient_name']) {
					data['Patient_name'] = providerRegisQr['Patient_name'];
				}

				if (providerRegisQr['Info_text']) {
					data['Info_text'] = providerRegisQr['Info_text'];
				}

				data['URL'] = providerRegisQr['URL'];

				console.log(
					'provider-patient.ts__isValidProvider()__data need to verify: ',
					data
				);
				const signature = providerRegisQr['Signature'];

				return this.verifySignature(
					providerRegisQr['Provider_public_key'],
					JSON.stringify(data),
					signature
				);
			} else {
				console.log('provider-patient.ts:isValidProvider()__not valid pubkey');
				return false;
			}
		} catch (err) {
			console.log('provider-patient.ts__isValidProvider()__error', err);
			return false;
		}
	}

	validURL(text: string) {
		const pattern = new RegExp(
			'^(https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?'
		);
		return !!pattern.test(text);
	}

	setProviderRegis(providerRegis: ProviderRegis) {
		this.providerRegis = providerRegis;
	}

	setProviderName(providerName: string) {
		this.providerRegis.provider_name = providerName;
	}

	getProviderRegis(qrData: any) {
		const providerRegisQr: any = JSON.parse(qrData);
		const providerRegis: ProviderRegis = {
			provider_name: providerRegisQr['Provider_name'],
			patient_id: providerRegisQr['Patient_id'],
			provider_public_key: providerRegisQr['Provider_public_key'],
			URL: providerRegisQr['URL'],
			signature: providerRegisQr['Signature'],
			wm: providerRegisQr['Wm'],
			info_text: providerRegisQr['Info_text']
		};
		console.log('providerRegis store: ', providerRegis);
		this.cleanProviderRegisQr();
		return providerRegis;
	}

	verify(): Promise<ProviderMetaData> {
		return new Promise(async (resolve, reject) => {
			let urlVerify: string;
			const wallet = this.walletService.getCachedWallet();
			urlVerify = this.getUrlVerify(wallet);
			console.log('provider-patient.ts__verify()__Url verify', JSON.stringify(urlVerify));
			this.httpNative
				.get(urlVerify, {}, {})
				.then(async (data: any) => {
					console.log(
						'provider-patient.ts__verify()__data verify',
						JSON.stringify(data.data)
					);

					if (data.status === 200) {
						const response = JSON.parse(data.data);
						try {
							const providerMetaData = await this.handleRegistrationResponse(response);
							console.log('verify__providerMetaData__', providerMetaData);
							resolve(providerMetaData);
						} catch (error) {
							reject(error);
						}
					} else {
						reject(AppConstants.QR_SCAN_ERROR.SERVER_ERROR);
					}
				})
				.catch((err: any) => {
					console.log(err);
					reject(AppConstants.QR_SCAN_ERROR.CONNECTION_ERROR);
				});
		});
	}

	async registrationProviderBackground(seekerApprovedMap: Map<string, SeekerProperties>) {
		if (this.environment.walletMode === false) {
			return;
		}
		const qrJsonData = this.providerRegistrationBranchData;
		console.log(
			'provider-patient-ts:registrationProviderBackground():QR data: ',
			qrJsonData
		);
		if (qrJsonData) {
			const isValidProvider = await this.isValidProvider(qrJsonData);
			if (isValidProvider && this.checkProviderApproved(seekerApprovedMap, qrJsonData)) {
				const providerRegis: ProviderRegis = this.getProviderRegis(qrJsonData);
				this.setProviderRegis(providerRegis);
				await retry(
					() =>
						new Promise((resolve, reject) => {
							this.verify()
								.then(() => {
									console.log(
										'provider-patient.ts:registrationByReferralQrData():successful!'
									);
									this.firebaseEvents.logEvent('provider_registration_success', {});
									resolve(true);
								})
								.catch(error => reject(error));
						}),
					{ delay: 1000, retries: 2 }
				)
					.then((value: any) => {
						console.log(
							'provider-patient.ts--registrationByReferralQrData()__After retries ',
							value
						);
					})
					.catch((error: any) => {
						console.log(
							'provider-patient.ts--registrationByReferralQrData()__Finally retry ',
							error
						);
						this.firebaseEvents.logEvent('provider_registration_error', {
							error: error.toString()
						});
						alert(error.toString());
					});
			} else {
				console.log(
					"provider-patient.ts:registrationByReferralQrData()__Invalid data or Provider haven't approve!"
				);
			}
		} else {
			console.log(
				`provider-patient.ts;registrationByReferralQrData()__Have no QR data: ${qrJsonData}`
			);
		}
	}

	getUrlVerify(wallet: SimpleWallet) {
		const account: Account = wallet.open(new Password(this.loginService.getKey()));
		const data = {
			Public_key: account.publicKey,
			Provider_signature: this.providerRegis.signature,
			Id: this.providerRegis.patient_id,
			Addr: account.address.plain()
		};
		const dataHex = Convert.utf8ToHex(JSON.stringify(data));
		const signature = account.signData(dataHex);
		return buildUrl(this.providerRegis.URL, {
			queryParams: {
				Id: encodeURIComponent(this.providerRegis.patient_id),
				Addr: account.address.plain(),
				Public_key: account.publicKey,
				Provider_signature: this.providerRegis.signature,
				Signature: signature
			}
		});
	}

	private isValidPublicKey(publicKey: string) {
		try {
			this.providerPublicAccount = PublicAccount.createFromPublicKey(
				publicKey,
				this.environment.networkType.valueOf()
			); // throw error if wrong public key
			console.log('provider_patient.ts__isValidPublicKey()__PUBLIC KEY OK');
			return true;
		} catch {
			return false;
		}
	}

	getProviderAddress(publicKey: string) {
		return PublicAccount.createFromPublicKey(
			publicKey,
			this.environment.networkType.valueOf()
		).address.plain();
	}

	verifySignature(publicKey: string, data: string, signature: string) {
		const hexData = Convert.utf8ToHex(data);
		const publicAccount = PublicAccount.createFromPublicKey(
			publicKey,
			this.environment.networkType.valueOf()
		);
		const verifySignature = publicAccount.verifySignature(hexData, signature);
		console.log('provider-patient.ts__verifySignature()__', verifySignature);
		return verifySignature;
	}

	storeProvider() {
		let providers: ProviderRegis[] = [];
		return this.providerPatientRepo.getListProvider().then((data: any) => {
			if (data) {
				providers = JSON.parse(Base64.decode(data)) as ProviderRegis[];
			}
			providers.push(this.providerRegis);
			this.providerPatientRepo.saveListProvider(providers);
		});
	}

	checkExistProvider(): Promise<boolean> {
		let providers: ProviderRegis[] = [];
		return this.providerPatientRepo
			.getListProvider()
			.then((data: any) => {
				if (data) {
					console.log(Base64.decode(data));

					providers = JSON.parse(Base64.decode(data)) as ProviderRegis[];
					for (let i = 0; i < providers.length; i++) {
						if (
							providers[i].provider_public_key === this.providerRegis.provider_public_key
						) {
							return true;
						}
					}
				}
				return false;
			})
			.catch((err: any) => {
				console.log(err);
				return false;
			});
	}

	getAllProviderStored(): Promise<ProviderRegis[]> {
		let providers: ProviderRegis[] = [];
		return this.providerPatientRepo
			.getListProvider()
			.then((data: any) => {
				if (data) {
					providers = JSON.parse(Base64.decode(data)) as ProviderRegis[];
					return providers;
				}
				return [];
			})
			.catch((_: any) => {
				return providers;
			});
	}

	checkProviderApproved(seekerApprovedMap: Map<string, SeekerProperties>, text: string) {
		try {
			const providerRegisQr: ProviderRegisQr = JSON.parse(text);
			console.log(providerRegisQr);
			const publicAccount = PublicAccount.createFromPublicKey(
				providerRegisQr.Provider_public_key,
				this.environment.networkType.valueOf()
			);
			const providerAddress = publicAccount.address.plain();

			if (!seekerApprovedMap.has(providerAddress)) {
				this.alertProvider.showAddressNotFoundInListAuthorizedSeekers();
				return false;
			}
			return true;
		} catch (error) {
			console.log('provider-patient.ts__checkProviderApproved()__error', error);
			return false;
		}
	}

	setProviderRegistrationBranchParamData(providerRegistrationBranchData: any) {
		this.providerRegistrationBranchData = providerRegistrationBranchData;
	}

	getProviderRegisBranchParamData() {
		return this.providerRegistrationBranchData;
	}

	cleanProviderRegistrationBranchParamData() {
		this.providerRegistrationBranchData = undefined;
	}

	async getDianosisPatient() {
		if (!this.environment.walletMode) {
			return;
		}
		// need to encrypt
		let patientId = '';
		const providerProfileList = await this.getAllProviderStored();
		providerProfileList.forEach(providerProfile => {
			if (
				providerProfile.provider_public_key ===
				'2703f8ef3e8d1b70b5617127572aa65e3594bc19b75578703d0ad36dd12ba83c'
			) {
				/**
				 * hardcode for NLH case
				 * providerProfile.provider_public_key == "1a89065dc48ec0c62417a2a83911ca0898b8f51274bf13e70da01e2e52f5a915")
				 * {
				 *  // testnet key
				 * }
				 */
				patientId = providerProfile.patient_id;
			}
		});

		if (!patientId) {
			return;
		}

		await retry(
			() =>
				new Promise((resolve, reject) => {
					this.httpNative
						.get(this.diagnosisNLHPatientURL + `${encodeURI(patientId)}`, {}, {})
						.then((result: any) => {
							console.log('provider-patient.ts__syncDianosisPatient()__result', result);
							if (result.status === 200) {
								const diagnosisPatient = {
									meSHCodeList: JSON.parse(result.data).meshCodes,
									timestamp: new Date().getTime()
								};
								this.storeDianosisPatient(diagnosisPatient);
								console.log(
									'provider-patient.ts__syncDianosisPatient()__storeDianosisPatient',
									diagnosisPatient
								);
							}
							resolve(true);
						})
						.catch((error: any) => {
							console.log(
								'provider-patient.ts__syncDianosisPatient()_getDianosisPatientFromServer Error',
								error
							);

							reject(error);
						});
				}),
			{ delay: 1000, retries: 1 }
		)
			.then((value: any) => {
				console.log('provider-patient.ts--syncDianosisPatient()__After retries ', value);
			})
			.catch((error: any) => {
				console.log(
					'provider-patient.ts--syncDianosisPatient()__Finally retry ',
					JSON.stringify(error)
				);
			});
	}

	storeDianosisPatient(diagnosisPatient: DiagnosisPatient) {
		const encodeDiagnosisPatient = new Mcrypto().aes256Encrypt(
			this.loginService.getKey(),
			JSON.stringify(diagnosisPatient)
		);
		this.providerPatientRepo.saveDiagnosisPatient(encodeDiagnosisPatient).catch((error: any) => {
			console.log('provider-patient.ts--storeDianosisPatient() error ', error);
		});
	}

	getDianosisPatientStored(): Promise<DiagnosisPatient> {
		let diagnosisPatient: DiagnosisPatient;
		return this.providerPatientRepo
			.getEncodeDiagnosisPatient()
			.then((data: string) => {
				if (data) {
					diagnosisPatient = JSON.parse(
						new Mcrypto().aes256Decrypt(this.loginService.getKey(), data)
					) as DiagnosisPatient;
					return diagnosisPatient;
				}
				return {
					meSHCodeList: [],
					timestamp: undefined
				};
			})
			.catch((_: any) => {
				return diagnosisPatient;
			});
	}

	cleanProviderRegisQr() {
		this.providerRegisQr = undefined;
	}

	async getDataFromBranchLink(branchLink?: any) {
		const result: any = await this.httpNative
			.get(
				'https://api2.branch.io/v1/url',
				{
					url: branchLink,
					branch_key: this.buildConfig.getBranchKey() + ''
				},
				{}
			)
			.catch((err: any) => {
				console.log('provider-patient.ts__getDataFromBranchLink__err', err);
				return undefined;
			});
		console.log('provider-patient.ts__getDataFromBranchLink()__result', result);
		try {
			if (result.status === 200 && result.data) {
				const response = JSON.parse(result.data);
				const providerRegisQr = ProviderRegistrationModel.deserializeRegistrationData(
					response.data.provider_registration_qr_data
				);
				console.log(
					'provider-patient.ts__isValidProvider()__providerRegisQrrrrrrrrrrrrr',
					providerRegisQr
				);
				return providerRegisQr;
			} else {
				return undefined;
			}
		} catch (error) {
			console.log('scan-qr.ts__getDataFromBranchLink()__error', error);
			return undefined;
		}
	}

	async handleRegistrationResponse(response: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			if (response.code === 0) {
				if (response.data.verify === true) {
					if (response.data.provider_metadata) {
						await this.storeProvider();
						resolve(response.data.provider_metadata);
					} else {
						reject(AppConstants.QR_SCAN_ERROR.GET_PROVIDER_META_SYNC_INTERVAL_DATA_FALSE);
					}
				} else {
					reject(AppConstants.QR_SCAN_ERROR.VERIFY_DATA_FALSE);
				}
			} else if (response.code === 2) {
				if (response.data.verify === true) {
					if (response.data.provider_metadata) {
						await this.storeProvider();
						resolve(response.data.provider_metadata);
					} else {
						reject(AppConstants.QR_SCAN_ERROR.GET_PROVIDER_META_SYNC_INTERVAL_DATA_FALSE);
					}
				} else {
					reject(AppConstants.QR_SCAN_ERROR.VERIFY_DATA_AGAIN_FALSE);
				}
			} else {
				reject(AppConstants.QR_SCAN_ERROR.SERVER_ERROR);
			}
		});
	}
}
