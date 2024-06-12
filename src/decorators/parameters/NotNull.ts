const MetaDataKey: string = 'required_parameters';

export default function NotNull(parameterName: string): ParameterDecorator {
	return function (method: object, methodName: string | symbol | undefined, parameterIndex: number): void {
		if (methodName === undefined) return;

		const parameterMap: Map<number, string> =
			Reflect.getOwnMetadata(MetaDataKey, method, methodName) || new Map<number, string>();
		parameterMap.set(parameterIndex, parameterName);

		Reflect.defineMetadata(MetaDataKey, parameterMap, method, methodName);
	};
}
