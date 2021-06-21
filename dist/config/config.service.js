"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const fs = require("fs");
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor() {
        const env = process.env.NODE_ENV.trim().toLowerCase();
        const envFilePath = __dirname + `/../../.env`;
        if (this.existsPath(env, envFilePath))
            this.envConfig = dotenv_1.parse(fs.readFileSync(envFilePath));
        else
            this.envConfig = { PORT: process.env.PORT };
    }
    get(key) {
        return this.envConfig[key];
    }
    existsPath(env, path) {
        const existsPath = fs.existsSync(path);
        if (!existsPath)
            console.log(`${env}.env file does not exist`);
        return existsPath;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map