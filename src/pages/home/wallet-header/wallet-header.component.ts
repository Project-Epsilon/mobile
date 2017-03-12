import {Component, Input, AfterContentChecked} from "@angular/core";
import {CurrencyService} from "../../../providers/currency.service";
import {NavController} from "ionic-angular";
import {ManagePage} from "../../manage/manage";

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
  public ngAfterContentChecked(){
    this.currencyName = this.currencySrv.getCurrency(this.wallet.currency_code).name;
  }

  public foo(string){
    if(string=="add") {
      let currency = this.currencySrv.getCurrency(this.wallet.currency_code);
      this.navCtrl.setRoot(ManagePage, {wallet: this.wallet, action: "add", currency : currency});
    }
    else if(string=="remove"){
      //this.navCtrl.parent.select(1);
      this.navCtrl.setRoot(ManagePage, {wallet : this.wallet, action : "remove"});
    }
  }

}
