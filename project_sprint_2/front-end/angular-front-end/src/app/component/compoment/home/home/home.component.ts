import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../../service/laptop.service';
import {ILaptopDto} from '../../../dto/ilaptop-dto';
import {ILaptopType} from '../../../model/i-laptop-type';
import {ICustomer} from '../../../model/i-customer';
import Swal from 'sweetalert2';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idUser: number;
  customer: ICustomer[];
  quantityChoose = 1;
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
  laptopId: number;
  id: number;
  laptop$: BehaviorSubject<ILaptopDto>;


  constructor(private laptopService: LaptopService,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getAllLaptopList(this.numberPage);
    this.getCustomer();
    window.scroll(0, 0);

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
    this.numberPage = 0;
    this.getAllLaptopList(this.numberPage);
  }

  getCustomer(): void {
    this.laptopService.findByUsername().subscribe(value => {

      this.customer = value;
      if (this.customer != null) {
        this.idUser = value.id;
      }
    });
  }


  addToCart(laptopId: number): void {
    this.laptopService.addToCart(this.quantityChoose, this.idUser, laptopId).subscribe(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Thêm vào giỏ hàng thành công!'
      });
      window.setTimeout(this.loadPage, 500);
    }, error => {
      console.log(error);
    });
  }

  loadPage(): void {
    window.location.replace('/cart');
  }
}
