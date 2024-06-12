import Exception from '@common/exceptions/Exception';
import { HttpStatusCode } from 'axios';

export class ParameterRequiredException extends Exception {
	constructor(...propertyNames: string[]) {
		const propertiesString = propertyNames.join(', ');
		const message = `필수 값이 입력되지 않았습니다. (${propertiesString})`;
		super(HttpStatusCode.BadRequest, message);
	}
}
