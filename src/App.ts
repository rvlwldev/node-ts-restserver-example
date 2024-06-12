import env from '@/configurations/Environment';
import loader from '@/configurations/AppLoader';

import { Application } from 'express';
import bodyParser from 'body-parser';

import CUG from '@/databases/CUG';
import CPG from '@/databases/CPG';
import CCG from '@/databases/CCG';

loader().then(async (app: Application) => {
	app.use(bodyParser.json());

	const port = env.PORT || 3000;
	app.listen(port, async () => {
		await CUG.connect();
		await CPG.connect();
		await CCG.connect();

		console.info(`\nMode : ${process.env.NODE_ENV}`);
		console.info(`
    ######################################
        Server is running on port ${port}
    ######################################
    `);
	});
});
