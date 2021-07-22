// import { Injectable, Injector } from '@angular/core';
// import { NotificationService } from '@services/cordova/notification/notification.service';
import { SeekerProperties } from '../../../../shared/models/seeker-properties.model';
// import { NetworkInfoService } from '@services/cordova/network-info/network-info.service';
// import { ConsoleLogService } from '@services/support-service/console-log/console.log.service';
// import { AppConstants } from '@services/app-constants/app-constants.service';
// import { IntervalService } from '@services/support-service/interval/interval.service';
// import { environment } from '@environments/environment';
import { QueriesService } from '../queries-service2/queries.service';
// import { WalletService } from '@services/blockchain/wallet2/wallet.service';
// import { DHealthService } from '@services/blockchain/dhealth/dhealth.service';
// import { TransactionsRepositoryService } from '@services/repository/transactions-repository2/transactions-repository.service';
import { TransferTransaction, Transaction } from '../../../../..';

export class TransactionHistoryService {
	cachedTxs: Transaction[] = [];
	cachedRewardTxs: Transaction[] = [];
	// define value using for wallet custome page
	queryParams: any;
	lastId: any;
	lastHash: any;
	canLoadMore: boolean = false;
	unConfirmTransactions: Transaction[] = [];
	intervalRequestUnConfirmTxs: any;
	// define value for home page
	twoLatestTxs: Transaction[] = [];
	// cached latest

	constructor(
		private transactionRepository: any,
		private notificationService: any,
		private networkInfoService: any,
		private logService: any,
		private dHealthService: any,
		private appConstants: any,
		private intervalService: any,
		private walletService: any,
		private injector: any,
		private environment: any
	) {
		this.queryParams = {
			pageSize: this.appConstants.PAGE_SIZE_DISPLAY_TXS
		};
	}

	async doSyncTransaction() {
		if (this.environment.walletMode) {
			const seekerApprovedMap = this.injector
				.get(QueriesService)
				.getCachedSeekerApprovedMap();
			const latestTxsBlockChain = await this.getListTransactionsBlockChain();
			const transferTxsLocal = await this.getTransactionsFromLocal();
			this.updateCachedTxs(latestTxsBlockChain);
			this.saveLastId(latestTxsBlockChain);
			await this.handleNewTxs(latestTxsBlockChain, transferTxsLocal);
			this.setTwoLatestTxs(this.cachedTxs);
			const rewardTxs = this.getRewardTxs(
				// todo test reactive survey, reward.
				latestTxsBlockChain,
				transferTxsLocal,
				seekerApprovedMap
			);
			this.setCachedRewardTxs(rewardTxs);
			this.logService.makeDefaultLog(
				'transaction-history.service.ts',
				'getRewardTxs',
				'rewardTxs',
				rewardTxs
			);
			return latestTxsBlockChain;
		}
	}

	async handleNewTxs(
		latestTxsBlockChain: TransferTransaction[],
		transferTxsLocal: TransferTransaction[]
	) {
		this.logService.makeDefaultLog(
			'sync-transaction.serivce.ts',
			'doSyncTransaction',
			'transferTxsLocal',
			transferTxsLocal
		);
		const listNewTxs = this.checkExistNewTxsWithLocalDb(
			transferTxsLocal,
			latestTxsBlockChain
		);
		console.log('listnewTxs', listNewTxs);
		if (listNewTxs && listNewTxs.length > 0) {
			const additionTransactions = this.replaceNewTransaction(
				listNewTxs,
				transferTxsLocal
			);
			this.logService.makeDefaultLog(
				'sync-transaction-task.ts',
				'doSyncTransaction',
				'additionTransactions',
				additionTransactions
			);
			await this.synchronizeWithTxLocalDB(additionTransactions);
			this.createNotification(listNewTxs);
		}
	}

	// For get more txs
	saveLastId(latestTxsBlockChain: TransferTransaction[]) {
		console.log('save last id', latestTxsBlockChain);
		if (
			latestTxsBlockChain &&
			latestTxsBlockChain.length === this.appConstants.PAGE_SIZE_DISPLAY_TXS
		) {
			this.lastId = this.cachedTxs[this.cachedTxs.length - 1].transactionInfo?.id;
			this.lastHash = this.cachedTxs[
				this.cachedTxs.length - 1
			].transactionInfo?.hash?.toString();
			this.queryParams = {
				pageSize: this.appConstants.PAGE_SIZE_DISPLAY_TXS,
				id: this.lastId
			};
			this.canLoadMore = true;
		}
	}

