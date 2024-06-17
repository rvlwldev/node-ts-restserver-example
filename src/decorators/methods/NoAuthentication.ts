import Authentication from '@/middlewares/Authorization';

import 'reflect-metadata';

/**
 * @function NoAuthentication
 * @description 해당 메서드에서 토큰값(로그인여부) 검사하지 않도록 설정
 *
 * @remarks
 * 이 데코레이터는 최종 URL세그먼트를 `Authentication.NoAuthenticateMethodNames` 배열에 추가합니다.
 * 같은 세그먼트를 사용하는 경우에도 토큰 검사를 하지 않을 수 있습니다.
 */
export default function NoAuthentication(): MethodDecorator {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
		Authentication.NoAuthenticateMethodNames.push(`${String(propertyKey)}`);
	};
}
