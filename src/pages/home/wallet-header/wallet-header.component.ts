import { Component, Input, AfterContentChecked } from "@angular/core";
import { CurrencyService } from "../../../providers/currency.service";
import { NavController } from "ionic-angular";
import { ManagePage } from "../../manage/manage";
import { SendMoneyPage } from "../../send-money/send-money";

@Component({
  selector: "wallet-header",
  templateUrl: "wallet-header.component.html",
})
export class WalletHeaderComponent implements AfterContentChecked {

  @Input() wallet: any;
  currencyName: string;

  constructor(
    public currencySrv: CurrencyService,
    public navCtrl: NavController
  ) {}

  /**
   * Lifecycle hook whenever content changes update the currency name
   */
  public ngAfterContentChecked() {
    this.currencyName = this.currencySrv.getCurrency(this.wallet.currency_code).name;
  }

  /**
   * Redirects to appropriate page based off clicked action tab (deposit, withdraw, send)
   *
   * @param string
   */
  public redirect(string) {
    if (string == "deposit") {
      let currency = this.currencySrv.getCurrency(this.wallet.currency_code);
      this.navCtrl.push(ManagePage, {wallet: this.wallet, action: "deposit", currency: currency});
    }
    else if (string == "withdraw") {
      this.navCtrl.push(ManagePage, {wallet: this.wallet, action: "withdraw"});
    }
    else if (string == "send") {
      this.navCtrl.push(SendMoneyPage, {wallet: this.wallet});
    }
  }

}
