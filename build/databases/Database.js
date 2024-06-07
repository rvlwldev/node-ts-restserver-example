"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(require("configurations/Env"));
const mysql2_1 = require("mysql2");
class IntranetDatabase {
    constructor(databaseName) {
        this.connected = false;
        this.isConnected = () => this.connected;
        this.databaseName = databaseName;
        this.pool = (0, mysql2_1.createPool)({
            host: Env_1.default.DATABASE_HOSTNAME,
            user: Env_1.default.DATABASE_USERNAME,
            password: Env_1.default.DATABASE_PASSWORD,
            database: databaseName
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.pool.promise().getConnection();
                yield this.pool
                    .promise()
                    .query(`SELECT VERSION() AS version`)
                    .then(([rows]) => {
                    console.log(`MySQL (version: ${rows[0].version}) database '${this.databaseName}' is connected`);
                    this.connected;
                });
                connection.release();
                return this;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`\nDatabase connection or query Error\n${error.message}\n`);
                }
                else {
                    console.error(`\nUnknown error occurred\n${error}\n`);
                }
                process.exit(1);
            }
        });
    }
    selectOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.promise().query(query);
        });
    }
    select() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    insertOne() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    updateOne() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    upsertOne() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    upsert() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteOne() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = IntranetDatabase;
//# sourceMappingURL=Database.js.map