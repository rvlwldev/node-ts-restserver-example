import 'reflect-metadata';

import PATH from 'path';
import { sync as glob } from 'glob';

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { ErrorHandler } from '@/middlewares/ErrorHandler';
import Authentication from '@/middlewares/Authorization';

export default async () => {
	useContainer(Container);

	const controllers: any[] = [];
	for (const path of glob('src/domains/**/*Controller.ts'))
		await import(PATH.resolve(path))
			.then((controller) => controller.default || controller)
			.then((controller) => controllers.push(controller));

	return createExpressServer({
		cors: false,
		controllers,
		middlewares: [Authentication, ErrorHandler], // 전역 미들웨어
		defaultErrorHandler: false
	});
};
