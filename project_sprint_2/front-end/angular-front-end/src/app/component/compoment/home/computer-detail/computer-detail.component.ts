import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../../service/laptop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ILaptopDto} from '../../../dto/ilaptop-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {ICustomer} from '../../../model/i-customer';
import {IEmployee} from '../../../model/i-employee';
import {ILaptop} from '../../../model/i-laptop';

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


  constructor(private laptopService: LaptopService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.laptopService.findById(this.id).subscribe(value => {
      this.laptopId = value.id;
      console.log(this.laptopId);
      window.scroll(0, 0);
      this.laptop$ = new BehaviorSubject(value);
    });


    this.getCustomer();
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
    this.laptopService.addToCart(this.quantityChoose, this.idUser, this.laptopId).subscribe(() => {
      console.log(this.idUser);
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

  ascQuantity(): void {
    this.quantityChoose++;
  }

  descQuantity(): void {
    this.quantityChoose--;
  }
}
