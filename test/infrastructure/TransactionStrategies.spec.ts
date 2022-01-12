import { TransferTransaction } from "@dhealth/sdk";
import { expect } from "chai";
import { TransactionStrategies, TransferTransactionStrategy } from "../../src";

describe('TransactionStrategies', () => {
    it('get transfer transaction strategy', async () => {
        // GIVEN
        const classname = TransferTransaction.name;

        // WHEN
        const strategy = TransactionStrategies.getStrategy(classname);

        // THEN
        expect(strategy).is.not.undefined;
        expect(strategy).instanceOf(TransferTransactionStrategy);
    });
});