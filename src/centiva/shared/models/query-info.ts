import { Query, QueryResponse } from './proto/query_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

export class QueryInfo {
	constructor(
		public operation?: Query.Operation,
		public id?: string,
		public queryId?: number,
		public incentiveTokenAmountMicros?: number,
		public estimatedTime?: number,
		public queryName?: string,
		public purpose?: string,
		public seekerName?: string,
		public surveyUrl?: string,
		public timestamp?: number,
		public expirationDate?: number,
		public status?: number,
		public type?: number,
		public tokensRequiredMicros?: number, // user for redeemption
		public maxRedeemCount?: number,
		public redemptionPublicKey?: string,
		public redeemCount?: number,
		public fieldNames?: Array<string>,
		public redeemPopupMessage?: string,
		public redemptionUnitLabel?: string,
		public rawQueryData?: Query,
		public mustCompleteQueryId?: number,
		public reactivateAfterMinutes?: number,
		public diagnosisCode?: Array<string>,
		public queryResponseTimestamp?: number
	) {}
}

export class QueryResponseModel {
	queryId: number | undefined;
	timestamp: number | undefined;
	status: boolean | undefined;
	message: string | undefined;

	constructor() {}

	toQueryResponseProto(query: QueryResponseData): QueryResponse {
		const queryResponse: QueryResponse = new QueryResponse();
		const timestamp: Timestamp = new Timestamp();
		timestamp.fromDate(new Date(query.timestamp));
		console.log(timestamp);

		queryResponse.setQueryId(query.queryId);
		queryResponse.setTimestamp(timestamp);
		queryResponse.setStatus(query.status);
		queryResponse.setMessage(query.message);

		console.log('queryResponse', queryResponse);

		return queryResponse;
	}

	toQueryResponseFromProto(queryResponseData: QueryResponse) {
		const queryResponseTimestamp = queryResponseData.getTimestamp();
		if (queryResponseData && queryResponseTimestamp) {
			return {
				queryId: queryResponseData.getQueryId(),
				timestamp: queryResponseTimestamp.getSeconds() * 1000,
				status: queryResponseData.getStatus(),
				message: queryResponseData.getMessage()
			};
		}
	}
}

export interface QueryResponseData {
	queryId: number;
	timestamp: number;
	status: boolean;
	message: string;
}
