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
const express_1 = __importDefault(require("express"));
const CUG_1 = __importDefault(require("databases/CUG"));
const CPG_1 = __importDefault(require("databases/CPG"));
const CCG_1 = __importDefault(require("databases/CCG"));
const app = (0, express_1.default)();
const port = Env_1.default.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield CUG_1.default.connect();
    yield CPG_1.default.connect();
    yield CCG_1.default.connect();
    console.info(`
    ######################################
        Server is running on port ${port}
    ######################################
    `);
    console.info(`\nMode : ${process.env.NODE_ENV}`);
}));
//# sourceMappingURL=App.js.map