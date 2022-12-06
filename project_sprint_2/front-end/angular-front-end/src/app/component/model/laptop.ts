import {Employee} from './employee';
import {LaptopType} from './laptop-type';
import {Promotion} from './promotion';

export interface Laptop {
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
  employee: Employee;
  laptopType: LaptopType;
  promotion: Promotion;
}
