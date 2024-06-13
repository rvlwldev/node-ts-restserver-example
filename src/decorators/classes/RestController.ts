import 'reflect-metadata';

import { JsonController } from 'routing-controllers';
import { Service } from 'typedi';

import { ParameterRequiredException } from '@common/exceptions/ParameterRequiredException';

function checkNotNullParameter(target: any) {
	const isNull = (params: any[], index: number) =>
		params[index] == null || params[index] === '' || params[index] === undefined;

	Object.getOwnPropertyNames(target.prototype)
		.filter((name) => name !== 'constructor')
		.filter((name) => typeof target.prototype[name] === 'function')
		.map((name) => target.prototype[name])
		.map((methodObject) => {
			const NotNullParameterMap: Map<number, string> =
				Reflect.getOwnMetadata('required_parameters', target.prototype, methodObject.name) ||
				new Map<number, string>();

			const declaredMethod = target.prototype[methodObject.name];

			target.prototype[methodObject.name] = function (...params: any[]) {
				const NULLS: any[] = [];

				for (const index of Array.from(NotNullParameterMap.keys()).sort())
					if (isNull(params, index)) NULLS.push(NotNullParameterMap.get(index));
				if (NULLS.length) throw new ParameterRequiredException(...NULLS);

				return declaredMethod.apply(this, params);
			};
		});
}

export default function RestController(baseRoute: string): ClassDecorator {
	return function (target: any) {
		Service()(target);
		JsonController(baseRoute)(target);
		checkNotNullParameter(target);
	};
}
