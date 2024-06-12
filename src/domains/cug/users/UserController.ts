import 'reflect-metadata';

import { RestController, Post, Body, NotNull, Status, Inject } from '@/decorators';

import UserService from '@/domains/cug/users/UserService';

@RestController('/users')
export default class UserController {
	constructor(@Inject() private userService: UserService) {}

	@Post('/login')
	@Status(200)
	async login(@Body('id') @NotNull('아이디') id: string, @Body('pw') @NotNull('비밀번호') pw: string) {
		return { user: await this.userService.login(id, pw) };
	}
}
