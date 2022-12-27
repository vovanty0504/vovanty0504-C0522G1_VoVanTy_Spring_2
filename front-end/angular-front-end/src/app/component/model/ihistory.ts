import {ILaptop} from './i-laptop';
import {ICustomer} from './i-customer';

export interface IHistory {
  id?: number;
  isDelete?: number;
  laptopBookingTime?: string;
  name?: string;
  status?: number;
  price?: number;
  quantity?: number;
  customer: ICustomer;
}
