import {Customer} from './customer';
import {CustomerFilter} from './customer-filter';
import {Injectable} from '@angular/core';
import {EMPTY, filter, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({providedIn: 'any'})
export class CustomerService {

   customerList: Customer[] = [];

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = 'http://127.0.0.1:8000/customers';

  private refreshStorage(){
    localStorage.setItem('customers',JSON.stringify(this.customerList));
  }

  load(filter: CustomerFilter): void {
    this.getAll(filter).subscribe(result => {
        this.customerList = result;
        this.refreshStorage();
      },
      err => {
        this.customerList = [];
        console.error('error loading', err);
      }
    );
  }

  findById(id :number):Observable<Customer>{
    let params = new HttpParams();
    const url =this.baseUrl+'/'+id;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Customer>(url,  {headers,params});
  }

  private getAll(filter: CustomerFilter): Observable<Customer[]> {
    const url = this.baseUrl ;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = {
      page_size: filter.pageSize,
      page_index: filter.pageIndex
    };
    return this.http.get<any>(url, {params, headers});

  }


  delete(entity: Customer) {

    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');

      let params = new HttpParams();
      url =this.baseUrl+'?id='+entity.id;
      return this.http.delete<Customer>(url,  {headers,params});

    return EMPTY;
  }

  update(entity: Customer) {

    let url = this.baseUrl;
    const headers = new HttpHeaders().set('content-type', 'application/json');

      let params = new HttpParams();
      return this.http.post<Customer>(url,  entity);

    return EMPTY;
  }

  insert(entity: Customer) {

    let url = this.baseUrl;
    const headers = new HttpHeaders().set('content-type', 'application/json');

      return this.http.put<Customer>(url, entity);

    return EMPTY;
  }
}

