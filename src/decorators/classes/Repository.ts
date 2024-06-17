import { Service } from 'typedi';

export default function Repository(): ClassDecorator {
	return function (target: any) {
		Service()(target);
	};
}
