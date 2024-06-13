import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { User } from '@/domains/cug/users/Types';
import { Service, Middleware } from 'decorators';

import Exception from '@/domains/_common/exceptions/Exception';
import JWT from '@/utils/JWT';

import { HttpStatusCode } from 'axios';

function checkNoAuthenticate(req: Request) {
	let path: string | string[] = req.path.split('/');
	path = path[path.length - 1];

	return Authentication.NoAuthenticateMethodNames.indexOf(path) > -1;
}

@Service()
@Middleware({ type: 'before' })
export default class Authentication implements ExpressMiddlewareInterface {
	public static NoAuthenticateMethodNames: string[] = [];

	use(req: Request, res: Response, next: NextFunction) {
		try {
			if (checkNoAuthenticate(req)) return next();

			const authentication = req.headers['Authentication'];
			if (authentication === undefined)
				throw new Exception(HttpStatusCode.Unauthorized, '인증정보를 확인할 수 없습니다.');

			const token = Array.isArray(authentication) ? authentication[0] : authentication;
			const user: User | undefined = JWT.verify(token);
			req.user = user;

			next();
		} catch (err: any) {
			if (err instanceof Exception) next(err);
			else next(new Exception(HttpStatusCode.InternalServerError, err.message));
		}
	}
}