	/*
		Cache txs
		Check if have new txs => merge new txs to current cached txs
	*/
	updateCachedTxs(latestTxsBlockChain: TransferTransaction[]) {
		if (!this.cachedTxs || this.cachedTxs.length === 0) {
			this.cachedTxs = latestTxsBlockChain;
		} else if (latestTxsBlockChain.length < this.appConstants.PAGE_SIZE_DISPLAY_TXS) {
			this.cachedTxs = latestTxsBlockChain;
		} else if (latestTxsBlockChain.length >= this.appConstants.PAGE_SIZE_DISPLAY_TXS) {
			const cachedTxsTransferTxsType = this.cachedTxs as TransferTransaction[];
			const newTxs = this.checkExistNewTxsWithCachedTxs(
				cachedTxsTransferTxsType,
				latestTxsBlockChain
			);
			if (newTxs && newTxs.length > 0) {
				this.cachedTxs = newTxs.concat(cachedTxsTransferTxsType);
			} else {
				this.cachedTxs = latestTxsBlockChain;
			}
		}
	}

	async getListTransactionsBlockChain() {
		const wallet = this.walletService.getCachedWallet();
		const listTransaction = await this.dHealthService.getAllTxs(wallet.address, {
			pageSize: this.appConstants.PAGE_SIZE_DISPLAY_TXS
		});
		const listTransferTxs: any = listTransaction as TransferTransaction[];
		return listTransferTxs;
	}

	async getTransactionsFromLocal(): Promise<TransferTransaction[]> {
		return this.transactionRepository.getAllTransactions();
	}

	// only cacehed 20 latest txs
	replaceNewTransaction(
		newTransactions: TransferTransaction[],
		transferTxsLocal: TransferTransaction[]
	) {
		let additionTransactions = newTransactions.concat(transferTxsLocal);
		if (additionTransactions.length > this.appConstants.PAGE_SIZE_DISPLAY_TXS) {
			additionTransactions = additionTransactions.splice(
				0,
				this.appConstants.PAGE_SIZE_DISPLAY_TXS
			);
		}
		return additionTransactions;
	}

	async synchronizeWithTxLocalDB(additionTransactions: TransferTransaction[]) {
		return this.transactionRepository.saveAllTransactions(additionTransactions);
	}

	convertListTxsLocalDbToMap(transferTxsLocal: TransferTransaction[]) {
		const mapTransferTxsLocal: Map<string, TransferTransaction> = new Map();
		if (transferTxsLocal && transferTxsLocal.length > 0) {
			transferTxsLocal.forEach((transferTx: any) => {
				mapTransferTxsLocal.set(transferTx.transactionInfo.hash.toString(), transferTx);
			});
		}
		return mapTransferTxsLocal;
	}

	convertListCachedTxsToMap(transferTxsLocal: TransferTransaction[]) {
		const mapTransferTxsLocal: Map<string, TransferTransaction> = new Map();
		if (transferTxsLocal && transferTxsLocal.length > 0) {
			transferTxsLocal.forEach(transferTx => {
				const hash = transferTx.transactionInfo?.hash;
				if (hash) {
					mapTransferTxsLocal.set(hash.toString(), transferTx);
				}
			});
		}
		return mapTransferTxsLocal;
	}

	checkExistNewTxsWithLocalDb(
		transferTxsLocal: TransferTransaction[],
		transferTxsBlockChain: TransferTransaction[]
	) {
		const mapTransferTxsLocal: Map<
			string,
			TransferTransaction
		> = this.convertListTxsLocalDbToMap(transferTxsLocal);
		const listNewTransaction: TransferTransaction[] = [];
		if (transferTxsBlockChain && transferTxsBlockChain.length > 0) {
			transferTxsBlockChain.forEach((transferTx: any) => {
				if (!mapTransferTxsLocal.has(transferTx.transactionInfo.hash.toString())) {
					listNewTransaction.push(transferTx);
				}
			});
		}
		if (listNewTransaction.length > 0) {
			return listNewTransaction;
		} else {
			return undefined;
		}
	}

	checkExistNewTxsWithCachedTxs(
		cachedTxs: TransferTransaction[],
		transferTxsBlockChain: TransferTransaction[]
	) {
		const mapTransferTxsLocal: Map<
			string,
			TransferTransaction
		> = this.convertListCachedTxsToMap(cachedTxs);
		const listNewTransaction: TransferTransaction[] = [];
		if (transferTxsBlockChain && transferTxsBlockChain.length > 0) {
			transferTxsBlockChain.forEach(transferTx => {
				const hash = transferTx.transactionInfo?.hash;
				if (hash && !mapTransferTxsLocal.has(hash.toString())) {
					listNewTransaction.push(transferTx);
				}
			});
		}
		if (listNewTransaction.length > 0) {
			return listNewTransaction;
		} else {
			return [];
		}
	}

