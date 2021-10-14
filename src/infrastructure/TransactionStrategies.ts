import { TransferTransactionStrategy } from ".";
import { TransactionStrategy } from "./TransactionStrategy";

export class TransactionStrategies {
    static strategies: any = {
        'TransferTransaction': new TransferTransactionStrategy()
        // add more types of transaction
    }

    static getStrategy(className: string): TransactionStrategy {
        return this.strategies[className];
    }
}