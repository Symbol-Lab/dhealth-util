// import { NetworkInfoService } from '@services/cordova/network-info/network-info.service';
// import { NemApiService } from '../../blockchain/nem-api/nem-api.service';
import {
	Address,
	BlockchainUtil,
	Message,
	Password,
	PublicAccount,
	Transaction,
	TransactionUtil,
	TransferTransaction
} from '../../../../..';
import { AppConstants } from '../app-constants/app-constants.service';
import { SeekerProperties } from '../../../../shared/models/seeker-properties.model';
import { ProviderRegis } from '../../../../shared/models/provider-regis';
import { DiagnosisPatient } from '../../../../shared/models/diagnosis.interface';
import { QueryInfo, QueryResponseData } from '../../../../shared/models/query-info';
import { BasicHealthModel } from '../../../../shared/models/basic-health';
import { Query } from '../../../../shared/models/proto/query_pb';
import { ClassifiedQueries } from '../../../../shared/models/queries-classification.inteface';
// import { environment } from '@environments/environment';
import { Instant, LocalDateTime, ZoneId } from 'js-joda';
import { ProviderPatientService } from '../provider-patient2/provider-patient.service';
import { TransactionHistoryService } from '../transaction-history2/transaction-history.service';
// import {
// 	QueriesParserCondition,
// 	QueriesParserService
// } from '../support-service/queries-parser/queries-parser.service';
import { HealthDataService } from '../health-data/health-data.service';

export interface QueriesParserCondition {
	selectedLanguageCode: string;
	basicHealthModel: BasicHealthModel;
	onlyShowQueriesInSelectedLanguage: boolean;
	allProviderStored: ProviderRegis[];
	queryResponseMap: Map<number, boolean>;
	queryResponseList: QueryResponseData[];
	diagnosisPatientStored: DiagnosisPatient;
}

export class QueriesService {
	constructor(
		private networkInfoService: any,
		private dhealthService: any,
		private buildConfig: any,
		private appConstants: any,
		private logSerivce: any,
		private translateService: any,
		private shareVariable: any,
		private queriesParser: any,
		private queryRepository: any,
		private transactionsRepository: any,
		private notificationService: any,
		private event: any,
		private walletService: any,
		private loginService: any,
		private flagMatchQueriesLanguageRepo: any,
		private injector: any,
		private environment: any
	) {}
	cacheSeerkerAppprovedMap: Map<string, SeekerProperties> = new Map();
	cachedProviderPublicKeyMap: Map<string, string> = new Map();
	public async getSeekerApprovedMap() {
		// TODO @developer: Son
		const seekerApprovedTxs: TransferTransaction[] = await this.getSeekerApprovedTxs(
			this.appConstants.NUMBER_LOAD_PAGE_SEEKER_APPROVED_TXS
		);
		const seekerMap: Map<string, SeekerProperties> = this.filterSeekersApprovedMap(
			seekerApprovedTxs
		);
		return seekerMap;
	}

	// Main function of the app
	public async syncQueries() {
		// TODO @developer: Son
		const classifiedQueries: ClassifiedQueries = await this.getQueries();
		this.logSerivce.makeDefaultLog(
			'queries.service.ts',
			'syncQueries',
			'classifiedQueries',
			classifiedQueries
		);
		let queryInfoRequestStorage: QueryInfo[];
		let queryRedemptionStorage: QueryInfo[];
		let newQueries: QueryInfo[];
		if (classifiedQueries.queriesInfoRequestMap) {
			queryInfoRequestStorage = await this.queryRepository.getAllQuery();
			newQueries = await this.updateQueriesLocalStorage(
				classifiedQueries.queriesInfoRequestMap,
				queryInfoRequestStorage
			);
			this.triggerNewQueriesNotification(newQueries);
		}
		if (classifiedQueries.queriesRedeemptionMap) {
			queryRedemptionStorage = await this.queryRepository.getAllQueriesRedeemption();
			newQueries = await this.updateQueriesLocalStorage(
				classifiedQueries.queriesRedeemptionMap,
				queryRedemptionStorage,
				Query.Type.QUERY_REDEMPTION_OFFER
			);
			this.triggerNewQueriesNotification(newQueries, Query.Type.QUERY_REDEMPTION_OFFER);
		}

		if (classifiedQueries.firstQueriesReferral) {
			this.saveReferralQuery(classifiedQueries.firstQueriesReferral);
		}
	}

