import { NetworkType } from "@dhealth/sdk";

interface TransactionCreationParams {
    networkType: NetworkType;
    maxFee: number;
}

interface TransferTransactionCreationParams extends TransactionCreationParams {
    recipientAddress: string;
    mosaicDetails: Array<{mosaicId?:string, namespaceId?: string, amount: number}>;
    plainMessage: string;
}

export {
    TransactionCreationParams,
    TransferTransactionCreationParams
}