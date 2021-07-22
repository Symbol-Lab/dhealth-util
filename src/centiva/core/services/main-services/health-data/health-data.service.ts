// import { Injectable } from '@angular/core';
import { BasicHealthModel } from '../../../../shared/models/basic-health';
// import { BasicHealthRepositoryService } from '@services/repository/basic-health-repository/basic-health-repository.service';
import { AppConstants } from '../app-constants/app-constants.service';
import { Mcrypto } from '../../../../shared/models/crypto/mcrypto';
import { BasicHealth } from '../../../../shared/models/proto/basic-health_pb';
// import { ConsoleLogService } from '@services/support-service/console-log/console.log.service';
// import { LoginService } from '@services/main-services/login/login.service';

// @Injectable({
// 	providedIn: 'root'
// })
export class HealthDataService {
	private basicHealthModel: BasicHealthModel | undefined;

	constructor(
		private basicHealthRepository: any,
		private appConstants: AppConstants,
		private logService: any,
		private loginService: any
	) {}

	public getEncryptionBasicHealth(): Promise<string> {
		return this.basicHealthRepository.getBasicHealthData(
			this.appConstants.BASIC_HEALTH_KEY_STORAGE_NAME
		);
	}
	public async getBasicHealthModel(): Promise<BasicHealthModel | undefined> {
		const basicHealthEncoded: string = await this.basicHealthRepository.getBasicHealthData(
			this.appConstants.BASIC_HEALTH_KEY_STORAGE_NAME
		);
		const basicHealthModel = new BasicHealthModel();
		if (basicHealthEncoded) {
			const basicHealthSerialize = new Mcrypto().aes256Decrypt(
				this.loginService.getKey(),
				basicHealthEncoded
			);
			const array: string[] = basicHealthSerialize.split(',');
			const data: Uint8Array = Uint8Array.from(array.map(x => +x));
			const basicHealthProto: BasicHealth = BasicHealth.deserializeBinary(data);
			if (basicHealthProto) {
				basicHealthModel.fromBasicHealthProto(basicHealthProto);
				return basicHealthModel;
			}
		}
		return undefined;
	}
	public saveBasicHealthModel(basicHealthModel: BasicHealthModel): any {
		this.logService.makeDefaultLog(
			'health-data.services.ts',
			'saveBasicHealthData',
			'basicHealthModel',
			basicHealthModel
		);
		if (basicHealthModel) {
			const basicHealthProto: BasicHealth = basicHealthModel.toBasicHealthProto();
			if (basicHealthProto) {
				const basicHealthEncode = new Mcrypto().aes256Encrypt(
					this.loginService.getKey(),
					basicHealthProto.serializeBinary().toString()
				);
				return this.basicHealthRepository.saveBasicHealthData(
					basicHealthEncode,
					this.appConstants.BASIC_HEALTH_KEY_STORAGE_NAME
				);
			}
		}
	}

	async reEncdryptBasicHealthData(newKey: string, currentKey: string) {
		const mcrypto = new Mcrypto();
		const basicHealthEncoded = await this.getEncryptionBasicHealth();
		if (basicHealthEncoded) {
			const basicHealthDataSerialize = mcrypto.aes256Decrypt(
				currentKey,
				basicHealthEncoded
			);
			const newBasicHealthEncoded = mcrypto.aes256Encrypt(
				newKey,
				basicHealthDataSerialize
			);
			this.basicHealthRepository.saveBasicHealthData(
				newBasicHealthEncoded,
				this.appConstants.BASIC_HEALTH_KEY_STORAGE_NAME
			);
		}
	}
}
