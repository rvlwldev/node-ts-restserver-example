const MetaDataKey = 'required_parameters_indexes';

export default function NotNull(): ParameterDecorator {
	return function (method: Object, methodName: string | symbol | undefined, parameterIndex: number) {
		if (methodName === undefined) return;

		methodName = methodName.toString();
		const indexes: number[] = Reflect.getOwnMetadata(MetaDataKey, method, methodName) || [];
		indexes.push(parameterIndex);

		Reflect.defineMetadata(MetaDataKey, indexes, method, methodName);
	};
}
