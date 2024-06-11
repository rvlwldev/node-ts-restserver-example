import { Service } from 'typedi';

@Service()
export default class UserService {
	login(id: string, pw: string): { id: string; pw: string; test: string } {
		return { id, pw, test: 'service test' };
	}
}
