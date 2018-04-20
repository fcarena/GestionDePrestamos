import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Client } from './../models/client.model'


@Injectable()
export class ClientService {
  API = 'http://localhost:3001/api/v1/clients';
  headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
  clients:Client[] = [];
  constructor(private _http: HttpClient) { }

  addClient(client: Client):Observable<any>  {
    let _body = JSON.stringify(client);
    return this._http.post(this.API, _body, { headers: this.headers })
    .map( resp =>{
      console.log(resp);
      return resp;
    })
  }

  getClient(clientDocument: number):Observable<any> {
    
    return this._http.get(this.API+`/${clientDocument}`, { headers: this.headers }).map( resp =>{
      console.log(resp);
      return resp;
    })
  }
}