	public async getQueries(): Promise<ClassifiedQueries> {
		// TODO @developer: Son
		try {
			const seekerApprovedTxs: TransferTransaction[] = await this.getSeekerApprovedTxs(
				this.appConstants.NUMBER_LOAD_PAGE_SEEKER_APPROVED_TXS
			);
			const seekerMap: Map<string, SeekerProperties> = this.filterSeekersApprovedMap(
				seekerApprovedTxs
			);
			const sinkAddressTxs: TransferTransaction[] = await this.getSinkAddressTxs(
				this.appConstants.NUMBER_LOAD_PAGE_TXS_SINK_ADDRESS
			);
			const txsFromSeeker = this.filterTxsFromSeeker(sinkAddressTxs, seekerMap);
			const classifiedQueries: any = await this.filterQueries(
				txsFromSeeker
			);
			return classifiedQueries;
		} catch (error) {
			this.logSerivce.makeErrorLog('query.service', 'getApprovedQueryTxs', error);
			return {
				queriesInfoRequestMap: new Map(),
				queriesRedeemptionMap: new Map(),
				firstQueriesReferral: new QueryInfo
			};
		}
	}

	async getSeekerApprovedTxs(numberPage: number): Promise<TransferTransaction[]> {
		// TODO @developer: Son
		if (!this.networkInfoService.isConnected()) {
			return [];
		}
		let allPageTxs: Array<TransferTransaction> = new Array();
		const pageSize = this.appConstants.PAGE_SIZE_APPROVEVAL_TXS;
		for (let index = 0; index < numberPage; index++) {
			const txs: Transaction[] = await this.dhealthService.getOutGoingTxs(
				this.buildConfig.getApprovevalAuthorityAddress(),
				index,
				pageSize
			);
			if (txs && txs.length > 0) {
				allPageTxs = allPageTxs.concat(txs as TransferTransaction[]);
			} else {
				return allPageTxs;
			}
		}
		return allPageTxs;
	}

	filterSeekersApprovedMap(
		// TODO @developer: Son
		// UInt64 handling - timestamp
		seekerApprovedTxs: TransferTransaction[]
	): Map<string, SeekerProperties> {
		if (!this.networkInfoService.isConnected()) {
			return new Map();
		}
		const seekersApprovedMap: Map<string, SeekerProperties> = new Map();
		seekerApprovedTxs.forEach(async approvedTxs => {
			const message: Message = approvedTxs.message;
			const plainMessage: string = message.payload;
			if (!seekersApprovedMap.has(approvedTxs.recipientAddress.plain())) {
				if (plainMessage.includes('SEEKER_APPROVED')) {
					const seekerName = message.payload.substring(16, message.payload.length);
					const timestamp = approvedTxs.transactionInfo ? parseInt(
						(
							await BlockchainUtil.getBlockByHeightUInt64(
								this.environment.networkType.valueOf(),
								approvedTxs.transactionInfo.height
							)
						).timestamp.toString()
					) : 0;
					seekersApprovedMap.set(
						approvedTxs.recipientAddress.plain(),
						new SeekerProperties(AppConstants.SEEKER_APPROVED, timestamp, seekerName)
					);
				} else if (plainMessage.includes('SEEKER_DISAPPROVED')) {
					const timestamp = approvedTxs.transactionInfo ? parseInt(
						(
							await BlockchainUtil.getBlockByHeightUInt64(
								this.environment.networkType.valueOf(),
								approvedTxs.transactionInfo.height
							)
						).timestamp.toString()
					) : 0;
					seekersApprovedMap.set(
						approvedTxs.recipientAddress.plain(),
						new SeekerProperties(AppConstants.SEEKER_DISAPPROVED, timestamp)
					);
				}
			}
		});
		this.logSerivce.makeDefaultLog(
			'query_services.ts',
			'filterSeekersApproved',
			'seekersApprovedMap',
			seekersApprovedMap
		);
		this.cacheSeerkerAppprovedMap = seekersApprovedMap;
		return seekersApprovedMap;
	}

