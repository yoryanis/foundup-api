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
exports.AccessoryService = void 0;
const QRCode = require("qrcode");
const config_service_1 = require("../config/config.service");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const responses_1 = require("../responses");
const api_response_1 = require("../responses/api.response");
const pagination_1 = require("../entities/interfaces/pagination");
const state_accessory_enum_1 = require("../entities/enum/state-accessory.enum");
const constant_1 = require("../config/constant");
const index_1 = require("./index");
let AccessoryService = class AccessoryService {
    constructor(accessoryRepository, commentRepository, userRepository, categoryRepository, configService, photoService, photoRepository) {
        this.accessoryRepository = accessoryRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.configService = configService;
        this.photoService = photoService;
        this.photoRepository = photoRepository;
    }
    async ifExistByName(name, id) {
        const accessory = await this.accessoryRepository
            .createQueryBuilder('accessory')
            .leftJoinAndSelect(entities_1.CommentEntity, 'comment', 'comment.accessory_id = accessory.id')
            .leftJoinAndSelect(entities_1.UserEntity, 'user', 'comment.user_owner = user.id')
            .where('accessory.name = :name AND user.id = :id', {
            name: name,
            id: id,
        })
            .getOne();
        return accessory ? true : false;
    }
    async generateQR(unique) {
        const urlHost = await this.configService.get(constant_1.Configuration.URL_HOST);
        const url = `${urlHost}/preview/${unique}`;
        return QRCode.toDataURL(url);
    }
    async create(id, dto) {
        if (await this.ifExistByName(dto.name, id))
            return new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORY_EXIST);
        const category = await this.categoryRepository.findOne({
            id: dto.category_id,
        });
        if (!category)
            return new responses_1.ApiResponse(false, responses_1.ERROR.CATEGORY_NOT_FOUND);
        if (!Object.values(state_accessory_enum_1.States).includes(dto.state))
            return new responses_1.ApiResponse(false, responses_1.ERROR.STATE_ACCESSORY);
        const user = await this.userRepository.findOne({
            id: id,
        });
        if (!user)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        const uuid = uuid_1.v4();
        const regex = /-/gi;
        const unique_identifier = uuid.replace(regex, '');
        const qr = await this.generateQR(unique_identifier);
        if (await this.accessoryRepository.findOne({ qr: qr }))
            return new responses_1.ApiResponse(false, responses_1.ERROR.QR_EXIST);
        const accessory = await this.accessoryRepository.create(dto);
        accessory.category = dto.category_id;
        accessory.id_unique = unique_identifier;
        accessory.qr = qr;
        await accessory.save();
        const comment = new entities_1.CommentEntity();
        comment.userOwner = user.id;
        comment.accessory = accessory.id;
        await comment.save();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.ACCESSORY_CREATED, {
            accessory,
            comment,
        });
    }
    removeExtensionFromFile(filename) {
        const parts = filename.split('.');
        const ext = `.${parts[1]}`;
        const response = filename.replace(ext, '');
        return response;
    }
    async createEvidences(id_unique, filename, filePath) {
        const accessory = await this.accessoryRepository.findOne({
            id_unique: id_unique,
        });
        if (!accessory)
            return new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORY_NOT_FOUND);
        let actualDate = new Date().toISOString();
        actualDate = actualDate.slice(0, actualDate.length - 5);
        let id = `${actualDate}-${filename}`;
        id = this.removeExtensionFromFile(id);
        let folder = 'evidences';
        const uploadedFile = await index_1.Cloudinary.uploadFile(filePath, folder, id);
        if (uploadedFile) {
            fs_1.unlinkSync(filePath);
            const photo = this.photoRepository.create({
                url: uploadedFile.secure_url,
                default: true,
            });
            const evidence = await this.photoRepository.save(photo);
            const photoAccessory = new entities_1.PhotosAccessoryEntity();
            photoAccessory.photo = photo.id;
            photoAccessory.accessory = accessory.id;
            photoAccessory.save();
            return new responses_1.ApiResponse(true, responses_1.SUCCESS.PHOTO_CREATED, evidence);
        }
        else {
            return new responses_1.ApiResponse(false, responses_1.ERROR.FILE_WAS_NOT_UPLOADED);
        }
    }
    async removeEvidence(id) {
        const evidence = await this.photoRepository.findOne({
            id: id,
        });
        if (!evidence)
            return new responses_1.ApiResponse(false, responses_1.ERROR.PHOTO_NOT_FOUND);
        await index_1.Cloudinary.removeFile(evidence.url);
        this.photoRepository
            .createQueryBuilder()
            .delete()
            .from(entities_1.PhotoEntity)
            .where('id = :id', {
            id: id,
        })
            .execute();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.PHOTO_DELETED);
    }
    async findAllLost(pagination) {
        if (!entities_1.PaginationVerifier.verifyIPagination(pagination))
            return responses_1.ApiResponse.paginationWithDatesNotProvidedError();
        const result = await this.accessoryRepository
            .createQueryBuilder('accessory')
            .innerJoinAndSelect('accessory.comments', 'comments')
            .innerJoinAndSelect('comments.userOwner', 'user')
            .leftJoinAndSelect('accessory.category', 'category')
            .leftJoinAndSelect('accessory.images', 'pa')
            .leftJoinAndSelect('pa.photo', 'images')
            .leftJoinAndSelect('user.photo', 'photos')
            .where("accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2 AND accessory.state = 'lost'", {
            start: pagination.start,
            end: pagination.end,
        })
            .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
            .take(pagination.pageElements)
            .orderBy('accessory.updatedAt', 'DESC')
            .getManyAndCount();
        if (!result.length)
            new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORIES_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.ACCESSORIES_FOUND, new api_response_1.ApiResponseRecords(result, pagination));
    }
    async findAll(pagination) {
        if (!entities_1.PaginationVerifier.verifyIPagination(pagination))
            return responses_1.ApiResponse.paginationWithDatesNotProvidedError();
        const result = await this.accessoryRepository
            .createQueryBuilder('accessory')
            .innerJoinAndSelect('accessory.comments', 'comments')
            .innerJoinAndSelect('comments.userOwner', 'user')
            .leftJoinAndSelect('accessory.category', 'category')
            .leftJoinAndSelect('accessory.images', 'pa')
            .leftJoinAndSelect('pa.photo', 'images')
            .leftJoinAndSelect('user.photo', 'photos')
            .where('accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2 AND accessory.state = :state AND user.identification = :identification', {
            start: pagination.start,
            end: pagination.end,
            state: pagination.state,
            identification: pagination.identification,
        })
            .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
            .take(pagination.pageElements)
            .orderBy('accessory.updatedAt', 'DESC')
            .getManyAndCount();
        if (!result.length)
            new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORIES_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.ACCESSORIES_FOUND, new api_response_1.ApiResponseRecords(result, pagination));
    }
    async findOne(id) {
        const accessory = await this.accessoryRepository
            .createQueryBuilder('accessory')
            .innerJoinAndSelect('accessory.comments', 'comments')
            .innerJoinAndSelect('comments.userOwner', 'user')
            .leftJoinAndSelect('accessory.category', 'category')
            .leftJoinAndSelect('accessory.images', 'pa')
            .leftJoinAndSelect('pa.photo', 'images')
            .leftJoinAndSelect('user.photo', 'photos')
            .where('accessory.id_unique = :id_unique', {
            id_unique: id,
        })
            .getOne();
        if (!accessory)
            return new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORY_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.ACCESSORY_FOUND, accessory);
    }
    async search(pagination) {
        if (!entities_1.PaginationVerifier.verifyIPagination(pagination))
            return responses_1.ApiResponse.paginationWithDatesNotProvidedError();
        const result = await this.accessoryRepository
            .createQueryBuilder('accessory')
            .innerJoinAndSelect('accessory.comments', 'comments')
            .innerJoinAndSelect('comments.userOwner', 'user')
            .leftJoinAndSelect('accessory.category', 'category')
            .leftJoinAndSelect('accessory.images', 'pa')
            .leftJoinAndSelect('pa.photo', 'images')
            .leftJoinAndSelect('user.photo', 'photos')
            .where("accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2 AND accessory.state = 'lost' AND (LOWER(accessory.name) LIKE LOWER(:filter) OR LOWER(accessory.lost_place) LIKE LOWER(:filter) OR LOWER(category.category) LIKE LOWER(:filter) OR LOWER(user.name) LIKE LOWER(:filter))", {
            start: pagination.start,
            end: pagination.end,
            filter: `%${pagination.filter}%`,
        })
            .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
            .take(pagination.pageElements)
            .orderBy('accessory.updatedAt', 'DESC')
            .getManyAndCount();
        if (!result.length)
            new responses_1.ApiResponse(false, responses_1.ERROR.SEARCH_EMPTY);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.SEARCH, new api_response_1.ApiResponseRecords(result, pagination));
    }
    async update(id, dto) {
        const accessory = await this.accessoryRepository.findOne({
            id_unique: id,
        });
        if (!accessory)
            return new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORY_NOT_FOUND);
        const accessoryCat = new entities_1.AccessoryEntity();
        accessoryCat.category = dto.category_id;
        const result = await this.accessoryRepository.update({ id_unique: id }, dto);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.ACCESSORY_UPDATED, result);
    }
    async remove(id_unique) {
        const accessory = await this.accessoryRepository.findOne({
            id_unique: id_unique,
        });
        if (!accessory)
            return new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORY_NOT_FOUND);
        this.accessoryRepository
            .createQueryBuilder()
            .delete()
            .from(entities_1.AccessoryEntity)
            .where('id_unique = :id_unique', {
            id_unique: id_unique,
        })
            .execute();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.ACCESSORY_DELETED);
    }
};
AccessoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(entities_1.AccessoryEntity)),
    __param(1, typeorm_1.InjectRepository(entities_1.CommentEntity)),
    __param(2, typeorm_1.InjectRepository(entities_1.UserEntity)),
    __param(3, typeorm_1.InjectRepository(entities_1.CategoryEntity)),
    __param(6, typeorm_1.InjectRepository(entities_1.PhotoEntity)),
    __metadata("design:paramtypes", [repositories_1.AccessoryRepository,
        repositories_1.CommentRepository,
        repositories_1.UserRepository,
        repositories_1.CategoryRepository,
        config_service_1.ConfigService,
        index_1.PhotoService,
        repositories_1.PhotoRepository])
], AccessoryService);
exports.AccessoryService = AccessoryService;
//# sourceMappingURL=accessory.service.js.map