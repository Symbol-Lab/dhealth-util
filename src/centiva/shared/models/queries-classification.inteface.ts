import { QueryInfo } from './query-info';

export interface ClassifiedQueries {
	queriesInfoRequestMap: Map<string, QueryInfo>;
	queriesRedeemptionMap: Map<string, QueryInfo>;
	firstQueriesReferral: QueryInfo;
}
