import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {AuthHttp} from "angular2-jwt";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
  Generated class for the TransferService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TransferService {

  constructor(
    public http: AuthHttp
  ) {}

  /**
   *
   * @param amount
   * @param currency
   * @param recipient
   * @returns {Observable|"../../../Observable".Observable|"../../Observable".Observable}
   */
  public send(amount, currency, recipient) {
    let data = new Observable(observer => {
      this.http.post(environment.server_url + "/api/transfer/user/send", {
        amount: amount,
        currency: currency,
        recipient: recipient
      })
        .map(res => res.json())
        .subscribe(res => {

          observer.next(res);
          observer.complete();
        });
    });
    return data;
  }

  public receive() {
    let data = new Observable(observer => {
      this.http.post(environment.server_url + "/api/transfer/user/receive", {

      })
        .map(res => res.json())
        .subscribe(res => {

          observer.next(res);
          observer.complete();
        });
    });
    return data;
  }


}
