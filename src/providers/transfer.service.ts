import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class TransferService {
  data: any;

  constructor(
    public http: AuthHttp
  ) {}

  /**
   * Sends a post request to the server to transfer money to another user.
   *
   * @param amount
   * @param wallet_id
   * @param option - This is either 0 (phone number), 1 (email) or 2 (both)
   * @param recipient - This contains the information corresponding to the above option, along with a message.
   * @returns {Observable}
   */
  public send(amount, wallet_id, option, recipient) {
    let data = new Observable(observer => {
      this.http.post(environment.server_url + "/api/transfer/user/send", {
        amount: amount,
        wallet_id: wallet_id,
        option: option,
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
