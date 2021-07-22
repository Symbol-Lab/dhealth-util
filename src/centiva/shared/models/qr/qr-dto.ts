import { QrAccount } from './qr-account';

export class QrDto {
	public v: any;
	public type: number;
	public data: QrAccount;
	static readonly TYPE = {
		ACCOUNT: 3
	};
	static readonly VERSION = 2;
	constructor(type: number, data: QrAccount) {
		this.v = QrDto.VERSION;
		this.type = type;
		this.data = data;
	}
}
