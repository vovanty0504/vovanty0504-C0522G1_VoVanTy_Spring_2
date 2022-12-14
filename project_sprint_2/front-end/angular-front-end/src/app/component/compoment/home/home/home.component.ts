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
  username = '';

  constructor(private laptopService: LaptopService) {
  }


  ngOnInit(): void {
    this.getAllLaptopList(this.numberPage);
    // this.findByUsername();
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

  findByUsername() {
    this.laptopService.findByUsername().subscribe(value => {
      this.username = value.username;
    });
  }


  search() {
    this.numberPage = 0;
    this.getAllLaptopList(this.numberPage);
  }
}
