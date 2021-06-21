"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_SUCCESS = exports.SUCCESS = void 0;
var SUCCESS;
(function (SUCCESS) {
    SUCCESS[SUCCESS["USERS_FOUND"] = 0] = "USERS_FOUND";
    SUCCESS[SUCCESS["USER_FOUND"] = 1] = "USER_FOUND";
    SUCCESS[SUCCESS["USER_CREATED"] = 2] = "USER_CREATED";
    SUCCESS[SUCCESS["USER_UPDATED"] = 3] = "USER_UPDATED";
    SUCCESS[SUCCESS["USER_DELETED"] = 4] = "USER_DELETED";
    SUCCESS[SUCCESS["ACCESSORIES_FOUND"] = 5] = "ACCESSORIES_FOUND";
    SUCCESS[SUCCESS["ACCESSORY_FOUND"] = 6] = "ACCESSORY_FOUND";
    SUCCESS[SUCCESS["ACCESSORY_CREATED"] = 7] = "ACCESSORY_CREATED";
    SUCCESS[SUCCESS["ACCESSORY_UPDATED"] = 8] = "ACCESSORY_UPDATED";
    SUCCESS[SUCCESS["ACCESSORY_DELETED"] = 9] = "ACCESSORY_DELETED";
    SUCCESS[SUCCESS["CATEGORY_CREATED"] = 10] = "CATEGORY_CREATED";
    SUCCESS[SUCCESS["CATEGORY_FOUND"] = 11] = "CATEGORY_FOUND";
    SUCCESS[SUCCESS["CATEGORY_DELETED"] = 12] = "CATEGORY_DELETED";
    SUCCESS[SUCCESS["CATEGORY_UPDATED"] = 13] = "CATEGORY_UPDATED";
    SUCCESS[SUCCESS["USER_VALIDATE"] = 14] = "USER_VALIDATE";
    SUCCESS[SUCCESS["USER_LOGIN"] = 15] = "USER_LOGIN";
    SUCCESS[SUCCESS["PASSWORD_UPDATED"] = 16] = "PASSWORD_UPDATED";
    SUCCESS[SUCCESS["REPORT"] = 17] = "REPORT";
    SUCCESS[SUCCESS["SEARCH"] = 18] = "SEARCH";
    SUCCESS[SUCCESS["PHOTO_CREATED"] = 19] = "PHOTO_CREATED";
    SUCCESS[SUCCESS["PHOTO_DELETED"] = 20] = "PHOTO_DELETED";
    SUCCESS[SUCCESS["COMMENT_CREATE"] = 21] = "COMMENT_CREATE";
    SUCCESS[SUCCESS["NOTIFICATION_CREATED"] = 22] = "NOTIFICATION_CREATED";
    SUCCESS[SUCCESS["NOTIFICATIONS_FOUND"] = 23] = "NOTIFICATIONS_FOUND";
})(SUCCESS = exports.SUCCESS || (exports.SUCCESS = {}));
function GET_SUCCESS(success) {
    switch (success) {
        case SUCCESS.USERS_FOUND:
            return { code: 1, message: 'Usuarios encontrados!' };
        case SUCCESS.USER_FOUND:
            return { code: 2, message: 'Usuario encontrado!' };
        case SUCCESS.USER_CREATED:
            return { code: 3, message: 'Usuario creado exitosamente!' };
        case SUCCESS.USER_UPDATED:
            return {
                code: 4,
                message: 'Información del usuario actualizada exitosamente!',
            };
        case SUCCESS.USER_DELETED:
            return { code: 5, message: 'Usuario eliminado exitosamente!' };
        case SUCCESS.ACCESSORIES_FOUND:
            return { code: 6, message: 'Objetos o accesorios encontrados!' };
        case SUCCESS.ACCESSORY_FOUND:
            return { code: 7, message: 'Objeto o accesorio encontrado!' };
        case SUCCESS.ACCESSORY_CREATED:
            return { code: 8, message: 'Objeto o accesorio creado exitosamente!' };
        case SUCCESS.ACCESSORY_UPDATED:
            return {
                code: 9,
                message: 'Información del Objeto o accesorio actualizada exitosamente!',
            };
        case SUCCESS.ACCESSORY_DELETED:
            return {
                code: 10,
                message: 'Objeto o accesorio eliminado exitosamente!',
            };
        case SUCCESS.CATEGORY_CREATED:
            return { code: 11, message: 'Categoría creada exitosamente!' };
        case SUCCESS.CATEGORY_FOUND:
            return { code: 12, message: 'Categorías encontradas!' };
        case SUCCESS.CATEGORY_DELETED:
            return {
                code: 13,
                message: 'La categoría fue eliminada exitosamente!',
            };
        case SUCCESS.USER_VALIDATE:
            return {
                code: 14,
                message: 'El usuario ha sido validado!',
            };
        case SUCCESS.USER_LOGIN:
            return {
                code: 15,
                message: 'El usuario ha iniciado sesión exitosamente!',
            };
        case SUCCESS.CATEGORY_UPDATED:
            return { code: 16, message: 'Categoría actualizada exitosamente!' };
        case SUCCESS.PASSWORD_UPDATED:
            return {
                code: 17,
                message: 'Contraseña de usuario actualizada exitosamente!',
            };
        case SUCCESS.REPORT:
            return {
                code: 18,
                message: 'Reporte encontrado!',
            };
        case SUCCESS.SEARCH:
            return {
                code: 19,
                message: 'Resultados encontrados!',
            };
        case SUCCESS.PHOTO_CREATED:
            return {
                code: 20,
                message: 'La imagen fue subida con éxito!',
            };
        case SUCCESS.PHOTO_DELETED:
            return {
                code: 21,
                message: 'La imagen fue eliminada con éxito!',
            };
        case SUCCESS.COMMENT_CREATE:
            return {
                code: 22,
                message: 'Comentario creado con éxito!',
            };
        case SUCCESS.NOTIFICATION_CREATED:
            return {
                code: 23,
                message: 'Se ha generado una notificación de encontrado!',
            };
        case SUCCESS.NOTIFICATIONS_FOUND:
            return {
                code: 24,
                message: 'Notificaciones encontradas!',
            };
    }
}
exports.GET_SUCCESS = GET_SUCCESS;
//# sourceMappingURL=api.success.js.map