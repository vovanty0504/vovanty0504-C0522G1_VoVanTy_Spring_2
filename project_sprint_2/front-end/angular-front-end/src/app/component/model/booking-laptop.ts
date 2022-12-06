import {Laptop} from './laptop';
import {Customer} from './customer';

export interface BookingLaptop {
  id?: number;
  isDelete?: number;
  laptopBookingTime?: string;
  status?: number;
  quantity?: number;
  laptop: Laptop;
  customer: Customer;
}
