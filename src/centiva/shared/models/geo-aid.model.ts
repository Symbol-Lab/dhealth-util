import {
	GeoCheckinsRequest,
	GeoGetCheckinsRequest,
	GeoGetCheckinsResponse
} from './proto/pub_health_geo_aid_pb';

export interface GeoAid {
	poiId?: string;
	coords: GeolocationCoordinates;
	startTime: number;
	endTime?: number;
	name?: string;
	description?: string;
}

export interface GeolocationCoordinates {
	latitude: number;
	longitude: number;
}

export interface GeoAidCheckIn {
	type?: number;
	poiId?: string;
	point: string;
	area?: string;
	startTime: number;
	endTime: number;
	alerted?: boolean;
	coords?: GeolocationCoordinates;
	index?: number;
	description?: string;
	name?: string;
	alertedTime?: number;
	status?: string;
	isVerified?: boolean;
}

export interface ContaminatedPoint {
	type: number;
	poiid: string;
	point: string;
	area?: string;
	starttime: number;
	endtime: number;
	coords?: GeolocationCoordinates;
	description?: string;
	name?: string;
	isVerified?: boolean;
}

export interface CheckInsHistory {
	pubKey: string;
	authToken: string;
	signature: string;
	verificationCode: string;
	check_ins: GeoAidCheckIn[];
}

export interface OrganisedPoints {
	[prop: string]: GeoAidCheckIn[];
}

export interface CheckInQR {
	poiId: string;
	latitude: number;
	longitude: number;
	name: string;
	description: string;
}

export const MGRS_ACCURACY = {
	TEN_METERS: 5,
	ONE_HUNDRED_METERS: 4
};

export class PubHealthGeoAidModel {
	pubKey: string = '';
	authToken: string = '';
	signature: string = '';
	verificationCode: string = '';
	check_ins: GeoCheckinsRequest.CheckIn[] = [];
	constructor() {}

	toPubHealthGeoAidProto(geoAid: any): GeoCheckinsRequest {
		console.log('toPubHealthGeoAidProto', JSON.stringify(geoAid));
		const pubHealthGeoAidRequest: GeoCheckinsRequest = new GeoCheckinsRequest();

		pubHealthGeoAidRequest.setPubKey(geoAid.pubKey);
		pubHealthGeoAidRequest.setAuthToken(geoAid.authToken);
		pubHealthGeoAidRequest.setSignature(geoAid.signature);
		pubHealthGeoAidRequest.setVerificationCode(geoAid.verificationCode);

		geoAid.check_ins.forEach((checkIn: any) => {
			pubHealthGeoAidRequest.addCheckIns(this.toPubHealthCheckIn(checkIn));
		});

		console.log('pubHealthGeoAidRequest', JSON.stringify(pubHealthGeoAidRequest));
		return pubHealthGeoAidRequest;
	}

	toPubHealthCheckIn(checkIn: any): GeoCheckinsRequest.CheckIn {
		const pubHealthCheckIn: GeoCheckinsRequest.CheckIn = new GeoCheckinsRequest.CheckIn();
		pubHealthCheckIn.setArea(checkIn.area);
		pubHealthCheckIn.setType(checkIn.type);
		pubHealthCheckIn.setPoiid(checkIn.poiId);
		pubHealthCheckIn.setPoint(checkIn.point);
		pubHealthCheckIn.setStarttime(checkIn.startTime);
		pubHealthCheckIn.setEndtime(checkIn.endTime);
		pubHealthCheckIn.setIsVerified(checkIn.isVerified);
		return pubHealthCheckIn;
	}

	toPubHealthGeoAidGetCheckInsProto(geoAid: any): GeoGetCheckinsRequest {
		const geoGetCheckInsRequest = new GeoGetCheckinsRequest();
		geoGetCheckInsRequest.setPubKey(geoAid.pubKey);
		geoGetCheckInsRequest.setAuthToken(geoAid.authToken);
		geoGetCheckInsRequest.setSignature(geoAid.signature);
		geoGetCheckInsRequest.setArea(geoAid.area);

		console.log(geoGetCheckInsRequest);

		return geoGetCheckInsRequest;
	}

	toPubHealthGetCheckInResponse(checkinRsponse: any): GeoGetCheckinsResponse {
		const geoGetCheckinsResponse = new GeoGetCheckinsResponse();
		geoGetCheckinsResponse.setOk(checkinRsponse.ok);
		checkinRsponse.data.forEach((checkIn: any) => {
			geoGetCheckinsResponse.addData(this.toPubHealthCheckIn(checkIn));
		});
		return geoGetCheckinsResponse;
	}
}
