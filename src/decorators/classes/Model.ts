import { Service } from 'typedi';

export default function Model(): ClassDecorator {
	return function (target: any) {
		Service()(target);
	};
}
