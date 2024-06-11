import 'reflect-metadata';

import { RestController, Post, BodyParam, NotNull, Inject } from '@/decorators';

import UserService from './UserService';

@RestController('/users')
export default class UserController {
	constructor(@Inject() private userService: UserService) {}

	@Post('/login')
	async login(
		@BodyParam('id') @NotNull() id: string, // user id
		@BodyParam('pw') @NotNull() pw: string // user password
	) {
		const user = await this.userService.login(id, pw);
		return { user };
	}
}