	createNotification(listNewTxs: TransferTransaction[]) {
		const wallet = this.walletService.getCachedWallet();
		let haveNewInCommingTx = false;
		let textNotification = 'from ';
		for (let index = 0; index < listNewTxs.length; index++) {
			if (index < 2 && !listNewTxs[index].signer?.address.equals(wallet.address)) {
				textNotification += listNewTxs[index].signer?.address.plain() + ' ;';
				haveNewInCommingTx = true;
			} else if (index >= 2 && !listNewTxs[index].signer?.address.equals(wallet.address)) {
				textNotification += '[...}';
				break;
			}
		}
		if (haveNewInCommingTx) {
			this.notificationService.showNotification(textNotification);
		}
		// reload all txs when have new txs
	}

	/*
	 Get txs from local db , then compare with lastest txs get from
	 blockchain to find new reward txs, then call sync queries to get
	 reactivate survey
	*/
	getRewardTxs(
		txsBlockchain: TransferTransaction[],
		txsLocal: TransferTransaction[],
		seekerApprovedMap: Map<string, SeekerProperties>
	): TransferTransaction[] {
		const wallet = this.walletService.getCachedWallet();
		const listTxsFromSeekerBlockchain: TransferTransaction[] = txsBlockchain
			? txsBlockchain.filter(
					txs =>
						txs.recipientAddress.plain() === wallet.address.plain() &&
						txs.signer &&
						seekerApprovedMap.has(txs.signer.address.plain())
			  )
			: [];

		const listTxsFromSeekerLocalDb: TransferTransaction[] = txsLocal
			? txsLocal.filter(
					(txs: any) =>
						txs.recipient.value === wallet.address.plain() &&
						seekerApprovedMap.has(txs.signer.address.value + '')
			  )
			: [];

		let rewardTxsBlockchain: TransferTransaction[];
		let rewardTxsLocalDb: TransferTransaction[];

		if (this.environment.isProtractor) {
			rewardTxsBlockchain = [...listTxsFromSeekerBlockchain];
			rewardTxsLocalDb = [...listTxsFromSeekerLocalDb];
		} else {
			rewardTxsBlockchain = listTxsFromSeekerBlockchain.filter(
				txs => txs.mosaics !== undefined && txs.mosaics.length > 0
			);
			rewardTxsLocalDb = listTxsFromSeekerLocalDb.filter(
				txs => txs.mosaics && txs.mosaics.length > 0
			);
		}

		const mapRewardTxsLocalDb: Map<
			string,
			TransferTransaction
		> = this.convertListTxsLocalDbToMap(rewardTxsLocalDb);

		let flagSyncQueries = false;
		for (const rewardTxs of rewardTxsBlockchain) {
			if (rewardTxs.transactionInfo &&
				rewardTxs.transactionInfo.hash &&
				!mapRewardTxsLocalDb.has(rewardTxs.transactionInfo.hash.toString())) {
				flagSyncQueries = true;
				break;
			}
		}

		if (flagSyncQueries) {
			this.injector.get(QueriesService).syncQueries();
		}
		return rewardTxsBlockchain;
	}

	// Manage wallet page
	async getAllTransaction(refresher?: any) {
		if (this.networkInfoService.isConnected()) {
			try {
				const wallet = this.walletService.getCachedWallet();
				this.queryParams = { pageSize: this.appConstants.PAGE_SIZE_DISPLAY_TXS };
				this.cachedTxs = await this.dHealthService.getAllTxs(
					wallet.address,
					this.queryParams
				);
				if (this.cachedTxs.length === this.appConstants.PAGE_SIZE_DISPLAY_TXS) {
					this.lastId = this.cachedTxs[this.cachedTxs.length - 1].transactionInfo?.id;
					this.lastHash = this.cachedTxs[
						this.cachedTxs.length - 1
					].transactionInfo?.hash?.toString();
					this.queryParams = {
						pageSize: this.appConstants.PAGE_SIZE_DISPLAY_TXS,
						id: this.lastId
					};
					this.canLoadMore = true;
					if (refresher) {
						refresher.target.complete();
					}
				}
			} catch (error) {
				this.logService.makeErrorLog(
					'wallet-information.service.ts',
					'getAllTransaction',
					error
				);
			}
		}
	}

