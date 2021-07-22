// import * as CryptoJS from 'crypto-js';
// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

// export class AddressValue {
// 	public static isValid = function(_address) {
// 		if (!_address && _address != '') {
// 			return false;
// 		}
// 		let address = _address
// 			.toString()
// 			.toUpperCase()
// 			.replace(/-/g, '');
// 		if (!address || address.length !== 40) {
// 			return false;
// 		}
// 		let decoded = this.ua2hex(this.b32decode(address));
// 		let versionPrefixedRipemd160Hash = CryptoJS.enc.Hex.parse(decoded.slice(0, 42));
// 		let tempHash = CryptoJS.SHA3(versionPrefixedRipemd160Hash, {
// 			outputLength: 256
// 		});
// 		let stepThreeChecksum = CryptoJS.enc.Hex.stringify(tempHash).substr(0, 8);

// 		return stepThreeChecksum === decoded.slice(42);
// 	};
// 	public static b32encode(s) {
// 		let parts = [];
// 		let quanta = Math.floor(s.length / 5);
// 		let leftover = s.length % 5;

// 		if (leftover != 0) {
// 			for (let i = 0; i < 5 - leftover; i++) {
// 				s += '\x00';
// 			}
// 			quanta += 1;
// 		}

// 		for (let i = 0; i < quanta; i++) {
// 			parts.push(alphabet.charAt(s.charCodeAt(i * 5) >> 3));
// 			parts.push(
// 				alphabet.charAt(
// 					((s.charCodeAt(i * 5) & 0x07) << 2) | (s.charCodeAt(i * 5 + 1) >> 6)
// 				)
// 			);
// 			parts.push(alphabet.charAt((s.charCodeAt(i * 5 + 1) & 0x3f) >> 1));
// 			parts.push(
// 				alphabet.charAt(
// 					((s.charCodeAt(i * 5 + 1) & 0x01) << 4) | (s.charCodeAt(i * 5 + 2) >> 4)
// 				)
// 			);
// 			parts.push(
// 				alphabet.charAt(
// 					((s.charCodeAt(i * 5 + 2) & 0x0f) << 1) | (s.charCodeAt(i * 5 + 3) >> 7)
// 				)
// 			);
// 			parts.push(alphabet.charAt((s.charCodeAt(i * 5 + 3) & 0x7f) >> 2));
// 			parts.push(
// 				alphabet.charAt(
// 					((s.charCodeAt(i * 5 + 3) & 0x03) << 3) | (s.charCodeAt(i * 5 + 4) >> 5)
// 				)
// 			);
// 			parts.push(alphabet.charAt(s.charCodeAt(i * 5 + 4) & 0x1f));
// 		}

// 		let replace = 0;
// 		if (leftover == 1) replace = 6;
// 		else if (leftover == 2) replace = 4;
// 		else if (leftover == 3) replace = 3;
// 		else if (leftover == 4) replace = 1;

// 		for (let i = 0; i < replace; i++) parts.pop();
// 		for (let i = 0; i < replace; i++) parts.push('=');

// 		return parts.join('');
// 	}

// 	public static b32decode = function(s) {
// 		let r = new ArrayBuffer((s.length * 5) / 8);
// 		let b = new Uint8Array(r);
// 		for (let j = 0; j < s.length / 8; j++) {
// 			let v = [0, 0, 0, 0, 0, 0, 0, 0];
// 			for (let i = 0; i < 8; ++i) {
// 				v[i] = alphabet.indexOf(s[j * 8 + i]);
// 			}
// 			let i = 0;
// 			b[j * 5 + 0] = (v[i + 0] << 3) | (v[i + 1] >> 2);
// 			b[j * 5 + 1] = ((v[i + 1] & 0x3) << 6) | (v[i + 2] << 1) | (v[i + 3] >> 4);
// 			b[j * 5 + 2] = ((v[i + 3] & 0xf) << 4) | (v[i + 4] >> 1);
// 			b[j * 5 + 3] = ((v[i + 4] & 0x1) << 7) | (v[i + 5] << 2) | (v[i + 6] >> 3);
// 			b[j * 5 + 4] = ((v[i + 6] & 0x7) << 5) | v[i + 7];
// 		}
// 		return b;
// 	};

// 	public static ua2hex = function(ua) {
// 		const _hexEncodeArray = [
// 			'0',
// 			'1',
// 			'2',
// 			'3',
// 			'4',
// 			'5',
// 			'6',
// 			'7',
// 			'8',
// 			'9',
// 			'a',
// 			'b',
// 			'c',
// 			'd',
// 			'e',
// 			'f'
// 		];
// 		let s = '';
// 		for (let i = 0; i < ua.length; i++) {
// 			let code = ua[i];
// 			s += _hexEncodeArray[code >>> 4];
// 			s += _hexEncodeArray[code & 0x0f];
// 		}
// 		return s;
// 	};
// }
