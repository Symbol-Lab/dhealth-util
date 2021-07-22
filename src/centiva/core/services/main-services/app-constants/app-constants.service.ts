import { BasicHealth } from '../../../../shared/models/proto/basic-health_pb';

export class AppConstants {
	NUMBER_PIN = 6;
	QUERY_STATUS_UPDATE = 'QUERY_STATUS_UPDATE';
	HIDE_QUERY_OFFER_STATUS = 4;
	QUERY_OFFER_COUNT_UPDATE = 'QUERY_OFFER_COUNT_UPDATE';
	// key for save in storage
	BASIC_HEALTH_KEY_STORAGE_NAME = 'BASIC_HEALTH_DATA';
	MNEMONIC_PHRASE_STORAGE_NAME = 'MNEMONIC_PHRASE_STORAGE_KEY';
	RECEIVED_ONBOARDING_BONUS = 'RECEIVE_ONBOARDING_BONUS';
	ONBOARDING_TOKEN_KEY_NAME = 'ONBOARDING_TOKEN';
	PUB_HEALTH_REPORT_TEST_KEY_STORAGE_NAME = 'PUB_HEALTH_TEST_REPORT';
	PUB_HEALTH_DAILY_CHECK_KEY_STORAGE_NAME = 'PUB_HEALTH_DAILY_CHECK';
	PUB_HEALTH_REPORT_TEST_SENT_DATA_SUCCESS = 'SENT_DATA_SUCCESS_PUB_HEALTH_REPORT_TEST';
	PUB_HEALTH_DAILY_CHECK_SENT_DATA_SUCCESS = 'SENT_DATA_SUCCESS_PUB_HEALTH_DAILY_CHECK';
	EPHEMERAL_PRK_KEY_STORAGE_NAME = 'EPHEMERAL_PUB_KEY';
	PROVIDER_META_DATA_KEY_STORAGE_NAME = 'PROVIDER_META_DATA';

	TERM_OF_USE_URL = 'https://www.centiva.health/legal/terms-conditions';
	PRIVACY_POLICY_URL = 'https://www.centiva.health/legal/privacy-policy';
	FAQ = 'https://www.centiva.health/about/faq';

	WALLET_MODE_KEY_STORE = 'WALLET_MODE';
	PAGE_SIZE_ONBOARDING_BONUS = 25;

	PAGE_SIZE_APPROVEVAL_TXS = 100;
	PAGE_SIZE_QUERY_TXS = 100;
	PAGE_SIZE_DISPLAY_TXS = 20;

	NUMBER_LOAD_PAGE_SEEKER_APPROVED_TXS = 1;
	NUMBER_LOAD_PAGE_TXS_SINK_ADDRESS = 1;

	static K_MICROS_PER_UNIT = 1000 * 1000.0;
	static PLUS_NUMBER_WALLET = '1a2b3c4d5e6f7g8z4';
	static LOAD_PAGE = 1;
	static PROTOBUF_HEADER_LENGTH = 16;
	static BCRYPT_LOG_ROUNDS = 10;
	static KEY_SIZE = 32;
	static PUBKEY_ARGNAME = 'pubkey';
	static SIGNATURE_ARGNAME = 'signature';
	static AUTHTOKEN_ARGNAME = 'authtoken';
	static LANGUAGE_KEY = 'language';

	//
	TIME_OUT_ONBOARDING_REQUEST_MILLISECONDS = 10 * 1000;

	// Need to keep the store key name as com.fds.hit.<name> for legacy compatibility reasons
	static ONLY_SHOW_QUERIES_IN_SELECTED_LANGUAGE_STORE_KEY =
		'com.fds.hit.onlyShowQueriesInSelectedLanguage';
	static SEEKER_APPROVED = 1;
	static SEEKER_DISAPPROVED = 2;
	static displayWalleDetail: any = {
		showPassphrase: 0,
		showPrivateKey: 1
	};

	static PHYSICAL_ACTIVITY = {
		PHYSICAL_ACTIVITY_LOW: 1,
		PHYSICAL_ACTIVITY_OCCASIONAL_LIGHT: 2,
		PHYSICAL_ACTIVITY_REGULAR: 3,
		PHYSICAL_ACTIVITY_HIGH: 4
	};

	static MONTH_OF_BIRTH = {
		JANUARY: 1,
		FEBRUARY: 2,
		MARCH: 3,
		APRIL: 4,
		MAY: 5,
		JUNE: 6,
		JULY: 7,
		AUGUST: 8,
		SEPTEMBER: 9,
		OCTOBER: 10,
		NOVEMBER: 11,
		DECEMBER: 12
	};

	static SMOKER_STATUS = {
		SMOKER_STATUS_NONSMOKER: 1,
		SMOKER_STATUS_OCCASIONAL: 2,
		SMOKER_STATUS_REGULAR: 3,
		SMOKER_STATUS_HEAVY: 4
	};

	static GENDER = {
		FEMALE: BasicHealth.Gender.GENDER_FEMALE,
		MALE: BasicHealth.Gender.GENDER_MALE,
		OTHER: BasicHealth.Gender.GENDER_OTHER
	};

	static PRIVATE_KET_TEST = {
		PRIVATE_KEY_TESTNET_TEST:
			'df01beb3bb70c1213fc0e9d2af5ba2c76938038f0959b2aaf7ea91dfd8dc7844',
		PRIVATE_KEY_MAINNET_TEST:
			'8f2d964f3ce71af6060751e82413841d86a962a85ee5f1f200fbb92f5ce70f6c'
	};

