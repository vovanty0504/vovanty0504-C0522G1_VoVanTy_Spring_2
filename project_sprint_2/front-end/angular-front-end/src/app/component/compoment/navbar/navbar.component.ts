import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../service/laptop.service';
import {LaptopType} from '../../model/laptop-type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  laptopTypeList: LaptopType[];

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