	async getMoreTransaction(ionInfinite: any) {
		if (this.canLoadMore) {
			const additionalTransactions = await this.dHealthService.getAllTxs(
				this.walletService.getRawWalletAddress(),
				this.queryParams
			);
			if (additionalTransactions.length > 0) {
				this.cachedTxs = this.cachedTxs.concat(additionalTransactions);
				this.logService.makeDefaultLog(
					'wallet-information.service.ts',
					'getMoreTransaction',
					'lastHash',
					this.lastHash
				);
				if (
					additionalTransactions[
						additionalTransactions.length - 1
					].transactionInfo.hash.toString() === this.lastHash ||
					additionalTransactions.length < this.appConstants.PAGE_SIZE_DISPLAY_TXS
				) {
					this.canLoadMore = false;
				}
			}

			if (
				additionalTransactions.length === this.appConstants.PAGE_SIZE_DISPLAY_TXS &&
				this.canLoadMore
			) {
				this.lastId = this.cachedTxs[this.cachedTxs.length - 1].transactionInfo?.id;
				this.lastHash = this.cachedTxs[
					this.cachedTxs.length - 1
				].transactionInfo?.hash?.toString();
				this.queryParams = {
					pageSize: this.appConstants.PAGE_SIZE_DISPLAY_TXS,
					id: this.lastId
				};
			}
			ionInfinite.complete();
		}
	}

	// Manage home page
	setTwoLatestTxs(transactions: Transaction[]) {
		if (transactions.length > 2) {
			this.twoLatestTxs = transactions.slice(0, 2);
		} else {
			this.twoLatestTxs = transactions;
		}
	}

	async() {
		if (this.networkInfoService.isConnected() && this.environment.walletMode) {
			this.listenUnconfirmTracsactions();
			this.checkUnconfirmTxs();
		}
	}

	async getOnboardingUnconfirmTxs() {
		for (let index = 0; index < 10; index++) {
			await this.setTimeOutSecond(30 * 1000);
			console.log('Onboarding  unconfirm txs every 30s');
			await this.checkUnconfirmTxs();
			if (this.unConfirmTransactions.length > 0) {
				break;
			}
		}
	}

	async checkUnconfirmTxs() {
		if (this.networkInfoService.isConnected()) {
			this.unConfirmTransactions = await this.dHealthService.getAllUnconfirmTransactions(
				this.walletService.getRawWalletAddress()
			);
			if (this.unConfirmTransactions && this.unConfirmTransactions.length > 0) {
				this.triggerInvervalRequestUnconfirmTxs();
			}
		}
	}

	triggerInvervalRequestUnconfirmTxs() {
		this.intervalService.clearInterval(this.intervalRequestUnConfirmTxs);
		this.intervalService.setFlagUnconfirmInterVal();
		this.intervalRequestUnConfirmTxs = this.intervalService.setInterval(
			20 * 1000,
			async () => {
				this.logService.makeDefaultLog(
					'wallet-information.service',
					'triggerInvervalRequestUnconfirmTxs',
					'unConfirmTransactions',
					this.unConfirmTransactions
				);
				this.unConfirmTransactions = await this.dHealthService.getAllUnconfirmTransactions(
					this.walletService.getRawWalletAddress()
				);
				if (!this.unConfirmTransactions || this.unConfirmTransactions.length === 0) {
					this.intervalService.clearInterval(this.intervalRequestUnConfirmTxs);
					this.intervalService.clearFlagUnconfirmInterVal();
					// request confirm txs
					this.queryParams = { pageSize: this.appConstants.PAGE_SIZE_DISPLAY_TXS };
					this.getAllTransaction();
				}
			}
		);
	}

	async listenUnconfirmTracsactions() {
		this.unConfirmTransactions = await this.dHealthService.getAllUnconfirmTransactions(
			this.walletService.getRawWalletAddress()
		);
		this.logService.makeDefaultLog(
			'wallet-information.service.ts',
			'listenUnconfirmTracsactions',
			'unConfirmTransactions',
			this.unConfirmTransactions
		);
		if (!this.intervalService.flagUnconfirmInterVal) {
			this.triggerInvervalRequestUnconfirmTxs();
		}
	}

	setTimeOutSecond(time: number) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(true);
			}, time);
		});
	}

	public getCachedTxs() {
		return this.cachedTxs;
	}

	public setCachedRewardTxs(rewardTxs: TransferTransaction[]) {
		this.cachedRewardTxs = rewardTxs;
	}

	public getCachedRewardTxs() {
		return this.cachedRewardTxs;
	}
}
