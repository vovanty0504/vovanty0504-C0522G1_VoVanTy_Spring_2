import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../../service/laptop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ILaptopDto} from '../../../dto/ilaptop-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {ICustomer} from '../../../model/i-customer';
import {IEmployee} from '../../../model/i-employee';
import {ILaptop} from '../../../model/i-laptop';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.css']
})
export class ComputerDetailComponent implements OnInit {
  id: number;
  laptop$: BehaviorSubject<ILaptopDto>;
  quantityChoose = 1;
  idUser: number;
  customer: ICustomer[];
  employee: IEmployee[];
  laptopId: number;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  idCustomer: number;
  username: string;


  constructor(private laptopService: LaptopService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tokenService: TokenStorageService,
              private title: Title) {
    title.setTitle('Chi tiết sản phẩm');
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.laptopService.findById(this.id).subscribe(value => {
      this.laptopId = value.id;
      window.scroll(0, 0);
      this.laptop$ = new BehaviorSubject(value);
    });
    this.showUsername();
    window.scroll(0, 0);

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


  getCustomer(): void {
    this.laptopService.findByUsername().subscribe(value => {
      this.customer = value;
      if (this.customer != null) {
        this.idUser = value.id;
      }
    });
  }


  addToCart(): void {

    this.router.navigateByUrl('/login');
    this.laptopService.addToCart(this.quantityChoose, this.idUser, this.laptopId).subscribe(() => {
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


  loadPage(): void {
    window.location.replace('/cart');
  }

  ascQuantity(): void {
    this.quantityChoose++;
  }

  descQuantity(): void {
    this.quantityChoose--;
  }
}
