import { PubHealthStatusData } from './proto/pub_health_status_data_pb';

export class PubHealthStatusModel {
	private pubHealthStatus: PubHealthStatusData.PubHealthStatus =
		PubHealthStatusData.PubHealthStatus.NO_STATUS;
	private diagnosisDate: Date = new Date();
	private shareable: boolean = false;

	constructor(
		pubHealthStatus: PubHealthStatusData.PubHealthStatus,
		diagnosisDate?: number,
		shareable?: boolean
	) {
		this.pubHealthStatus = pubHealthStatus;
		if (diagnosisDate) {
			this.diagnosisDate = new Date(diagnosisDate);
		} else if (pubHealthStatus === PubHealthStatusData.PubHealthStatus.POSITIVE) {
			this.diagnosisDate = new Date();
		}
		if (shareable != null) {
			this.shareable = shareable;
		}
	}

	public toPubHealthStatusProto(): PubHealthStatusData {
		var pubHealthStatusProto: PubHealthStatusData = new PubHealthStatusData();
		pubHealthStatusProto.setPubHealthStatus(this.pubHealthStatus);
		if (this.diagnosisDate) {
			pubHealthStatusProto.setDiagnosisDate(this.diagnosisDate.getTime());
		}
		pubHealthStatusProto.setShareable(this.shareable);
		return pubHealthStatusProto;
	}

	public static fromPubHealthStatusProto(
		pubHealthStatusProto: PubHealthStatusData
	): PubHealthStatusModel | undefined {
		const pubHealthStatus = pubHealthStatusProto.getPubHealthStatus();
		const diagnosisDate = pubHealthStatusProto.getDiagnosisDate();
		const shareable = pubHealthStatusProto.getShareable();
		if (pubHealthStatus != null) {
			return new PubHealthStatusModel(pubHealthStatus, diagnosisDate, shareable);
		}
	}

	public getPubHealthStatus(): PubHealthStatusData.PubHealthStatus {
		return this.pubHealthStatus;
	}

	public getDiagnosisDate(): Date {
		return new Date(this.diagnosisDate);
	}

	public isShareable(): boolean {
		return this.shareable;
	}

	public setPubHealthStatus(pubHealthStatus: PubHealthStatusData.PubHealthStatus) {
		this.pubHealthStatus = pubHealthStatus;
		if (pubHealthStatus === PubHealthStatusData.PubHealthStatus.POSITIVE) {
			this.diagnosisDate = new Date();
		}
	}

	public setDiagnosisDate(diagnosisDate: Date) {
		this.diagnosisDate = diagnosisDate;
	}

	public setShareable(shareable: boolean) {
		this.shareable = shareable;
	}
}
