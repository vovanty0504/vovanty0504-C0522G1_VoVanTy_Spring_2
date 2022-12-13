import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../../service/laptop.service';
import {ILaptopDto} from '../../../dto/ilaptop-dto';
import {ILaptopType} from '../../../model/i-laptop-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalRecord = 0;
  action: boolean;
  totalPage = 0;
  numberPage = 0;
  nameSearch = '';
  endPrice = 0;
  startPrice = 0;
  price = '';
  laptopList: ILaptopDto[];
  moreLaptopList: ILaptopDto[];
  laptopTypeList: ILaptopType[];

  constructor(private laptopService: LaptopService) {
  }


  ngOnInit(): void {
    this.getAllLaptopList(this.numberPage);
  }

  getAllLaptopList(numberP: number) {
    this.laptopService.getAllLaptop(numberP, this.nameSearch, this.startPrice, this.endPrice).subscribe(value => {
      if (value != null) {
        this.action = true;
        this.totalRecord = value.totalElements;
        this.totalPage = value.totalPages;
        if (numberP > 0) {
          this.moreLaptopList = this.laptopList;
          this.laptopList = this.moreLaptopList.concat(value.content);
        } else {
          this.laptopList = value.content;
        }
      } else {
        this.action = false;
      }
    });
  }

  loadMore() {
    this.numberPage += 1;
    this.getAllLaptopList(this.numberPage);
  }


  search() {
    if (Number(this.price) === 1) {
      this.endPrice = 4999999;
    } else if (Number(this.price) === 2) {
      this.endPrice = 9999999;
    } else if (Number(this.price) === 3) {
      this.endPrice = 14999999;
    } else if (Number(this.price) === 4) {
      this.endPrice = 19999999;
      console.log(this.endPrice);
    } else if (Number(this.price) === 5) {
      this.endPrice = 29999999;
    } else {
      this.endPrice = 0;
    }
    this.numberPage = 0;
    this.getAllLaptopList(this.numberPage);
  }
}
