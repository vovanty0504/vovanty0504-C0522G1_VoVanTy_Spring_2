import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../../service/token-storage.service';
import {LaptopService} from '../../../service/laptop.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-laptop',
  templateUrl: './edit-laptop.component.html',
  styleUrls: ['./edit-laptop.component.css']
})
export class EditLaptopComponent implements OnInit {
  username = '';
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  idCustomer: number;
  id: number;
  formGroupLaptop: FormGroup;


  constructor(private tokenService: TokenStorageService,
              private laptopService: LaptopService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.formGroupLaptop = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      cpu: new FormControl(),
      screen: new FormControl(),
      graphicsCard: new FormControl(),
      image: new FormControl(),
      ram: new FormControl(),
      quantity: new FormControl(),
      price: new FormControl(),
      laptopType: new FormGroup({
        id: new FormControl(),
        name: new FormControl()
      }),
      promotion: new FormGroup({
        id: new FormControl(),
        name: new FormControl()
      })
    });
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.laptopService.findLaptop(this.id).subscribe(value => {
      console.log(value);
      this.formGroupLaptop.patchValue(value);
    });

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

}
