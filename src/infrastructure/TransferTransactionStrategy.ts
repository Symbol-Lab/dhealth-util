import { Address, Deadline, PlainMessage, Transaction, TransferTransaction, UInt64 } from "@dhealth/sdk";
import { TransactionStrategy, TransferTransactionCreationParams } from './';
import { NetworkConfig, TransactionUtil } from "..";

export class TransferTransactionStrategy implements TransactionStrategy {
    create(transactionCreationParams: TransferTransactionCreationParams): Transaction {
        let aliasedMosaics = [];
        for (const mosaicDetail of transactionCreationParams.mosaicDetails) {
            let aliasedMosaic;
            if (mosaicDetail.mosaicId) {
                aliasedMosaic = TransactionUtil.getMosaicFromId(mosaicDetail.mosaicId, mosaicDetail.amount);
            }
            if (!aliasedMosaic && mosaicDetail.namespaceName) {
                aliasedMosaic = TransactionUtil.getMosaicFromNamespace(mosaicDetail.namespaceName, mosaicDetail.amount);
            }
            if (aliasedMosaic) {
                aliasedMosaics.push(aliasedMosaic);
            }
        }
        const networkType = transactionCreationParams.networkType;
        return TransferTransaction.create(
            Deadline.create(NetworkConfig.networks[networkType].networkConfigurationDefaults.epochAdjustment),
            Address.createFromRawAddress(transactionCreationParams.recipientAddress),
            aliasedMosaics,
            PlainMessage.create(transactionCreationParams.plainMessage),
            transactionCreationParams.networkType,
            UInt64.fromUint(transactionCreationParams.maxFee)
        );
    }
}