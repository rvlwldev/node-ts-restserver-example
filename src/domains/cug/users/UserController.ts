import 'reflect-metadata';
import { Post, BodyParam } from 'routing-controllers';
import { Inject } from 'typedi';

import RestController from '@/decorators/RestController';

import UserService from './UserService';

@RestController('/users')
export default class UserController {
	constructor(@Inject() private userService: UserService) {}

	@Post('/login')
	login(@BodyParam('id') id: string, @BodyParam('pw') pw: string) {
		return this.userService.login(id, pw);
	}
}