	async getSinkAddressTxs(numberPage: number): Promise<TransferTransaction[]> {
		// TODO @developer: Son
		if (!this.networkInfoService.isConnected()) {
			return [];
		}
		let allPageTxs: Array<TransferTransaction> = [];
		const pageSize = this.appConstants.PAGE_SIZE_QUERY_TXS;

		for (let index = 0; index < numberPage; index++) {
			const txs: Transaction[] = await this.dhealthService.getIncommingTxs(
				this.buildConfig.getSinkAddress(),
				index,
				pageSize
			);
			if (txs && txs.length > 0) {
				allPageTxs = allPageTxs.concat(txs as TransferTransaction[]);
			} else {
				return allPageTxs;
			}
		}
		return allPageTxs;
	}

	filterTxsFromSeeker(
		sinkAddressTxs: TransferTransaction[],
		seekerApprovedMap: Map<string, SeekerProperties>
	): Array<TransferTransaction> {
		// TODO @developer: Son
		if (sinkAddressTxs && sinkAddressTxs.length > 0) {
			return sinkAddressTxs.filter(
				async txs => await this.isTxsFromSeeker(seekerApprovedMap, txs)
			);
		}
		return [];
	}

	async isTxsFromSeeker(
		seekerMap: Map<string, SeekerProperties>,
		txs: TransferTransaction
	): Promise<boolean> {
		const seekerPubAddress = txs.signer?.address.plain();
		const timestampTx = await TransactionUtil.getTimestampFromTransaction(txs);
		const timestamp = LocalDateTime.ofInstant(
			Instant.ofEpochMilli(timestampTx * 1000),
			ZoneId.systemDefault()
		);
		if (seekerPubAddress && seekerMap.has(seekerPubAddress)) {
			const seekerProperties = seekerMap.get(seekerPubAddress);
			if (
				seekerProperties &&
				seekerProperties.seekerApproved === AppConstants.SEEKER_APPROVED &&
				seekerProperties.timestamp < timestamp
			) {
				return true;
			}
		}
		return false;
	}

	async filterQueries(txsFromSeeker: TransferTransaction[]): Promise<ClassifiedQueries | undefined> {
		// TODO @developer: Son
		const queriesInfoRequestMap: Map<string, QueryInfo> = new Map();
		const queriesRedeemptionMap: Map<string, QueryInfo> = new Map();
		let firstQueriesReferral: any;
		const queriesLocalSavedMap = await this.getQueriesLocalMap();
		const queriesParserCondition: QueriesParserCondition = await this.gatherQuerierParserCondition();
		this.queriesParser.setQueriesParserDataCondition(queriesParserCondition);
		for (const txs of txsFromSeeker) {
			const queryInfo: QueryInfo = await this.queriesParser.parseTransactionToQueryInfo(
				txs
			);
			if (!queryInfo) {
				return undefined;
			} else if (
				queryInfo.type &&
				queryInfo.type === Query.Type.QUERY_REFERRAL_BONUS &&
				!firstQueriesReferral
			) {
				firstQueriesReferral = queryInfo;
			} else if (queryInfo.type && queryInfo.type === Query.Type.QUERY_REDEMPTION_OFFER) {
				this.classifyQueries(queryInfo, queriesRedeemptionMap);
			} else {
				this.classifyQueries(queryInfo, queriesInfoRequestMap, queriesLocalSavedMap);
			}
		}
		this.transactionsRepository.queryResponseList =
			queriesParserCondition.queryResponseList;
		return {
			queriesInfoRequestMap,
			queriesRedeemptionMap,
			firstQueriesReferral
		};
	}

