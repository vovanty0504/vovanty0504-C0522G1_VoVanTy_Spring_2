import {IEmployee} from './i-employee';
import {ILaptopType} from './i-laptop-type';
import {IPromotion} from './i-promotion';

export interface ILaptop {
  id?: number;
  name?: string;
  cpu?: string;
  screen?: string;
  graphicsCard?: string;
  image?: string;
  ram?: string;
  quantity?: number;
  price?: number;
  status?: number;
  employee: IEmployee;
  laptopType: ILaptopType;
  promotion: IPromotion;
}
