export enum SUCCESS {
  USERS_FOUND,
  USER_FOUND,
  USER_CREATED,
  USER_UPDATED,
  USER_DELETED,
  ACCESSORIES_FOUND,
  ACCESSORY_FOUND,
  ACCESSORY_CREATED,
  ACCESSORY_UPDATED,
  ACCESSORY_DELETED,
  CATEGORY_CREATED,
  CATEGORY_FOUND,
  CATEGORY_DELETED,
  CATEGORY_UPDATED,
  USER_VALIDATE,
  USER_LOGIN,
  PASSWORD_UPDATED,
  REPORT,
  SEARCH,
  PHOTO_CREATED,
  PHOTO_DELETED,
  COMMENT_CREATE,
  NOTIFICATION_CREATED,
  NOTIFICATIONS_FOUND,
}

export interface Success {
  code: number;
  message: string;
}

export function GET_SUCCESS(success): Success {
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
