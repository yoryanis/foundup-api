"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt = require("jsonwebtoken");
const config_service_1 = require("../config/config.service");
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const user_service_1 = require("./user.service");
const responses_1 = require("../responses");
const constant_1 = require("../config/constant");
let AuthService = class AuthService {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    createToken(user) {
        const expiresIn = 86400;
        const accessToken = jwt.sign(Object.assign({}, user), this.configService.get(constant_1.Configuration.JWT_ENCRYPTION), { expiresIn });
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.USER_LOGIN, {
            expiresIn,
            accessToken,
        });
    }
    async validateUserToken(payload) {
        return await this.userService.getByIdentification(payload.identification);
    }
    async validateUser(email, password) {
        const user = await this.userService.getByEmail(email);
        if (user && (await user.comparePassword(password))) {
            const { password } = user, result = __rest(user, ["password"]);
            return new responses_1.ApiResponse(true, responses_1.SUCCESS.USER_VALIDATE, result);
        }
        return null;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_service_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map