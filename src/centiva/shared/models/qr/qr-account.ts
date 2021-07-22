export class QrAccount {
	public priv_key; // match name with android version
	public pw;
	public salt; //
	constructor(privateKey: string, salt: string, pw: string) {
		this.priv_key = privateKey;
		this.salt = salt;
		this.pw = pw;
	}
}
