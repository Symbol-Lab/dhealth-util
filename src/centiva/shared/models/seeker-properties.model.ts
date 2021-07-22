import { LocalDateTime } from 'js-joda';

export class SeekerProperties {
	constructor(seekerApproved: number, timestamp: any, seekerName?: string) {
		this.seekerApproved = seekerApproved;
		this.timestamp = timestamp;
		if (seekerName) this.seekerName = seekerName;
	}
	seekerApproved: number;
	timestamp: LocalDateTime;
	seekerName: string | undefined;
}
