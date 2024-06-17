import { User } from '@/domains/cug/users/Types';

declare module 'express-serve-static-core' {
	interface Request {
		user?: User | undefined;
	}
}
