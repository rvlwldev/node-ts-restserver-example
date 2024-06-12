import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

import Exception from '@/domains/_common/exceptions/Exception';
import { Service } from 'typedi';
import { HttpStatusCode } from 'axios';

@Service()
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
	error(err: any, req: any, res: any, next: (err?: any) => any): void {
		if (err instanceof Exception)
			res.status(err.status).json({
				error: true,
				message: err.message
			});
		else
			res.status(HttpStatusCode.InternalServerError).json({
				error: true,
				message: '알 수 없는 오류가 발생했습니다.'
			});
	}

	return;
}
