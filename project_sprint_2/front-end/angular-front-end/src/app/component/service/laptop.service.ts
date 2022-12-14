import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILaptopDto} from '../dto/ilaptop-dto';
import {ILaptopType} from '../model/i-laptop-type';
import {DataResult} from '../dto/data-result';
import {TokenStorageService} from './token-storage.service';
import firebase from 'firebase';
import User = firebase.User;

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

  // findByUsername(): Observable<any> {
  //   return this.http.get<any>(this.API_LAPTOP + 'laptop/find-by-username' , this.httpOptions);
  // }

}
