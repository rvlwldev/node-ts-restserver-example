import 'reflect-metadata';
import { JsonController, Post, BodyParam } from 'routing-controllers';

@JsonController('/users')
export default class UserController {
	@Post('/login')
	login(@BodyParam('id') id: string, @BodyParam('pw') pw: string) {
		return { test: 'test', id: id, pw: pw };
	}
}
