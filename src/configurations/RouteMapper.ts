import { createExpressServer } from 'routing-controllers';

import UserController from 'controllers/cug/User';

const app = createExpressServer({
	controllers: [UserController]
});

export default app;
