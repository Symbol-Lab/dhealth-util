import { Query } from './query_pb';

export class QueryInfo {
    constructor(
        public senderAddress?: string,
        public timestamp?: number,
        public rawQueryData?: Query,
    ) { }
}
