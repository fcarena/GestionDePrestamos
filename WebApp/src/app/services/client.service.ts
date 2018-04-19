import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Client } from './../models/client.model'
@Injectable()
export class ClientService {
  API = 'http://localhost:3001/api/v1/clients';
  
  constructor(private _http:HttpClient) { }

  addClient(client:Client) {
    let _body = JSON.stringify(client);
    console.log(_body)
    let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'});
    return this._http.post(this.API, _body, { headers })
    .subscribe(resp =>{
      console.log(resp)
    })
}
}
