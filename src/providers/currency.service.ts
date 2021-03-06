import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import { environment } from "../environments/environment";

@Injectable()
export class CurrencyService {

  public currencies: any;
  public currencyMap: any = {};

  public constructor(public http: Http,
                     public storage: Storage) {
    this.storage.get("currencies")
      .then((currencies) => {
        this.currencies = currencies;
      });
  }

  public getCurrency(code) {
    return this.currencyMap[code];
  }

  public init() {
    this.http.get(environment.server_url + "/api/app/currencies")
      .map((res) => res.json())
      .subscribe((res) => {
        let currencies = res.data;
        this.currencies = currencies;

        this.mapCurrencies();

        this.storage.set("currencies", currencies);
      });
  }

  private mapCurrencies() {
    for (let currency of this.currencies) {
      this.currencyMap[currency.code] = currency;
    }
  }

}
