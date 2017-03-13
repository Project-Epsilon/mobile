import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class BankTransferService {
  data: any;

  constructor(
    public http: AuthHttp,
  ) {}

  public deposit(amount, currency) {
    let data = new Observable((observer) => {
      this.http.post(environment.server_url + "/api/transfer/bank/deposit", {
          amount,
          currency,
        })
        .map((res) => res.json())
        .subscribe((res) => {

          observer.next(res);
          observer.complete();
        });
    });
    return data;
  }

  public withdraw(wallet_id, amount, email){
      return this.http.post(environment.server_url + "/api/transfer/bank/withdraw", {
          wallet_id,
          amount,
          email,
        })
        .map((res) => res.json());
  }

}
