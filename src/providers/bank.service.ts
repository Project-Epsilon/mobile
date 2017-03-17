import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {environment} from "../environments/environment";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";

@Injectable()
export class BankTransferService {
    data: any;

    constructor(public http: AuthHttp) {
    }

    public deposit(amount, currency) {
        let data = new Observable(observer => {
            this.http.post(environment.server_url + "/api/transfer/bank/deposit", {
                amount: amount,
                currency: currency
            })
                .map(res => res.json())
                .subscribe(res => {

                    observer.next(res);
                    observer.complete();
                });
        });
        return data;
    }

    public withdraw(wallet_id, amount, email) {
        return this.http.post(environment.server_url + "/api/transfer/bank/withdraw", {
            wallet_id: wallet_id,
            amount: amount,
            email: email
        })
            .map(res => res.json());
    }

}
