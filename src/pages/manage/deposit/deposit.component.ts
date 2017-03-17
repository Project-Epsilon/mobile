import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BankTransferService } from "../../../providers/bank.service";
import { WalletsService } from "../../../providers/wallet.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NavParams } from "ionic-angular";
import { InAppBrowser } from "ionic-native";
import { environment } from "../../../environments/environment";


@Component({
  selector: "deposit-component",
  templateUrl: "./deposit.component.html",
})
export class DepositComponent {
  private currencies: Object;
  private wallets: any;
  private form: FormGroup;
  private default_currency: Object;

  constructor(
    public bankSrv: BankTransferService,
    public storage: Storage,
    public walletSrv: WalletsService,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      amount: ["", Validators.required],
      currency: [this.default_currency, Validators.required]
    });
  }
  /**
   * Retrieves currencies from local storage and sets the appropriate decimal places.
   * Function is called when page loads.
   */
  public ngOnInit() {
    this.storage.get('currencies')
      .then(currencies => {
        this.currencies = currencies;
        this.form.value.currency = this.currencies[0];
        this.setDecimalPlaces();
      });
    if (this.navParams.get("currency"))
      this.default_currency = this.navParams.get("currency");
    console.log(this.navParams.get("currency"));
    this.wallets = this.walletSrv.wallets;
  }

  /**
   * Sets the appropriate decimal place in the form based on the currency used.
   */
  public setDecimalPlaces() {
    let minorUnit = this.form.value.currency.minor_unit;
    if (minorUnit === 0) {
      this.form.value.decimalPlaces = 1;
    } else {
      this.form.value.decimalPlaces = 1.0 / Math.pow(10, minorUnit);
    }
  }

  /**
   * Compares two currencies for equality
   *
   * @param currency1
   * @param currency2
   * @returns {boolean}
   */
  public isSameCurrency(currency1, currency2) {
    if (currency1 == null || currency2 == null)
      return null;
    return (currency1.code == currency2.code);
  }

  /**
   * Sends a deposit request to server. Opens up a paypal browser allowing user to deposit money.
   */
  public deposit() {
    this.bankSrv.deposit(this.form.value.amount, this.form.value.currency.code)
      .subscribe((res: any) => {
        if (res['data']){
          let browser = new InAppBrowser(res.data.url, "_blank");
          browser.on("loadstart")
            .subscribe((event) => {
              if (event.url.indexOf(environment.server_url + "/api/app/callback") == 0) {
                browser.close();

                let wallet = event.url.substring(event.url.indexOf("wallet=") + 7);

                wallet = JSON.parse(decodeURIComponent(wallet));
                this.walletSrv.updateWallet(wallet);
              }
            });
        }
      });
  }

}
