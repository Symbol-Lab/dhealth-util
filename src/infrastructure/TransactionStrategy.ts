import { Transaction } from "@dhealth/sdk";
import { TransactionCreationParams } from "./";

export interface TransactionStrategy {
    create(transactionCreationParams: TransactionCreationParams): Transaction;
}