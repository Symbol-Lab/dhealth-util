export class AppPassword {
	public hashPassword: string;
	public saltPassword: string;
	public passPhrase: string;
	public isEncryptedPassphrase: boolean;
	constructor(
		hashPassword: string,
		saltPasssword: string,
		passPhrase?: string,
		isEncryptedPassphrase?: boolean
	) {
		this.hashPassword = hashPassword;
		this.saltPassword = saltPasssword;
		this.passPhrase = passPhrase ? passPhrase : '';
		this.isEncryptedPassphrase = isEncryptedPassphrase ? isEncryptedPassphrase : false;
	}
}
