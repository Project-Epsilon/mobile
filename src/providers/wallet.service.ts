import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

/*
 Generated class for the WalletsService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class WalletsService {

    wallets;

    constructor(public http: AuthHttp) {
    }

    /**
     * Gets all wallets of the user.
     * @returns {Observable|"../../Observable".Observable|"../../../Observable".Observable}
     */
    public getWallets() {
        let data = new Observable(observer => {
            this.http.get(environment.server_url + '/api/wallet')
                .map(res => res.json())
                .subscribe(res => {
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

        //Find and update the wallet.
        for (let wallet of this.wallets) {
            if (wallet.id == walletUpdate.id) {
                wallet.balance = walletUpdate.balance;
                wallet.shown = walletUpdate.shown;
                wallet.order = walletUpdate.order;
                exists = true;
                break;
            }
        }

        //If the wallet does not exists push it to the array
        if (!exists) {
            this.wallets.push(walletUpdate);
        }
    }

}
