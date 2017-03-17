import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class TransferService {
  public data: any;

  constructor(
    public http: AuthHttp,
  ) {}

  /**
   * Sends a post request to the server to transfer money to another user.
   *
   * @param receiver
   * @param amount
   * @param walletId
   * @param message
   * @returns {Observable|"../../../Observable".Observable|"../../Observable".Observable}
   */
  public send(receiver, amount, walletId, message) {
    return new Observable((observer) => {
      this.http.post(environment.server_url + "/api/transfer/user/send", {
        receiver,
        amount,
        wallet_id: walletId,
        message,
      })
        .map((res) => res.json())
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  /**
   * Sends a post request to the server to receive money from another user.
   * @returns {Observable|"../../Observable".Observable|"../../../Observable".Observable}
   */
  public receive() {
    return new Observable((observer) => {
      this.http.post(environment.server_url + "/api/transfer/user/receive", {})
        .map((res) => res.json())
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }
}
