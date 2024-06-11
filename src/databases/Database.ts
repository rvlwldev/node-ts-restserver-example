import env from '@/configurations/Environment';

import { createPool, Pool, ResultSetHeader } from 'mysql2';

import { SelectResult, InsertResult, UpdateResult, DeleteResult } from '@/databases/Types';

interface Version extends SelectResult {
	version: string;
	type: string;
}

// TODO : 메소드별 Error 상세화
export default abstract class IntranetDatabase {
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

			await this.select<Version>(`SELECT VERSION() AS version`)
				.then((result) => result[0].version)
				.then((version) => `MySQL (version: ${version})`)
				.then((message) => `${message} database '${this.databaseName}' is connected`)
				.then(console.info);

			connection.release();
			return this;
		} catch (error) {
			if (error instanceof Error) {
				console.error(`\nDatabase connection Error\n${error.message}\n`);
				console.log(error);
			} else {
				console.error(`\nUnknown error occurred\n${error}\n`);
			}
			process.exit(1);
		}
	}

	private replaceEmptyToNull<T extends SelectResult>(obj: T) {
		Object.getOwnPropertyNames(obj).forEach((property) => {
			const key = property as keyof T;
			if (obj[key] === '') obj[key] = null as any;
		});
		return obj as T;
	}

	public async select<T extends SelectResult>(sql: string, values?: any): Promise<T[]> {
		return this.pool
			.promise()
			.query(sql, values)
			.then(([rows]) => rows as T[])
			.then((result) => result.map((res) => this.replaceEmptyToNull<T>(res)));
	}

	public async insert(sql: string, values?: any): Promise<InsertResult> {
		return this.pool
			.promise()
			.query(sql, values)
			.then(
				([res]) =>
					({
						insertedRowsCount: (res as ResultSetHeader).affectedRows || 0
					}) as InsertResult
			);
	}

	public async update(sql: string, values?: any): Promise<UpdateResult> {
		return this.pool
			.promise()
			.query(sql, values)
			.then(
				([res]) =>
					({
						updatedRowsCount: (res as ResultSetHeader).affectedRows || 0
					}) as UpdateResult
			);
	}

	public async delete(sql: string, values?: any): Promise<DeleteResult> {
		return this.pool
			.promise()
			.query(sql, values)
			.then(
				([res]) =>
					({
						deletedRowsCount: (res as ResultSetHeader).affectedRows || 0
					}) as DeleteResult
			);
	}

	/**
	 * @description 비추천 ...
	 *
	 */
	public async query<T>(sql: string, values?: any): Promise<T[] | InsertResult | UpdateResult | DeleteResult> {
		const [result] = await this.pool.promise().query(sql, values);

		// SELECT
		if (Array.isArray(result)) return result as T[];

		// INSERT
		if ((result as ResultSetHeader).insertId)
			return {
				insertedRowsCount: (result as ResultSetHeader).affectedRows || 0
			} as InsertResult;

		// UPDATE
		if ((result as ResultSetHeader).affectedRows && (result as ResultSetHeader).warningStatus) {
			return {
				updatedRowsCount: (result as ResultSetHeader).affectedRows || 0
			} as UpdateResult;
		}

		// DELETE
		if ((result as ResultSetHeader).affectedRows)
			return {
				deletedRowsCount: (result as ResultSetHeader).affectedRows || 0
			} as DeleteResult;

		throw new Error('Unknown query result type');
	}
}
