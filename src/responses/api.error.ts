import { States } from '../entities/enum/state-accessory.enum';

export enum ERROR {
  USERS_NOT_FOUND,
  PAGINATION_WAS_NOT_PROVIDED,
  USER_NOT_FOUND,
  USER_EXIST,
  EMAIL_EXIST,
  ROLE_NOT_FOUND,
  ACCESSORY_NOT_FOUND,
  ACCESSORY_EXIST,
  ACCESSORIES_NOT_FOUND,
  CATEGORY_NOT_FOUND,
  STATE_ACCESSORY,
  CATEGORY_EXIST,
  IDENTIFICATION_LENGTH,
  QR_EXIST,
  USER_UNAUTHORIZED,
  REPORT_NO_FOUND,
  SEARCH_EMPTY,
  PHOTO_NOT_FOUND,
  COMMENT_NOT_FOUND,
  NOTIFICATION_NOT_FOUND,
  FILE_WAS_NOT_UPLOADED,
  FILE_WAS_NOT_REMOVED,
}

export interface Error {
  code: number;
  error: string;
}

export function GET_ERROR(error): Error {
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
        error:
          'El rol asignado no existe, los roles permitidos son admin y user!',
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
        error: `Los estados permitidos son: ${States.CREATED}, ${States.FOUND} y ${States.LOST}!`,
      };
    case ERROR.CATEGORY_EXIST:
      return { code: 11, error: 'La categoría con ese nombre ya existe!' };
    case ERROR.IDENTIFICATION_LENGTH:
      return {
        code: 12,
        error:
          'La longitud del número de identificación debe ser mayor que 6 y menor que 13!',
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
        error:
          'The pagination was not provided, verify the query params within the data prop.',
      };
  }
}
