export interface Currency {
	code: string;
	name: string;
	symbol: string;
}

export interface Country {
	name: string;
	dial_code: string;
	code: string;
	flag: string;
	nameDisplay: string;
	// name: string;
	// alpha2Code: string;
	// callingCodes: string[];
	// capital: string;
	// altSpellings: string[];
	// timezones: string[];
	// borders: string[];
	// nativeName: string;
	// currencies: Currency[];
	// languages: Language[];
	// translations: Translations;
	// regionalBlocs: RegionalBloc[];
	// cioc: string;
}

export interface Countries {
	countries: Country[];
}
