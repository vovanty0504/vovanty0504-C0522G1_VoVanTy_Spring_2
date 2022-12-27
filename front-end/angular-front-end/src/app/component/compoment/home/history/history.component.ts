import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {LaptopService} from '../../../service/laptop.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IHistoryDto} from '../../../dto/ihistory-dto';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  username = '';
  idCustomer: number;
  historyDto$: Observable<IHistoryDto[]>;
  action: boolean;
  customerName = '';
  image = '';
  total$: Observable<number>;
  page = 1;
  pageSize = 5;

  id: number;
  price: number;
  quantity: number;
  dayBooking = '';
  status: number;
  isDelete: number;
  name = '';

  idModal: number;
  priceModal: number;
  quantityModal: number;
  dayBookingModal = '';
  statusModal: number;
  isDeleteModal: number;
  nameModal = '';

  // formDetails: FormGroup = new FormGroup({
  //   id: new FormControl(),
  //   price: new FormControl(),
  //   quantity: new FormControl(),
  //   dayBooking: new FormControl(),
  //   status: new FormControl(),
  //   isDelete: new FormControl(),
  //   name: new FormControl()
  // });


  constructor(private tokenService: TokenStorageService,
              private laptopService: LaptopService,
              private title: Title) {
    title.setTitle('Lịch sủ');
  }

  ngOnInit(): void {
    this.showUsername();
    this.getAllHistory();
    this.getAllCustomer();
    window.scroll(0, 0);

  }

  showUsername() {
    if (this.tokenService.isLogged()) {
      this.username = this.tokenService.getUser().username;
      this.roles = this.tokenService.getUser().roles;
      this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
      this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
      this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;
    }
  }

  getAllHistory() {
    this.laptopService.getAllHistory(this.page, this.pageSize, this.username).subscribe(value => {
      console.log(value);
      if (value != null) {
        this.action = true;
        this.historyDto$ = new BehaviorSubject<IHistoryDto[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
      } else {
        console.log('a');
        this.action = false;
      }
    });
  }

  getAllCustomer() {
    this.laptopService.findAllCustomer(this.username).subscribe(value => {
      this.customerName = value.name;
      this.image = value.image;
    });
  }

  whenLogout() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: ' Đăng xuất thành công !',
      showConfirmButton: false,
      timer: 1000
    });
    this.tokenService.logOut();
    this.loadPage();
    window.scroll(0, 0);
    this.username = '';
    this.isCustomer = false;
    this.isEmployee = false;
    this.isAdmin = false;
  }

  loadPage(): void {
    window.location.replace('');
  }

  deleteHistory(id: number) {
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
        this.laptopService.deleteHistory(id).subscribe(() => {
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
            title: 'Hủy đơn hàng thành công!'
          });

          // location.reload();
          this.ngOnInit();
        }, error => {
        });
      }
    });
  }



  showDetail(name: string, dayBooking: string, status: number, price: number, quantity: number, isDelete: number) {
    this.nameModal = name;
    this.dayBookingModal = dayBooking;
    this.statusModal = status;
    this.priceModal = price;
    this.quantityModal = quantity;
    this.isDeleteModal = isDelete;
    // this.formDetails.controls.name.setValue(name);
    // this.formDetails.controls.dayBooking.setValue(dayBooking);
    // this.formDetails.controls.status.setValue(status);
    // this.formDetails.controls.price.setValue(price);
    // this.formDetails.controls.quantity.setValue(quantity);
    // this.formDetails.controls.isDelete.setValue(isDelete);
  }
}
