import environments from '@/configurations/Environment';

import { JsonWebTokenError, JwtPayload, Secret, sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { User } from '@/domains/cug/users/Types';
import Exception from '@/domains/_common/exceptions/Exception';
import { HttpStatusCode } from 'axios';

class JsonWebTokenFactory {
	private secretKey: Secret;

	constructor() {
		this.secretKey = environments.JWT_SECRET_KEY;
	}

	public generate(user: User) {
		return sign(user, this.secretKey, {
			algorithm: 'HS256',
			issuer: 'ICOOP-INTRANET',
			expiresIn: '9h'
		});
	}

	public verify(token: string): User | undefined {
		try {
			return verify(token, this.secretKey) as JwtPayload & User;
		} catch (err) {
			if (err instanceof TokenExpiredError)
				throw new Exception(HttpStatusCode.Forbidden, '인증 시간이 지났습니다. 다시 로그인해 주세요.');
			if (err instanceof JsonWebTokenError)
				throw new Exception(HttpStatusCode.Unauthorized, '잘못된 인증정보 입니다.');
		}
	}
}

export default new JsonWebTokenFactory();
