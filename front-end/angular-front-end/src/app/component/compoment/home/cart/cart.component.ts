import {Component, OnInit} from '@angular/core';
import {ICart} from '../../../model/icart';
import {LaptopService} from '../../../service/laptop.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {render} from 'creditcardpayments/creditCardPayments';
import {Title} from '@angular/platform-browser';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ICustomer} from '../../../model/i-customer';
import {ILaptopDto} from '../../../dto/ilaptop-dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: ICart[];
  cart1: ILaptopDto[];
  totalPrice = 0;
  finalPrice = 0;
  cartCount: number;
  total: string;
  price: number;
  usd: number;
  action: boolean;
  totalPay: number;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  idCustomer: number;
  username: string;
  customer: ICustomer[];
  idUser: number;


  constructor(private laptopService: LaptopService,
              private router: Router,
              private title: Title,
              private tokenService: TokenStorageService) {
    title.setTitle('Giỏ hàng');
  }

  ngOnInit(): void {
    this.showUsername();
    window.scroll(0, 0);
  }

  showUsername() {
    if (this.tokenService.isLogged()) {
      this.getCustomer();
      // this.showCart();
      // this.showCartCount();
      this.showListCart();
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
        console.log(this.idUser);
      }

    });
  }

  showListCart(): void {
    this.laptopService.findByUsername().subscribe(customer => {
      this.laptopService.sumMoney(customer.id).subscribe(value => {
        this.totalPay = value.totalPay;
      });
      if (customer != null) {
        this.laptopService.listCart(customer.id).subscribe(value => {
          this.laptopService.cartCount(customer.id).subscribe(value1 => {
            this.cartCount = value1.cartCount;
          });
          this.cart = value;
          for (const item of value) {
            this.totalPrice += item.price * item.quantity;
            this.finalPrice += item.price * (1 - item.discount / 100) * item.quantity;
          }
        });
      }
    });
  }

  ascQuantity(id: number): void {
    console.log(id);
    this.laptopService.ascQuantity(id).subscribe(value => {
      // location.reload();
      // this.ngOnInit();
      this.showListCart();
    });
  }


  descQuantity(id: number): void {
    this.laptopService.descQuantity(id).subscribe(value => {
      // location.reload();
      this.showListCart();
      // this.ngOnInit();
    });
  }

  submit(price: number) {
    if (!this.action) {
      this.action = true;
      this.usd = price / 25000;
      this.total = this.usd.toString();
      render(
        {
          id: '#myPaypal',
          value: this.total,
          currency: 'USD',
          onApprove: (details) => {
            this.payLaptop();
          }
        }
      );

    } else {
      this.action = false;
    }
  }

  payLaptop(): void {
    this.laptopService.findByUsername().subscribe(customer => {
      this.laptopService.payLaptop(customer.id).subscribe(value => {
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Cảm ơn quý khách !',
        title: 'Đã thanh toán thành công',
        showConfirmButton: false,
      });
      window.setTimeout(this.loadPage, 500);
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Xin lỗi quý khách !',
        title: 'Thanh toán thất bại !',
        showConfirmButton: false,
      });
    });
  }

  loadPage(): void {
    window.location.replace('/cart');
  }


  deleteCart(id: number): void {
    Swal.fire({
      title: 'Bạn có chắc?',
      text: 'Xóa sản phẩm này khỏi giỏ hàng!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tôi muốn xóa!',
      cancelButtonText: 'Đóng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.laptopService.deleteCart(id).subscribe(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });

          Toast.fire({
            icon: 'success',
            title: 'Xóa khỏi giỏ hàng thành công!'
          });

          location.reload();
        }, error => {
        });
      }
    });
  }


}