	classifyQueries(
		queryInfo: QueryInfo,
		queriesIncomingMap: Map<string, QueryInfo>,
		queriesLocalMap?: Map<string, QueryInfo>
	) {
		const queryInfoId = queryInfo.id;
		if (!queriesLocalMap) queriesLocalMap = new Map();
		// TODO @developer: Son
		if (
			queryInfo.operation === Query.Operation.QUERY_NEW && queryInfoId &&
			!queriesIncomingMap.has(queryInfoId)
		) {
			this.queriesParser.addNewQuery(queryInfo, queriesIncomingMap, queriesLocalMap);
		} else if (queryInfo.operation === Query.Operation.QUERY_UPDATE) {
			this.queriesParser.updateQuery(queryInfo, queriesIncomingMap, queriesLocalMap);
		} else if (queryInfo.operation === Query.Operation.QUERY_DISABLE) {
			this.queriesParser.disableQuery(queryInfo, queriesIncomingMap);
		} else {
		}
	}

	triggerNewQueriesNotification(newQueries: QueryInfo[], queryType?: Query.Type) {
		if (newQueries && newQueries.length > 0) {
			this.notificationService.showQueryNotification(newQueries);
			!queryType
				? this.event.publish(this.appConstants.QUERY_STATUS_UPDATE)
				: this.event.publish('QUERY_OFFER_COUNT_UPDATE');
		}
	}

	/**
	 * @param queriesIncommingMap  Incoming queries get from blockchain
	 * @param queriesLocalStorageMap  Saved queries in local storage
	 * @param queryType Which type: Redemption offer query or query info request
	 * @return  Return list of new query
	 */
	async updateQueriesLocalStorage(
		incommingQueriesMap: Map<string, QueryInfo>,
		storagedQueriesList: QueryInfo[],
		queryType?: Query.Type
	): Promise<QueryInfo[]> {
		// TODO @developer: Son
		if (!incommingQueriesMap || incommingQueriesMap.size < 0) {
			return [];
		}

		const newQueriesList: QueryInfo[] = [];
		// Incomming queries include new and old queries
		const incomingQueriesList: QueryInfo[] = Array.from(incommingQueriesMap.values());
		const storagedQueriesMap: Map<string, QueryInfo> = this.queriesList2QueriesMap(
			storagedQueriesList
		);

		let updatedStoragedQueriesList: QueryInfo[];
		const numberStoragedQueries = storagedQueriesMap.size;
		for (const incommingQuery of incomingQueriesList) {
			const newQuery = this.handleQueryOperation(incommingQuery, storagedQueriesMap);
			if (newQuery) {
				newQueriesList.push(newQuery);
			}
		}

		updatedStoragedQueriesList = Array.from(storagedQueriesMap.values());
		const isDisableOrReactiveQueries = this.disableOrReactiveQueries(
			updatedStoragedQueriesList
		);
		await this.saveUpdatedStorageQueries(
			isDisableOrReactiveQueries,
			updatedStoragedQueriesList,
			numberStoragedQueries,
			queryType
		);
		return newQueriesList;
	}

	async saveUpdatedStorageQueries(
		isDisableOrReactiveQueries: boolean,
		updatedStoragedQueriesList: QueryInfo[],
		numberStoragedQueries: number,
		queryType?: Query.Type
	) {
		// TODO @developer: Son
		if (queryType && queryType === Query.Type.QUERY_REDEMPTION_OFFER) {
			await this.queryRepository.saveAllQueriesRedeemption(updatedStoragedQueriesList);
			if (updatedStoragedQueriesList.length < numberStoragedQueries) {
				// Check that queries were deleted by queries disable
				this.event.publish('QUERY_OFFER_COUNT_UPDATE');
			}
		} else {
			await this.queryRepository.saveAllQueries(updatedStoragedQueriesList);
			if (
				updatedStoragedQueriesList.length < numberStoragedQueries ||
				isDisableOrReactiveQueries
			) {
				this.getNumberAvailableQueries();
			}
		}
	}

	async getNumberAvailableQueries() {
		// TODO @developer: Son
		const queryInfoList = await this.getListNoStatusQueries();
		this.event.publish('UPDATE_BADGE', queryInfoList.length);
	}

