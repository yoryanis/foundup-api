export declare enum SUCCESS {
    USERS_FOUND = 0,
    USER_FOUND = 1,
    USER_CREATED = 2,
    USER_UPDATED = 3,
    USER_DELETED = 4,
    ACCESSORIES_FOUND = 5,
    ACCESSORY_FOUND = 6,
    ACCESSORY_CREATED = 7,
    ACCESSORY_UPDATED = 8,
    ACCESSORY_DELETED = 9,
    CATEGORY_CREATED = 10,
    CATEGORY_FOUND = 11,
    CATEGORY_DELETED = 12,
    CATEGORY_UPDATED = 13,
    USER_VALIDATE = 14,
    USER_LOGIN = 15,
    PASSWORD_UPDATED = 16,
    REPORT = 17,
    SEARCH = 18,
    PHOTO_CREATED = 19,
    PHOTO_DELETED = 20,
    COMMENT_CREATE = 21,
    NOTIFICATION_CREATED = 22,
    NOTIFICATIONS_FOUND = 23
}
export interface Success {
    code: number;
    message: string;
}
export declare function GET_SUCCESS(success: any): Success;
