export class NemNode {
	constructor(private protocol: string, private domain: string, private port?: number) {
		this.protocol = 'http';
		this.port = 7890;
	}
}