	queriesList2QueriesMap(queriesList: QueryInfo[]): Map<string, QueryInfo> {
		// TODO @developer: Son
		let queriesMap: Map<string, QueryInfo> = new Map<string, QueryInfo>();
		if (queriesList && queriesList.length > 0) {
			queriesMap = new Map(
				queriesList.map<[string, QueryInfo]>(queries => [queries.id?queries.id:'', queries])
			);
		}
		return queriesMap;
	}

	disableOrReactiveQueries(queriesLocal: QueryInfo[]): boolean {
		// TODO @developer: Son
		let isDisableOrReactivaeQueries = false;
		for (const query of queriesLocal) {
			const queryId = query.queryId;
			if (
				query.reactivateAfterMinutes &&
				this.transactionsRepository.checkIfShouldReactivate(query) &&
				queryId
			) {
				query.queryResponseTimestamp = this.transactionsRepository.getQueryResponse(
					queryId
				).timestamp;
				query.status = QueriesStatus.UNKNOWN;
				isDisableOrReactivaeQueries = true;
			} else if (
				query.status !== QueriesStatus.DISABLE &&
				!query.reactivateAfterMinutes &&
				this.transactionsRepository.checkIfShouldDsiable(query)
			) {
				query.status = QueriesStatus.DISABLE;
				isDisableOrReactivaeQueries = true;
			}
		}
		return isDisableOrReactivaeQueries;
	}

	public updateQueriesStatus(queryInfo: QueryInfo, status: number): Promise<any> {
		// TODO @developer: Son
		return this.queryRepository.tryUpdateQueryStatus(queryInfo, status);
	}

	public async getListQueriesReponse(): Promise<QueryResponseData[]> {
		// TODO @developer: Son
		const queryResponseList: QueryResponseData[] = [];
		const queryResponseMap: Map<number, boolean> = new Map();
		const wallet = this.walletService.getCachedWallet();
		const account = wallet.open(new Password(this.loginService.getKey()));
		const rewardTxs = this.injector.get(TransactionHistoryService).getCachedRewardTxs(); // Todo need to refactor this function

		rewardTxs.forEach((transaction: any) => {
			const queryResonse: QueryResponseData = this.queriesParser.parseTransactionToQueryResponse(
				transaction,
				account
			);
			if (queryResonse && !queryResponseMap.has(queryResonse.queryId)) {
				queryResponseList.push(queryResonse);
				queryResponseMap.set(queryResonse.queryId, true);
			}
		});
		this.logSerivce.makeDefaultLog(
			'query-service.ts',
			'getListQueriesReponse',
			'queryResponseList',
			queryResponseList
		);
		return queryResponseList;
	}

	getRewardTxs(
		newTxsBlockchain: TransferTransaction[],
		walletAddress: string,
		seekerApprovedMap: Map<string, SeekerProperties>
	): TransferTransaction[] {
		// TODO @developer: Son
		const txsFromSeeker: TransferTransaction[] = newTxsBlockchain
			? newTxsBlockchain.filter(
					txs => {
						const signer = txs.signer;
						if (signer) {
							txs.recipientAddress.plain() === walletAddress &&
							seekerApprovedMap.has(signer.address.plain())	
						}
					}
			  )
			: [];
		return txsFromSeeker;
	}

	getMapQueryResponse(queryResponseList: QueryResponseData[]): Map<number, boolean> {
		// TODO @developer: Son
		const queryResponseMap: Map<number, boolean> = new Map();
		queryResponseList.forEach(queryResponse => {
			queryResponseMap.set(queryResponse.queryId, queryResponse.status);
		});
		this.logSerivce.makeDefaultLog(
			'query.services.ts',
			'getQueryResponseMap',
			'queryResponseMap',
			queryResponseMap
		);
		return queryResponseMap;
	}

	public async getQueriesLocalMap(): Promise<Map<string, QueryInfo>> {
		// TODO @developer: Son
		const queriesLocal = await this.queryRepository.getAllQuery();
		return new Map(
			queriesLocal.map((queries: any) => [queries.id, queries])
		);
	}

