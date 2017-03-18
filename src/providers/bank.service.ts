import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class BankTransferService {
  data: any;


  constructor(public http: AuthHttp,) {
  }

  /**
   * Conducts the deposit operation with paypal.
   *
   * @param amount
   * @param currency
   * @returns {Observable|"../../../Observable".Observable|"../../Observable".Observable}
   */
  public deposit(amount, currency) {
    return new Observable((observer) => {
      this.http.post(environment.server_url + "/api/transfer/bank/deposit", {
        amount: amount,
        currency: currency
      })
        .subscribe((res) => {
          let data = res.json();

          observer.next(data);
          observer.complete();
        });
    });
  }

  public withdraw(wallet_id, amount, email) {
    return this.http.post(environment.server_url + "/api/transfer/bank/withdraw", {
      wallet_id,
      amount,
      email,
    })
      .map((res) => res.json());
  }

}
