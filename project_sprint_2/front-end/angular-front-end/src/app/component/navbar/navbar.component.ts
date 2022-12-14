import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../service/laptop.service';
import {ILaptopType} from '../model/i-laptop-type';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../service/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  laptopTypeList: ILaptopType[];
  username: string;
  findUsername = '';
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private laptopService: LaptopService,
              private tokenService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.showUsername();
  }

  showUsername() {
    this.username = this.tokenService.getUser().username;
    this.roles = this.tokenService.getUser().roles;
    this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
    this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
    this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;
  }

  getAllLaptopType() {
    this.laptopService.getAllLaptopType().subscribe(value => {
      this.laptopTypeList = value;
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
    this.router.navigateByUrl('');
    this.username = '';
    this.isCustomer = false;
    this.isEmployee = false;
    this.isAdmin = false;
  }
}
