import 'reflect-metadata';

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { sync as glob } from 'glob';
import path from 'path';

// domains 디렉토리의 모든 컨트롤러를 등록합니다.
const controllers = glob('src/domains/**/*Controller.ts').map((controllerPath) => {
	const controllerModule = require(path.resolve(controllerPath));
	return controllerModule.default || controllerModule;
});

useContainer(Container);
const app = createExpressServer({
	controllers
});

export default app;
