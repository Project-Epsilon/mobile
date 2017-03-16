import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {environment} from "../environments/environment";

@Injectable()
export class WalletsService {

  public wallets: any;

  constructor(
    public http: AuthHttp,
  ) {}

  /**
   * Gets all wallets of the user.
   * @returns {Observable|"../../Observable".Observable|"../../../Observable".Observable}
   */
  public getWallets() {
    let data = new Observable((observer) => {
      this.http.get(environment.server_url + "/api/wallet")
        .map((res) => res.json())
        .subscribe((res) => {
          this.wallets = res.data;
          observer.next(this.wallets);
          observer.complete();
        });
    });
    return data;
  }

  /**
   * Updates a wallet in this service.
   * @param walletUpdate
   */
  public updateWallet(walletUpdate) {
    let exists = false;

    for (let wallet of this.wallets) {
      if (wallet.id === walletUpdate.id) {
        wallet.balance = walletUpdate.balance;
        wallet.shown = walletUpdate.shown;
        wallet.order = walletUpdate.order;
        exists = true;
        break;
      }
    }

    if (! exists) {
      this.wallets.push(walletUpdate);
    }
  }

}
