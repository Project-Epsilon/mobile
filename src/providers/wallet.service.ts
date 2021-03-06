import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { environment } from "../environments/environment";

@Injectable()
export class WalletsService {

  public wallets: any;

  constructor(
    public http: AuthHttp,
  ) { }

  /**
   * Gets all wallets of the user.
   * @returns {Observable|"../../Observable".Observable|"../../../Observable".Observable}
   */
  public getWallets() {
    return new Observable((observer) => {
      /* istanbul ignore next */
      this.http.get(environment.server_url + "/api/wallet")
        .map((res) => res.json())
        .subscribe((res) => {
          this.wallets = res.data;
          observer.next(this.wallets);
          observer.complete();
        });
    });
  }

  /**
   * Updates a wallet in this service.
   * @param walletUpdate
   */
  public updateWallet(walletUpdate) {
    let exists = false;
    /* istanbul ignore next */
    for (let wallet of this.wallets) {
      if (wallet.id === walletUpdate.id) {
        wallet.balance = walletUpdate.balance;
        wallet.visible = walletUpdate.visible;
        wallet.order = walletUpdate.order;
        wallet.transactions = walletUpdate.transactions;
        exists = true;
        break;
      }
    }
    /* istanbul ignore next */
    if (! exists) {
      this.wallets.push(walletUpdate);
    }
  }

  /**
   * Updates a wallet in this service given an id.
   *
   * @param walletId
   */
  public updateWalletId(walletId) {
    return new Promise((resolve) => {
      /* istanbul ignore next */
      this.http.get(environment.server_url + "/api/wallet/" + walletId)
        .map((res) => res.json())
        .subscribe((res) => {
          let wallet = res.data;
          this.updateWallet(wallet);

          resolve(wallet);
        });
    });
  }

}
