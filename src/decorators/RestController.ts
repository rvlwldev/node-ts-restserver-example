import { JsonController } from 'routing-controllers';
import { Service } from 'typedi';

export default function RestController(baseRoute: string): ClassDecorator {
	return function (target: any) {
		Service()(target);
		JsonController(baseRoute)(target);
	};
}
