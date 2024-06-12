import Exception from '@common/exceptions/Exception';

import { HttpStatusCode } from 'axios';

export class BadRequestException extends Exception {
	constructor(message: string = '필수값이 입력되지 않았습니다.') {
		super(HttpStatusCode.BadRequest, message);
	}
}

export class UserNotFoundException extends Exception {
	constructor(message: string = '아이디가 존재하지 않습니다.') {
		super(HttpStatusCode.NotFound, message);
	}
}

export class UnauthorizedException extends Exception {
	constructor(message: string = '비밀번호가 올바르지 않습니다.') {
		super(HttpStatusCode.Unauthorized, message);
	}
}
