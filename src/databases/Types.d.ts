import { RowDataPacket } from 'mysql2';

export interface SelectResult extends RowDataPacket {}

export interface InsertResult {
	insertedRowsCount: number;
}

export interface UpdateResult {
	updatedRowsCount: number;
}

export interface DeleteResult {
	deletedRowsCount: number;
}
