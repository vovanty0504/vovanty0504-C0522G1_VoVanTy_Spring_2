import {Employee} from '../model/employee';
import {LaptopType} from '../model/laptop-type';
import {Promotion} from '../model/promotion';

export interface ILaptopDto {
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
  discountMoney: number;
}
