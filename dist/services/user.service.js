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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const responses_1 = require("../responses");
const api_response_1 = require("../responses/api.response");
const index_1 = require("../entities/dto/index");
const pagination_1 = require("../entities/interfaces/pagination");
const pagination_2 = require("../entities/pagination");
const index_2 = require("./index");
const index_3 = require("../entities/index");
const update_password_dto_1 = require("../entities/dto/update-password.dto");
const index_4 = require("../repositories/index");
const fs_1 = require("fs");
let UserService = class UserService {
    constructor(userRepository, roleRepository, photoRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.photoRepository = photoRepository;
    }
    async getAll(identification, pagination) {
        if (!pagination_2.PaginationVerifier.verifyIPagination(pagination))
            return responses_1.ApiResponse.paginationWithDatesNotProvidedError();
        const result = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.rol', 'role')
            .leftJoinAndSelect('user.photo', 'photo')
            .where('user.created_at >= :start AND user.created_at <= :end AND user.identification != :identification AND user.role_id = 1', {
            start: pagination.start,
            end: pagination.end,
            identification: identification,
        })
            .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
            .take(pagination.pageElements)
            .orderBy('user.createdAt', 'DESC')
            .getManyAndCount();
        if (!result.length)
            new responses_1.ApiResponse(false, responses_1.ERROR.USERS_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.USERS_FOUND, new api_response_1.ApiResponseRecords(result, pagination));
    }
    async findById(identification) {
        const user = await this.userRepository.findOne({
            identification: identification,
        }, { relations: ['rol', 'photo'] });
        if (!user)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.USER_FOUND, user);
    }
    async getByIdentification(identification) {
        return await this.userRepository.findOne({
            identification: identification,
        });
    }
    async getByEmail(email) {
        return await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .leftJoinAndSelect('user.rol', 'role')
            .where('user.email = :email', { email: email })
            .getOne();
    }
    async ifExistById(identification) {
        const user = await this.userRepository.findOne({
            identification: identification,
        });
        return user ? true : false;
    }
    async ifExistByEmail(email) {
        const user = await this.userRepository.findOne({
            email: email,
        });
        return user ? true : false;
    }
    async create(dto) {
        if (await this.ifExistById(dto.identification))
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_EXIST);
        if (await this.ifExistByEmail(dto.email))
            return new responses_1.ApiResponse(false, responses_1.ERROR.EMAIL_EXIST);
        const role = await this.roleRepository.findOne({ id: dto.role_id });
        if (!role)
            return new responses_1.ApiResponse(false, responses_1.ERROR.ROLE_NOT_FOUND);
        const user = await this.userRepository.create(dto);
        user.rol = dto.role_id;
        await user.save();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.USER_CREATED);
    }
    removeExtensionFromFile(filename) {
        const parts = filename.split('.');
        const ext = `.${parts[1]}`;
        const response = filename.replace(ext, '');
        return response;
    }
    async createAvatar(identification, filename, filePath) {
        const user = await this.userRepository.findOne({
            identification: identification,
        });
        if (!user)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        let actualDate = new Date().toISOString();
        actualDate = actualDate.slice(0, actualDate.length - 5);
        let id = `${actualDate}-${filename}`;
        id = this.removeExtensionFromFile(id);
        let folder = 'avatars';
        const uploadedFile = await index_2.Cloudinary.uploadFile(filePath, folder, id);
        if (uploadedFile) {
            fs_1.unlinkSync(filePath);
            const photo = this.photoRepository.create({
                url: uploadedFile.secure_url,
                default: true,
            });
            const avatar = await this.photoRepository.save(photo);
            user.photo = avatar.id;
            user.save();
            return new responses_1.ApiResponse(true, responses_1.SUCCESS.PHOTO_CREATED, avatar);
        }
        else {
            return new responses_1.ApiResponse(false, responses_1.ERROR.FILE_WAS_NOT_UPLOADED);
        }
    }
    async update(identification, dto) {
        const user = await this.userRepository.findOne({
            identification: identification,
        });
        if (!user)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        const result = await this.userRepository.update({ identification: identification }, dto);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.USER_UPDATED, result);
    }
    async updatePassword(identification, password) {
        const user = await this.userRepository.findOne({
            identification: identification,
        });
        if (!user)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        const result = await this.userRepository.update({ identification: identification }, password);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.PASSWORD_UPDATED, result);
    }
    async delete(id) {
        const user = await this.userRepository.findOne({
            id: id,
        });
        if (!user)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        this.userRepository
            .createQueryBuilder()
            .delete()
            .from(index_3.UserEntity)
            .where('id = :id', {
            id: id,
        })
            .execute();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.USER_DELETED);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(index_3.UserEntity)),
    __param(1, typeorm_1.InjectRepository(index_3.RoleEntity)),
    __param(2, typeorm_1.InjectRepository(index_3.PhotoEntity)),
    __metadata("design:paramtypes", [index_4.UserRepository,
        index_4.RoleRepository,
        index_4.PhotoRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map