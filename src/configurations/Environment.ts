import env from 'dotenv';

interface EnvConfig {
	PORT: string;
	DATABASE_HOSTNAME: string;
	DATABASE_USERNAME: string;
	DATABASE_PASSWORD: string;
	CONNECTION_LIMIT: string;
	DATABASE_MAIN: string;
	DATABASE_CUG: string;
	DATABASE_CPG: string;
	DATABASE_CCG: string;
	JWT_SECRET_KEY: string;
}

switch (process.env.NODE_ENV) {
	case 'development':
		env.config({ path: '.env.development' });
		break;
	case 'localhost':
		env.config({ path: '.env.localhost' });
		break;
	case 'production':
		env.config({ path: '.env.production' });
		break;
	default:
		console.error('올바른 .env 파일을 찾을 수 없습니다.');
		console.error('Cannot find proper .env files');
		process.exit(1);
}

const environments: EnvConfig = {
	PORT: process.env.PORT || '',
	DATABASE_HOSTNAME: process.env.DATABASE_HOSTNAME || '',
	DATABASE_USERNAME: process.env.DATABASE_USERNAME || '',
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
	CONNECTION_LIMIT: process.env.CONNECTION_LIMIT || '',
	DATABASE_MAIN: process.env.DATABASE_MAIN || '',
	DATABASE_CUG: process.env.DATABASE_CUG || '',
	DATABASE_CPG: process.env.DATABASE_CPG || '',
	DATABASE_CCG: process.env.DATABASE_CCG || '',
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ''
};

export default environments;