	static BACK_UP_PHRASE_TEST = {
		BACKUP_PHRASE_TESTNET_TEST:
			'0fe353f83cac5379e59adbab1d37e27d8f314d3f9770507048525f67adb2ca4e95a303034b89195f9636b8a9cc9540ad4e7fe0844ec6edcc943e4e16c3fe2d184e070c2ceb9921816bc5ba11565d8d84ce29ea73d4b3930ae770ae7eefaa2fab173700559266ecf08a8839aa627fa451b34774f638f3880ce945b124805204a98bb907d5ae2d947d79b9c19640348b8cfe79e31a7831e10c749506997236caaa547267ba6d3b9ae2a6c6ed2ad47ab3d5a5325b1939700ec79ad95d7e845dd12f8ff46111389620399c8f023ab7f506828f05b2e086a5a97b56e38a5af0cef353adb89d1dbb35a2de44d22e64945f967581527ae59a8f593bd9ff747673199cef',
		BACKUP_PHRASE_MAINNET_TEST:
			'0fe353f83cac5379e59adbab1d37e27d8f314d3f9770507048525f67adb2ca4ecd6df1f94b0d0f6870714adcaedfdbfba09835d9e8280046c42bf4876e1f54157df7030235dd778f395a3d9dd04ebf3f437b28cca2b1f726effdf0a2329d373e180452e2f9ffaa24a4da1a1beda3df86af924220e5f73f1eebb5b94017adf3dce15c631c765d61766595fe8265a7cfb181dc24e0bacffd11b6d3be09a10b20b0fda11a9bfc717ea124cf4fe013f6d4283da401840d1ec2ef32f615f48fe7f2922244ca2f664e55d945d85d0db51aa3bce7eaf5edb75e444e8aaf767b91b632afb82f140f5bb89340362161de9a94477da956c803f6ddff6c619f303820a036d4'
	};

	static VERIFY_PHONE_TEST = {
		EN: '+44567856789',
		VI: '+84111222334'
	};

	static LANGUAGE_SUPPORT_LIST = [
		{
			// "name": "English",
			dial_code: '+44',
			code: 'en',
			alpha2Code: 'GB'
		},
		{
			// "name": "German",
			dial_code: '+49',
			code: 'de',
			alpha2Code: 'DE'
		},
		{
			// "name": "French",
			dial_code: '+33',
			code: 'fr',
			alpha2Code: 'FR'
		},
		{
			// "name": "Japanese",
			dial_code: '+81',
			code: 'ja',
			alpha2Code: 'JP'
		},
		{
			// "name": "Vietnamese",
			dial_code: '+84',
			code: 'vi',
			alpha2Code: 'VN'
		},
		{
			// "name": "Chinese",
			dial_code: '+86',
			code: 'zh',
			alpha2Code: 'CN'
		},
		{
			// "name": "Spanish",
			dial_code: '+34',
			code: 'es',
			alpha2Code: 'ES'
		},
		{
			// "name":"Ukraine",
			dial_code: '+380',
			code: 'uk',
			flag: 'ukr',
			alpha2Code: 'UA'
		},
		{
			dial_code: '+7',
			code: 'ru',
			alpha2Code: 'RU'
		}
	];

	// tslint:disable-next-line: member-ordering
	static NEM_NODE = {
		MAIN_NET: [
			{
				uri: 'http://hugealice.nem.ninja'
			},
			{
				uri: 'http://hugealice2.nem.ninja'
			},
			{
				uri: 'http://hugealice3.nem.ninja'
			},
			{
				uri: 'http://hugealice4.nem.ninja'
			},
			{
				uri: 'http://alice6.nem.ninja'
			},
			{
				uri: 'http://go.nem.ninja'
			},
			{
				uri: 'http://hachi.nem.ninja'
			},
			{
				uri: 'http://jusan.nem.ninja'
			}
		],
		TEST_NET: [
			{ uri: 'http://210.166.75.236' },
			{ uri: 'http://54.254.181.218' },
			{ uri: 'http://54.233.101.164' },
			{ uri: 'http://95.216.73.245' }
		]
	};
	static TX_FEE_CONFIG = {
		MinimumFee_factor: 0.05,
		MinimumFee_caped: 1.25,
		minimumTransferFee: 50000,
		maximumXemTransferFee: 1250000,
		transferFeeFactor: 50000,
		mosaicDivisibility: 6,
		mosaicSupply: 1000000000
	};

	static QR_SCAN_ERROR = {
		SERVER_ERROR: 1,
		THE_SAME_ID: 2,
		VERIFY_DATA_FALSE: 3,
		CONNECTION_ERROR: 4,
		VERIFY_DATA_AGAIN_FALSE: 5,
		GET_PROVIDER_META_SYNC_INTERVAL_DATA_FALSE: 6
	};

	static EMAIL_LOGIN_OPTION = {
		CREATE_NEW: '0',
		LOGIN_wITH_EXIST_EMAIL: '1'
	};

	static SIGN_UP_METHOD = {
		EMAIL: 1,
		PHONE: 2,
		ANONYMOUS: 3
	};

	static BRACKET_SIZE_YEAR = 10;
	static MAXIMUM_AGE = 110;

	static ONBOARDING_SENDER_NAME: string = 'HIT foundation';
	MNEMONIC_SALT: string = 'Centiva';
	PUB_HEALTH = 'pub_health';
	GEOAID_REQUEST = 'geoaid_request';
	GEOAID_SUBMIT = 'geoaid_submit';

	DEFAULT_WALLET_KEY = '123456789';

	WALLET_NAME = 'DHP';
	constructor() {}
}
