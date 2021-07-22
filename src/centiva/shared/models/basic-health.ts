import { Query } from './proto/query_pb';
import { BasicHealth } from './proto/basic-health_pb';

export class BasicHealthModel {
	public id: number = 0;
	public gender: Query.Gender | undefined = Query.Gender.GENDER_NIL;
	public dateOfBirth: number | undefined = 0;
	public height: number | undefined = 0;
	public weight: number | undefined = 0;
	public geographicRegion: string | undefined = '';
	public smoking: Query.SmokerStatus | undefined = Query.SmokerStatus.SMOKER_STATUS_NIL;
	public physicalActivity: Query.PhysicalActivityLevel | undefined = Query.PhysicalActivityLevel.PHYSICAL_ACTIVITY_NIL;
	constructor() {}

	public toBasicHealthProto(): BasicHealth {
		const basicHealthProto: BasicHealth = new BasicHealth();
		if (this.gender) {
			basicHealthProto.setGender(this.gender);
		}
		if (this.dateOfBirth) {
			basicHealthProto.setDateOfBirthMillis(this.dateOfBirth);
		}
		if (this.height) {
			basicHealthProto.setHeightCm(this.height);
		}
		if (this.weight) {
			basicHealthProto.setWeightKg(this.weight);
		}
		if (this.geographicRegion) {
			basicHealthProto.setGeographicRegion(this.geographicRegion);
		}
		if (this.smoking) {
			basicHealthProto.setSmokerStatus(this.smoking);
		}
		if (this.physicalActivity) {
			basicHealthProto.setPhysicalActivityLevel(this.physicalActivity);
		}
		return basicHealthProto;
	}

	public fromBasicHealthProto(basicHealthProto: BasicHealth) {
		if (basicHealthProto) {
			if (basicHealthProto.hasGender() && basicHealthProto.getGender()) {
				this.gender = basicHealthProto.getGender();
			}
			if (basicHealthProto.hasDateOfBirthMillis()) {
				this.dateOfBirth = basicHealthProto.getDateOfBirthMillis();
			}
			if (basicHealthProto.hasHeightCm()) {
				this.height = basicHealthProto.getHeightCm();
			}
			if (basicHealthProto.hasWeightKg()) {
				this.weight = basicHealthProto.getWeightKg();
			}
			if (
				basicHealthProto.hasGeographicRegion() &&
				basicHealthProto.getGeographicRegion()
			) {
				this.geographicRegion = basicHealthProto.getGeographicRegion();
			}
			if (basicHealthProto.hasSmokerStatus() && basicHealthProto.getSmokerStatus()) {
				this.smoking = basicHealthProto.getSmokerStatus();
			}
			if (
				basicHealthProto.hasPhysicalActivityLevel() &&
				basicHealthProto.getPhysicalActivityLevel()
			) {
				this.physicalActivity = basicHealthProto.getPhysicalActivityLevel();
			}
		}
	}
}
