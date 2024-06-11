export default class Exception extends Error {
	error: boolean = true;
	status: number;

	constructor(status: number, message: string) {
		super(message);
		delete this.stack;
		this.status = status;
	}
}
