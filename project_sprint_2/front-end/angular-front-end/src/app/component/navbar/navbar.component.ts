import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../service/laptop.service';
import {ILaptopType} from '../model/i-laptop-type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  laptopTypeList: ILaptopType[];

  constructor(private laptopService: LaptopService) {
  }

  ngOnInit(): void {
    this.getAllLaptopType();
  }

  getAllLaptopType() {
    this.laptopService.getAllLaptopType().subscribe(value => {
      console.log(value);
      this.laptopTypeList = value;
    });
  }

}
