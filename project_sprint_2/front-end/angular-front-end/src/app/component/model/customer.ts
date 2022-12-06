import {CustomerType} from './customer-type';
import {User} from './user';

export interface Customer {
  id?: number;
  name?: string;
  dayOfBirth?: string;
  gender?: number;
  idCard?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  image?: string;
  user?: User;
  customerType?: CustomerType;
}
