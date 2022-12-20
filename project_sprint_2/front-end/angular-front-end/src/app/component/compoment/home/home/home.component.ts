import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../../service/laptop.service';
import {ILaptopDto} from '../../../dto/ilaptop-dto';
import {ILaptopType} from '../../../model/i-laptop-type';
import {ICustomer} from '../../../model/i-customer';
import Swal from 'sweetalert2';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../service/token-storage.service';

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
  // laptop$: BehaviorSubject<ILaptopDto>;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  idCustomer: number;


  constructor(private laptopService: LaptopService,
              private tokenService: TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    this.getAllLaptopList(this.numberPage);
    this.showUsername();
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

  showUsername() {
    if (this.tokenService.isLogged()) {
      this.getCustomer();
      this.username = this.tokenService.getUser().username;
      this.roles = this.tokenService.getUser().roles;
      this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
      this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
      this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;
    }
  }


  addToCart(laptopId: number): void {
    if (this.idUser == null) {
      this.router.navigateByUrl('/login');
    } else {
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
      });
    }

  }

  loadPage(): void {
    window.location.replace('/cart');
  }
}
