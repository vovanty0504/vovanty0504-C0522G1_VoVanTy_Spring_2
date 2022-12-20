import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {LaptopService} from '../../../service/laptop.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IHistoryDto} from '../../../dto/ihistory-dto';

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
  totalPage: number;


  constructor(private tokenService: TokenStorageService,
              private laptopService: LaptopService) {
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
      if (value != null) {
        this.action = true;
        this.historyDto$ = new BehaviorSubject<IHistoryDto[]>(value.content);
        this.totalPage = Math.ceil(value.totalElements / this.pageSize);
        console.log(value.pageable);
      } else {
        console.log('a');
        this.action = false;
      }
    });
  }

  getAllCustomer() {
    this.laptopService.findAllCustomer(this.username).subscribe(value => {
      this.customerName = value.name;
      this.image = value.imag;
    });
  }

  previous(): void {
    this.page--;
    this.ngOnInit();
  }

  next(): void {
    this.page++;
    this.ngOnInit();
  }


}
