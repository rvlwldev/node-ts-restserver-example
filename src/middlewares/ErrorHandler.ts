import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';

import Exception from '@/domains/_common/exceptions/Exception';

export default function globalErrorHandler(error: Exception, req: Request, res: Response): void {
	res.status(error.status || HttpStatusCode.InternalServerError).json(error);
}
