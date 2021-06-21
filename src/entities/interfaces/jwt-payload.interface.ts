import { CommentEntity } from '../comment.entity';
import { PhotoEntity } from '../photo.entity';
import { RoleEntity } from '../role.entity';

export interface JwtPayload {
  id: number;
  identification: number;
  name: string;
  lastname: string;
  rol: number;
  photo: number;
  users: number;
  occupation: string;
  city: string;
  address: string;
  birthdate: string;
  phone: string;
  email: string;
  state: boolean;
}

export interface IToken {
  readonly token: string;
}
