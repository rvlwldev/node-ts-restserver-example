import 'reflect-metadata';

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import PATH from 'path';
import { sync as glob } from 'glob';

export default async () => {
	useContainer(Container);

	const controllers: any[] = [];

	const PATTERN = 'src/domains/**/*Controller.ts';
	for (const path of glob(PATTERN))
		await import(PATH.resolve(path))
			.then((controller) => controller.default || controller)
			.then((controller) => controllers.push(controller));

	return createExpressServer({ controllers });
};
