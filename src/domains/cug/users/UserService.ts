import { Inject, Service } from 'typedi';
import { User } from './Types';

import UserModel from './UserRepository';
import Exception from '@/domains/_common/exceptions/Exception';

@Service()
export default class UserService {
	constructor(@Inject() private model: UserModel) {}

	async login(id: string, pw: string): Promise<User> {
		return await this.model.findUserWithPassword(id, pw).then((users) => {
			if (users?.length !== 1 || users === null) throw new Exception(500, '올바르지 않은 사용자 데이터 입니다.');
			return users[0];
		});
	}
}
