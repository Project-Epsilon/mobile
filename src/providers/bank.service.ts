import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {environment} from "../environments/environment";

@Injectable()
export class BankTransferService {
  public data: any;

  constructor(public http: AuthHttp) {
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
        amount,
        currency,
      })
        .subscribe((res) => {
          let data = res.json();

          observer.next(data);
          observer.complete();
        });
    });
  }

  public withdraw(walletId, amount, email) {
    return this.http.post(environment.server_url + "/api/transfer/bank/withdraw", {
      wallet_id: walletId,
      amount,
      email,
    })
      .map((res) => res.json());
  }

}
