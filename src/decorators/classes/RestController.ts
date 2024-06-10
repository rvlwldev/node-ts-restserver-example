import { JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import Exception from '@/domains/_common/exceptions/Exception';

export default function RestController(baseRoute: string): ClassDecorator {
	return function (target: any) {
		Service()(target);
		JsonController(baseRoute)(target);

		const methodNames = Object.getOwnPropertyNames(target.prototype).filter(
			(name) => name !== 'constructor' && typeof target.prototype[name] === 'function'
		);

		methodNames.forEach((methodName) => {
			const method = target.prototype[methodName];

			target.prototype[methodName] = function (...args: any[]) {
				for (const index of Reflect.getOwnMetadata(
					'required_parameters_indexes',
					target.prototype,
					methodName
				) || [])
					if (args[index] == null || args[index] === '' || args[index] === undefined)
						throw new Exception(400, `필수값이 입력되지 않았습니다.`);

				// 원래 메소드 실행
				return method.apply(this, args);
			};
		});
	};
}
