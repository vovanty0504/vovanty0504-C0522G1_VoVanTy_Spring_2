import {Component, OnInit} from '@angular/core';
import {LaptopService} from '../../../service/laptop.service';
import {ActivatedRoute} from '@angular/router';
import {ILaptopDto} from '../../../dto/ilaptop-dto';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.css']
})
export class ComputerDetailComponent implements OnInit {
  id: number;
  laptop$: BehaviorSubject<ILaptopDto>;

  constructor(private laptopService: LaptopService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.laptopService.findById(this.id).subscribe(value => {
      window.scroll(0, 0);
      console.log(value);
      this.laptop$ = new BehaviorSubject(value);
    });
  }


}
