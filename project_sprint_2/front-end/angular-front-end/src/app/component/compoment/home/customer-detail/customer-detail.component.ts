import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../../service/laptop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ICustomer} from '../../../model/i-customer';
import {BehaviorSubject} from 'rxjs';
import {ILaptopDto} from '../../../dto/ilaptop-dto';
import Swal from "sweetalert2";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  username = '';
  customerName = '';
  image = '';
  customer$: BehaviorSubject<ICustomer>;

  constructor(private laptopService: LaptopService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tokenService: TokenStorageService) {
  }


  ngOnInit(): void {
    this.showUsername();
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

  getAllCustomer() {
    this.laptopService.findAllCustomer(this.username).subscribe(value => {
      this.customer$ = new BehaviorSubject(value);
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
}
