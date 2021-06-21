import { EntitySubscriberInterface, UpdateEvent, InsertEvent } from 'typeorm';
import { UserEntity } from '../user.entity';
export declare class UpdatePasswordSubscriber implements EntitySubscriberInterface<UserEntity> {
    listenTo(): typeof UserEntity;
    hashPassword(entity: UserEntity): Promise<void>;
    beforeInsert(event: InsertEvent<UserEntity>): Promise<void>;
    beforeUpdate({ entity, databaseEntity }: UpdateEvent<UserEntity>): Promise<void>;
}
