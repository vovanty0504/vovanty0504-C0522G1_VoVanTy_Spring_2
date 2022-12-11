import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILaptopDto} from '../dto/ilaptop-dto';
import {LaptopType} from '../model/laptop-type';
import {DataResult} from '../dto/data-result';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  private API_LAPTOP = environment.api_url;

  constructor(private http: HttpClient) {
  }

  getAllLaptop(page: number, nameSearch: string): Observable<DataResult<ILaptopDto>> {
    console.log(this.API_LAPTOP + 'laptop/list?page=' + page + '&nameSearch=' + nameSearch);
    return this.http.get<DataResult<ILaptopDto>>(this.API_LAPTOP + 'laptop/list?page=' + page + '&nameSearch=' + nameSearch);
  }

  getAllLaptopType(): Observable<LaptopType[]> {
    return this.http.get<ILaptopDto[]>(this.API_LAPTOP + 'laptop/type-list');
  }

  findById(id: number): Observable<ILaptopDto> {
    return this.http.get<ILaptopDto>(this.API_LAPTOP + 'laptop/find-by-id/' + id);
  }

}