	async gatherQuerierParserCondition(): Promise<QueriesParserCondition> {
		// TODO @developer: Son
		let selectedLanguage: string = this.translateService.currentLang;
		if (!selectedLanguage) {
			selectedLanguage = this.translateService.getDefaultLang();
		}
		let selectedLanguageCode: string = 'GB';
		for (const langObj of AppConstants.LANGUAGE_SUPPORT_LIST) {
			if (langObj.code === selectedLanguage) {
				selectedLanguageCode = langObj.alpha2Code;
			}
		}
		// tslint:disable-next-line: max-line-length
		const basicHealthModel: BasicHealthModel = await this.injector
			.get(HealthDataService)
			.getBasicHealthModel(); // Todo need to move health data to health data service
		const onlyShowQueriesInSelectedLanguage: boolean = await this.getFlagMatchQueriesLanguage();
		const allProviderStored: ProviderRegis[] = await this.injector
			.get(ProviderPatientService)
			.getAllProviderStored();
		const queryResponseList: QueryResponseData[] = await this.getListQueriesReponse();
		const queryResponseMap: Map<number, boolean> = this.getMapQueryResponse(
			queryResponseList
		);
		const diagnosisPatientStored: DiagnosisPatient = await this.injector
			.get(ProviderPatientService)
			.getDianosisPatientStored();

		return {
			// test fucntion in undefined case
			selectedLanguageCode,
			basicHealthModel,
			onlyShowQueriesInSelectedLanguage,
			allProviderStored,
			queryResponseList,
			queryResponseMap,
			diagnosisPatientStored
		};
	}

	public handleQueryOperation(
		// TODO @developer: Son
		queryInfo: QueryInfo,
		queriesLocal: Map<string, QueryInfo>
	): QueryInfo {
		const queryInfoId = queryInfo.id;
		if (queryInfoId && this.shareVariable.getExpiredQueryIds().has(queryInfoId)) {
			if (queriesLocal.has(queryInfoId)) {
				queriesLocal.delete(queryInfoId);
			}
			return new QueryInfo();
		}

		switch (queryInfo.operation) {
			case Query.Operation.QUERY_NIL: {
				break;
			}
			case Query.Operation.QUERY_NEW: {
				if (queryInfoId && !queriesLocal.has(queryInfoId)) {
					queriesLocal.set(queryInfoId, queryInfo);
					return queryInfo;
				}
				break;
			}
			case Query.Operation.QUERY_UPDATE: {
				if (queryInfoId && !queriesLocal.has(queryInfoId)) {
					queriesLocal.set(queryInfoId, queryInfo);
					return queryInfo;
				} else if (
					queryInfoId &&
					queriesLocal &&
					queriesLocal.has(queryInfoId)
				) {
					const queryLocal = queriesLocal.get(queryInfoId);
					const queryLocalTimestamp = queryLocal?.timestamp;
					const queryInfoTimestamp = queryInfo.timestamp;
					if (
						queryLocal &&
						queryLocalTimestamp &&
						queryInfoTimestamp &&
						queryLocalTimestamp < queryInfoTimestamp
					) {
						// const queryLocal = queriesLocal.get(queryInfoId);
						if (queryLocal && queryLocal.redeemCount) {
							queryInfo.redeemCount = queryLocal.redeemCount;
						}
						queriesLocal.delete(queryInfoId);
						queriesLocal.set(queryInfoId, queryInfo);
						return queryInfo; // return  queryInfo in case new , update
					}
				}
				break;
			}
			case Query.Operation.QUERY_DISABLE: {
				if (
					queryInfoId &&
					queriesLocal.has(queryInfoId)
				) {
					const queryLocal = queriesLocal.get(queryInfoId);
					const queryLocalTimestamp = queryLocal?.timestamp;
					const queryInfoTimestamp = queryInfo.timestamp;
					if (
						queryLocal &&
						queryLocalTimestamp &&
						queryInfoTimestamp &&
						queryLocalTimestamp <= queryInfoTimestamp
					) {
						queriesLocal.delete(queryInfoId);
					}
				}
			}
			break;
			default:
				break;
		}
		return new QueryInfo();
	}

	public async getFlagMatchQueriesLanguage(): Promise<boolean> {
		// TODO @developer: Son
		return this.flagMatchQueriesLanguageRepo.getFlagMatchQueriesLanguage(
			AppConstants.ONLY_SHOW_QUERIES_IN_SELECTED_LANGUAGE_STORE_KEY
		);
	}

