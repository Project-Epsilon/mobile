import {Component, Input, OnInit} from "@angular/core";
import {CurrencyService} from "../../../providers/currency.service";

@Component({
  selector: "wallet-header",
  templateUrl: "wallet-header.component.html",
})
export class WalletHeaderComponent implements AfterContentChecked {

  @Input() wallet: any;
  currencyName: string;

  constructor(
    public currencySrv: CurrencyService,
  ) {}

  /**
   * Lifecycle hook whenever content changes update the currency name
   */
  public ngAfterContentChecked(){
    this.currencyName = this.currencySrv.getCurrency(this.wallet.currency_code).name;
  }

}
