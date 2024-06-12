import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'axios';

import Exception from '@common/exceptions/Exception';

export default function globalErrorHandler(error: Exception, req: Request, res: Response, next: NextFunction): void {
	res.status(error?.status || HttpStatusCode.InternalServerError).json(error);
}
