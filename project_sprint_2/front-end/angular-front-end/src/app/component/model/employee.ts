import {User} from './user';

export interface Employee {
  id?: number;
  name?: string;
  gender?: number;
  email?: string;
  address?: string;
  phoneNumber?: string;
  user?: User;
  idCard?: string;
  dayOfBirth?: string;
  image?: string;
}
