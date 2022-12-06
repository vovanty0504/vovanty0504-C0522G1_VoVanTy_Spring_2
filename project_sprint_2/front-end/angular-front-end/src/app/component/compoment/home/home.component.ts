import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../service/laptop.service';
import {ILaptopDto} from '../../dto/ilaptop-dto';
import {LaptopType} from '../../model/laptop-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalRecord = 0;
  action: boolean;
  numberRecord = 0;
  nameSearch = '';
  laptopList: ILaptopDto[];
  moreLaptopList: ILaptopDto[];
  laptopTypeList: LaptopType[];

  constructor(private laptopService: LaptopService) {
  }

  ngOnInit(): void {
    this.getAllLaptopList(this.numberRecord);
  }

  getAllLaptopList(numberP: number) {
    this.laptopService.getAllLaptop(numberP, this.nameSearch).subscribe(value => {
      console.log(value);
      // @ts-ignore
      this.totalRecord = Math.ceil(value.totalElements / 8);
      console.log(this.totalRecord);
      if (value != null) {
        this.action = true;
        if (this.numberRecord === 0) {
          // @ts-ignore
          this.laptopList = value.content;
        } else {
          // @ts-ignore
          this.moreLaptopList = value.content;
          this.laptopList = this.laptopList.concat(this.moreLaptopList);
        }
      } else {
        this.action = false;
      }
    });
  }

  loadMore() {
    this.numberRecord += 1;
    this.getAllLaptopList(this.numberRecord);
  }


}
