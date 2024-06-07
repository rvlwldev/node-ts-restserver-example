import env from 'configurations/Env';
import express, { Request, Response } from 'express';

import CUG from 'databases/CUG';
import CPG from 'databases/CPG';
import CCG from 'databases/CCG';

const app = express();
const port = env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(port, async () => {
	await CUG.connect();
	await CPG.connect();
	await CCG.connect();

	console.info(`
    ######################################
        Server is running on port ${port}
    ######################################
    `);
	console.info(`\nMode : ${process.env.NODE_ENV}`);
});
