import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ClientCompany } from './../models/client-company.model'

@Injectable()
export class ClientCompanyService {
  API = 'http://localhost:3001/api/v1/aproval';
  headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
  
  constructor(private _http: HttpClient) { }

  addRequestCredit(clientCompany: ClientCompany):Observable<any>  {
    let _body = JSON.stringify(clientCompany);
    return this._http.post(this.API, _body, { headers: this.headers })
    .map( resp =>{
      return resp;
    })
  }

  
  getRequestByClient(clientDocument: number):Observable<any> {
    return this._http.get(this.API+`/${clientDocument}`, { headers: this.headers }).map( resp =>{
      return resp;
    })
  }

}
