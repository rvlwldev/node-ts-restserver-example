import env from 'configurations/Env';
import { createPool, Pool, RowDataPacket } from 'mysql2';

export default class IntranetDatabase {
	private databaseName: string;
	private pool: Pool;

	private connected = false;
	readonly isConnected = () => this.connected;

	constructor(databaseName: string) {
		this.databaseName = databaseName;

		this.pool = createPool({
			host: env.DATABASE_HOSTNAME,
			user: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD,
			database: databaseName
		});
	}

	protected async initialize() {
		try {
			const connection = await this.pool.promise().getConnection();

			await this.pool
				.promise()
				.query<RowDataPacket[]>(`SELECT VERSION() AS version`)
				.then(([rows]) => {
					console.log(`MySQL (version: ${rows[0].version}) database '${this.databaseName}' is connected`);
					this.connected;
				});

			connection.release();

			return this;
		} catch (error) {
			if (error instanceof Error) {
				console.error(`\nDatabase connection or query Error\n${error.message}\n`);
			} else {
				console.error(`\nUnknown error occurred\n${error}\n`);
			}
			process.exit(1);
		}
	}

	async selectOne(query: string) {
		return this.pool.promise().query(query);
	}
	async select() {}

	async insertOne() {}
	async insert() {}

	async updateOne() {}
	async update() {}

	async upsertOne() {}
	async upsert() {}

	async deleteOne() {}
	async delete() {}
}
