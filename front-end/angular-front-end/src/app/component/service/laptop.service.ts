import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILaptopDto} from '../dto/ilaptop-dto';
import {ILaptopType} from '../model/i-laptop-type';
import {DataResult} from '../dto/data-result';
import {TokenStorageService} from './token-storage.service';
import firebase from 'firebase';
import User = firebase.User;
import {ICart} from '../model/icart';
import {IBookingLaptop} from '../model/i-booking-laptop';
import {IHistory} from '../model/ihistory';
import {ILaptop} from '../model/i-laptop';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  httpOptions: any;
  private API_LAPTOP = environment.api_url;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllHistory(curPage: number, numberRecord: number, username: string): Observable<DataResult<IHistory>> {
    console.log(this.API_LAPTOP + 'laptop/history/' + username
      + '?page=' + (curPage - 1) + '&size=' + numberRecord);
    return this.http.get<DataResult<IHistory>>(this.API_LAPTOP + 'laptop/history/' + username
      + '?page=' + (curPage - 1) + '&size=' + numberRecord);
  }

  getAllLaptop(page: number, nameSearch: string, startPrice: number, endPrice: number): Observable<DataResult<ILaptopDto>> {
    return this.http.get<DataResult<ILaptopDto>>(this.API_LAPTOP + 'laptop/list?page=' + page + '&nameSearch=' + nameSearch
      + '&startPrice=' + startPrice + '&endPrice=' + endPrice);
  }

  getAllLaptopType(): Observable<ILaptopType[]> {
    return this.http.get<ILaptopDto[]>(this.API_LAPTOP + 'laptop/type-list');
  }

  findById(id: number): Observable<ILaptopDto> {
    return this.http.get<ILaptopDto>(this.API_LAPTOP + 'laptop/find-by-id/' + id);
  }

  findByUsername(): Observable<any> {
    return this.http.get<any>(this.API_LAPTOP + 'laptop/get-customer/', this.httpOptions);
  }

  findLaptop(id: number): Observable<ILaptop> {
    return this.http.get<ILaptop>(this.API_LAPTOP + 'laptop/get-laptop/' + id);
  }


  addToCart(quantity: number, customerId: number, laptopId: number): Observable<void> {
    return this.http.get<void>(this.API_LAPTOP + 'booking/add-cart/' + quantity + '&' + customerId + '&' + laptopId);
  }

  listCart(id: number): Observable<ICart[]> {
    return this.http.get<ICart[]>(this.API_LAPTOP + 'booking/list-cart/' + id);
  }

  ascQuantity(id: number): Observable<void> {
    return this.http.get<void>(this.API_LAPTOP + 'booking/asc-quantity/' + id);
  }

  descQuantity(id: number): Observable<void> {
    return this.http.get<void>(this.API_LAPTOP + 'booking/desc-quantity/' + id);
  }

  payLaptop(id: number): Observable<void> {
    return this.http.get<void>(this.API_LAPTOP + 'booking/pay-laptop/' + id);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.get<void>(this.API_LAPTOP + 'booking/delete-cart/' + id);
  }

  cartCount(id: number): Observable<any> {
    return this.http.get<any>(this.API_LAPTOP + 'booking/cart-count/' + id);
  }

  findAllCustomer(username: string): Observable<any> {
    return this.http.get(this.API_LAPTOP + 'laptop/find-all-customer/' + username);
  }

  deleteHistory(id: number): Observable<void> {
    return this.http.get<void>(this.API_LAPTOP + 'booking/delete-history/' + id);
  }

  sumMoney(id: number): Observable<any> {
    return this.http.get<any>(this.API_LAPTOP + 'booking/list-money/' + id);
  }

  deleteLaptop(id: number): Observable<HttpEvent<void>> {
    return this.http.get<void>(this.API_LAPTOP + 'admin/delete-laptop/' + id, this.httpOptions);
  }
}
