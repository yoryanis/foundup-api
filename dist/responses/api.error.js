"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ERROR = exports.ERROR = void 0;
const state_accessory_enum_1 = require("../entities/enum/state-accessory.enum");
var ERROR;
(function (ERROR) {
    ERROR[ERROR["USERS_NOT_FOUND"] = 0] = "USERS_NOT_FOUND";
    ERROR[ERROR["PAGINATION_WAS_NOT_PROVIDED"] = 1] = "PAGINATION_WAS_NOT_PROVIDED";
    ERROR[ERROR["USER_NOT_FOUND"] = 2] = "USER_NOT_FOUND";
    ERROR[ERROR["USER_EXIST"] = 3] = "USER_EXIST";
    ERROR[ERROR["EMAIL_EXIST"] = 4] = "EMAIL_EXIST";
    ERROR[ERROR["ROLE_NOT_FOUND"] = 5] = "ROLE_NOT_FOUND";
    ERROR[ERROR["ACCESSORY_NOT_FOUND"] = 6] = "ACCESSORY_NOT_FOUND";
    ERROR[ERROR["ACCESSORY_EXIST"] = 7] = "ACCESSORY_EXIST";
    ERROR[ERROR["ACCESSORIES_NOT_FOUND"] = 8] = "ACCESSORIES_NOT_FOUND";
    ERROR[ERROR["CATEGORY_NOT_FOUND"] = 9] = "CATEGORY_NOT_FOUND";
    ERROR[ERROR["STATE_ACCESSORY"] = 10] = "STATE_ACCESSORY";
    ERROR[ERROR["CATEGORY_EXIST"] = 11] = "CATEGORY_EXIST";
    ERROR[ERROR["IDENTIFICATION_LENGTH"] = 12] = "IDENTIFICATION_LENGTH";
    ERROR[ERROR["QR_EXIST"] = 13] = "QR_EXIST";
    ERROR[ERROR["USER_UNAUTHORIZED"] = 14] = "USER_UNAUTHORIZED";
    ERROR[ERROR["REPORT_NO_FOUND"] = 15] = "REPORT_NO_FOUND";
    ERROR[ERROR["SEARCH_EMPTY"] = 16] = "SEARCH_EMPTY";
    ERROR[ERROR["PHOTO_NOT_FOUND"] = 17] = "PHOTO_NOT_FOUND";
    ERROR[ERROR["COMMENT_NOT_FOUND"] = 18] = "COMMENT_NOT_FOUND";
    ERROR[ERROR["NOTIFICATION_NOT_FOUND"] = 19] = "NOTIFICATION_NOT_FOUND";
    ERROR[ERROR["FILE_WAS_NOT_UPLOADED"] = 20] = "FILE_WAS_NOT_UPLOADED";
    ERROR[ERROR["FILE_WAS_NOT_REMOVED"] = 21] = "FILE_WAS_NOT_REMOVED";
})(ERROR = exports.ERROR || (exports.ERROR = {}));
function GET_ERROR(error) {
    switch (error) {
        case ERROR.USERS_NOT_FOUND:
            return { code: 1, error: 'No hay usuarios!' };
        case ERROR.USER_NOT_FOUND:
            return { code: 2, error: 'Usuario no existe!' };
        case ERROR.USER_EXIST:
            return { code: 3, error: 'Usuario ya existe!' };
        case ERROR.EMAIL_EXIST:
            return { code: 4, error: 'El correo de usuario ya existe!' };
        case ERROR.ROLE_NOT_FOUND:
            return {
                code: 5,
                error: 'El rol asignado no existe, los roles permitidos son admin y user!',
            };
        case ERROR.ACCESSORY_EXIST:
            return {
                code: 6,
                error: 'El objeto o accesorio con este nombre ya existe!',
            };
        case ERROR.ACCESSORY_NOT_FOUND:
            return { code: 7, error: 'El objeto o accesorio no existe!' };
        case ERROR.ACCESSORY_NOT_FOUND:
            return { code: 8, error: 'No hay objetos o accesorios!' };
        case ERROR.CATEGORY_NOT_FOUND:
            return {
                code: 9,
                error: 'La categoría no existe!',
            };
        case ERROR.STATE_ACCESSORY:
            return {
                code: 10,
                error: `Los estados permitidos son: ${state_accessory_enum_1.States.CREATED}, ${state_accessory_enum_1.States.FOUND} y ${state_accessory_enum_1.States.LOST}!`,
            };
        case ERROR.CATEGORY_EXIST:
            return { code: 11, error: 'La categoría con ese nombre ya existe!' };
        case ERROR.IDENTIFICATION_LENGTH:
            return {
                code: 12,
                error: 'La longitud del número de identificación debe ser mayor que 6 y menor que 13!',
            };
        case ERROR.QR_EXIST:
            return {
                code: 13,
                error: 'El código QR ya existe!',
            };
        case ERROR.USER_UNAUTHORIZED:
            return {
                code: 14,
                error: 'Las credenciales de accesos son incorrectas!',
            };
        case ERROR.CATEGORY_NOT_FOUND:
            return {
                code: 15,
                error: 'No hay reportes para mostrar!',
            };
        case ERROR.SEARCH_EMPTY:
            return {
                code: 16,
                error: 'No se encontraron coincidencias!',
            };
        case ERROR.PHOTO_NOT_FOUND:
            return {
                code: 17,
                error: 'Imagen no encontrada!',
            };
        case ERROR.COMMENT_NOT_FOUND:
            return {
                code: 18,
                error: 'Comentario no encontrado!',
            };
        case ERROR.NOTIFICATION_NOT_FOUND:
            return {
                code: 19,
                error: 'Notificación no encontrado!',
            };
        case ERROR.FILE_WAS_NOT_UPLOADED:
            return {
                code: 20,
                error: 'El archivo no fue cargado con éxito!',
            };
        case ERROR.FILE_WAS_NOT_REMOVED:
            return {
                code: 21,
                error: 'El archivo no fue eliminado con éxito!',
            };
        case ERROR.PAGINATION_WAS_NOT_PROVIDED:
            return {
                code: 22,
                error: 'The pagination was not provided, verify the query params within the data prop.',
            };
    }
}
exports.GET_ERROR = GET_ERROR;
//# sourceMappingURL=api.error.js.map