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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const state_accessory_enum_1 = require("../entities/enum/state-accessory.enum");
const repositories_1 = require("../repositories");
const responses_1 = require("../responses");
let NotificationService = class NotificationService {
    constructor(notificationRepository, accessoryRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.accessoryRepository = accessoryRepository;
        this.userRepository = userRepository;
    }
    async create(dto, id) {
        const accessory = await this.accessoryRepository.findOne({
            id: id,
        });
        if (!accessory)
            return new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORY_NOT_FOUND);
        const userOwner = await this.userRepository.findOne({
            id: dto.user_owner,
        });
        if (!userOwner)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        const userRef = await this.userRepository.findOne({
            id: dto.user_id,
        });
        if (!userRef)
            return new responses_1.ApiResponse(false, responses_1.ERROR.USER_NOT_FOUND);
        const noti = await this.notificationRepository.create(dto);
        noti.userOwner = userOwner.id;
        noti.user = userRef.id;
        noti.accessory = accessory.id;
        await noti.save();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.NOTIFICATION_CREATED);
    }
    async findAll(identification) {
        const result = await this.notificationRepository
            .createQueryBuilder('notification')
            .innerJoinAndSelect('notification.userOwner', 'user', 'notification.user_owner = user.id')
            .innerJoinAndSelect('notification.user', 'userRef', 'notification.user_id = userRef.id')
            .innerJoinAndSelect('notification.accessory', 'accessory', 'notification.accessory_id = accessory.id')
            .where('user.role_id = 2 AND user.identification = :identification', {
            identification: identification,
        })
            .orderBy('notification.createdAt', 'DESC')
            .getMany();
        if (!result.length)
            new responses_1.ApiResponse(false, responses_1.ERROR.NOTIFICATION_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.NOTIFICATIONS_FOUND, result);
    }
    async findComments(id_unique) {
        const result = await this.notificationRepository
            .createQueryBuilder('notification')
            .innerJoinAndSelect('notification.userOwner', 'user', 'notification.user_owner = user.id')
            .innerJoinAndSelect('notification.user', 'userRef', 'notification.user_id = userRef.id')
            .innerJoinAndSelect('notification.accessory', 'accessory', 'notification.accessory_id = accessory.id')
            .where("user.role_id = 2 AND accessory.id_unique = :id_unique AND notification.type ='found'", {
            id_unique: id_unique,
        })
            .orderBy('notification.updatedAt', 'DESC')
            .getMany();
        if (!result.length)
            new responses_1.ApiResponse(false, responses_1.ERROR.NOTIFICATION_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.NOTIFICATIONS_FOUND, result);
    }
    async count(identification) {
        const result = await this.notificationRepository
            .createQueryBuilder('notification')
            .innerJoinAndSelect('notification.userOwner', 'user', 'notification.user_owner = user.id')
            .innerJoinAndSelect('notification.user', 'userRef', 'notification.user_id = userRef.id')
            .innerJoinAndSelect('notification.accessory', 'accessory', 'notification.accessory_id = accessory.id')
            .where('user.role_id = 2 AND user.identification = :identification AND notification.seen = false', {
            identification: identification,
        })
            .getCount();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.NOTIFICATIONS_FOUND, result);
    }
    async seen(id) {
        const notification = await this.notificationRepository.findOne({
            id: id,
        });
        if (!notification)
            return new responses_1.ApiResponse(false, responses_1.ERROR.NOTIFICATION_NOT_FOUND);
        await this.notificationRepository.update({ id: id }, { seen: true });
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.NOTIFICATION_CREATED);
    }
    async accept(id_unique) {
        const accessory = await this.accessoryRepository.findOne({
            id_unique: id_unique,
        });
        if (!accessory)
            return new responses_1.ApiResponse(false, responses_1.ERROR.ACCESSORY_NOT_FOUND);
        await this.accessoryRepository.update({ id_unique: id_unique }, { state: state_accessory_enum_1.States.FOUND });
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.NOTIFICATION_CREATED);
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(entities_1.NotificationEntity)),
    __param(1, typeorm_1.InjectRepository(entities_1.AccessoryEntity)),
    __param(2, typeorm_1.InjectRepository(entities_1.UserEntity)),
    __metadata("design:paramtypes", [repositories_1.NotificationRepository,
        repositories_1.AccessoryRepository,
        repositories_1.UserRepository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map