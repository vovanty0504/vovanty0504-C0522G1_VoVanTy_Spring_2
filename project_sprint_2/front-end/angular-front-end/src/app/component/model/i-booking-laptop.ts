import {ILaptop} from './i-laptop';
import {ICustomer} from './i-customer';

export interface IBookingLaptop {
  id?: number;
  isDelete?: number;
  laptopBookingTime?: string;
  status?: number;
  quantity?: number;
  laptop: ILaptop;
  customer: ICustomer;
}
