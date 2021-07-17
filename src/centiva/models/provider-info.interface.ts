import { LocalDateTime } from 'js-joda';

export interface ProviderInfo {
    createdDate: LocalDateTime;
    name: string;
    address: string
}
