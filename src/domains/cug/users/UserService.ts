import { Inject, Service } from 'typedi';
import { User } from './Types';

import UserModel from './UserRepository';

@Service()
export default class UserService {
	constructor(@Inject() private model: UserModel) {}

	async login(id: string, pw: string): Promise<User> {
		return await this.model.findUserWithPassword(id, pw);
	}
}
