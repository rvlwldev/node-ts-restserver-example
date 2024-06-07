"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
switch (process.env.NODE_ENV) {
    case 'DEVELOPMENT':
        dotenv_1.default.config({ path: '.env.development' });
        break;
    case 'LOCALHOST':
        dotenv_1.default.config({ path: '.env.localhost' });
        break;
    case 'PRODUCTION':
        dotenv_1.default.config({ path: '.env.production' });
        break;
    default:
        console.error('올바른 .env 파일을 찾을 수 없습니다.');
        console.error('Cannot find proper .env files');
        process.exit(1);
}
const environmentVariables = {
    PORT: process.env.PORT || '',
    DATABASE_HOSTNAME: process.env.DATABASE_HOSTNAME || '',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    CONNECTION_LIMIT: process.env.CONNECTION_LIMIT || '',
    DATABASE_MAIN: process.env.DATABASE_MAIN || '',
    DATABASE_CUG: process.env.DATABASE_CUG || '',
    DATABASE_CPG: process.env.DATABASE_CPG || '',
    DATABASE_CCG: process.env.DATABASE_CCG || ''
};
exports.default = environmentVariables;
//# sourceMappingURL=Env.js.map