	public saveFlagMatchQueriesLanguage(show: boolean) {
		// TODO @developer: Son
		this.flagMatchQueriesLanguageRepo.saveFlagMatchQueriesLanguage(
			AppConstants.ONLY_SHOW_QUERIES_IN_SELECTED_LANGUAGE_STORE_KEY,
			show
		);
	}

	public getCachedSeekerApprovedMap() {
		// TODO @developer: Son
		return this.cacheSeerkerAppprovedMap;
	}

	setCachedSeekerApprovedMap(seekerApprovedMap: Map<string, SeekerProperties>) {
		// TODO @developer: Son
		this.cacheSeerkerAppprovedMap = seekerApprovedMap;
	}

	public getListQueriesFromLocal(status?: number) {
		// TODO @developer: Son
		if (!status || status === QueriesStatus.UNKNOWN) {
			return this.queryRepository.getAllQuery();
		}
		return this.queryRepository.getQueryByStatus(status);
	}

	public getListNoStatusQueries() {
		// TODO @developer: Son
		return this.queryRepository.getListNoStatusQueries();
	}

	public updateQueryOfferCountNumber(queryOffer: QueryInfo, count: number) {
		// TODO @developer: Son
		return this.queryRepository.tryUpdateQueryOfferCountNumber(queryOffer, count);
	}

	public getListQueriesOfferFromLocal() {
		// TODO @developer: Son
		return this.queryRepository.getAllQueriesRedeemption();
	}

	public async saveReferralQuery(referralQuery: QueryInfo) {
		// TODO @developer: Son
		const referralQueryLocalDb: QueryInfo = await this.queryRepository.getReferralQuery(
			'offer_token_amount'
		);
		if (
			referralQuery &&
			(!referralQueryLocalDb || 
				(
					referralQuery.timestamp &&
					referralQueryLocalDb.timestamp &&
					referralQuery.timestamp > referralQueryLocalDb.timestamp
				)
			)
		) {
			this.queryRepository.saveReferralQuery('offer_token_amount', referralQuery);
		}
	}

	public getReferralQueryFromLocal(): Promise<QueryInfo> {
		// TODO @developer: Son
		return this.queryRepository.getReferralQuery('offer_token_amount');
	}

	async getProviderPublicKey(providerAddress: string): Promise<string | undefined> {
		// TODO @developer: Son
		if (this.networkInfoService.isConnected()) {
			// Get provider public key from cache app list
			if (
				this.cachedProviderPublicKeyMap &&
				this.cachedProviderPublicKeyMap.has(providerAddress)
			) {
				return this.cachedProviderPublicKeyMap.get(providerAddress);
			}

			// Get provider public key from list  offer queries (make a cache list)
			const queryOfferList: QueryInfo[] = await this.getListQueriesOfferFromLocal();
			if (queryOfferList) {
				this.cachedProviderPublicKeyMap = new Map<string, string>();
				queryOfferList.forEach(queryOffer => {
					if (!queryOffer.redemptionPublicKey) {
						return;
					}
					const publicAccount = PublicAccount.createFromPublicKey(
						queryOffer.redemptionPublicKey,
						this.environment.networkType.valueOf()
					);
					if (!this.cachedProviderPublicKeyMap.has(publicAccount.address.plain())) {
						this.cachedProviderPublicKeyMap.set(
							publicAccount.address.plain(),
							publicAccount.publicKey
						);
					}
				});
				if (this.cachedProviderPublicKeyMap.has(providerAddress)) {
					return this.cachedProviderPublicKeyMap.get(providerAddress);
				}
			}
			// Get provider public key from blockchain
			// var accountHttp = new AccountHttp();
			return this.dhealthService.getAccountPublicKey(
				Address.createFromRawAddress(providerAddress)
			);
		}
	}
}

export class QueriesStatus {
	public static UNKNOWN: number = 0;
	public static ACCEPTED: number = 1;
	public static DENY: number = 2;
	public static DISABLE: number = 3;
}