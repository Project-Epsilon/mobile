import { Component, OnInit } from '@angular/core';
import { BankTransferService } from "../../../providers/bank.service";
import { Storage } from "@ionic/storage";
import { WalletsService } from "../../../providers/wallet.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NavParams } from "ionic-angular";


@Component({
  selector: 'deposit-component',
  templateUrl: './deposit.component.html'
})
export class DepositComponent implements OnInit {
  public currencies: Object;
  public default_currency: Object;
  public wallets: any;
  public form: FormGroup;

  constructor(
    public bankSrv: BankTransferService,
    public storage: Storage,
    public walletSrv: WalletsService,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      amount: ['', Validators.required],
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
    if (minorUnit == 0) {
      this.form.value.decimalPlaces = 1;
    }
    else {
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
      .subscribe(res => {
        console.log(res);
        /**
         * Relavent information
         * data.transactions.description
         * data.transactions.invoice_number
         * data.create_time
         * data.id
         * data.links[i].href
         *    0 - GET
         *    1 - REDIRECT
         *    2 - POST
         */
        //let paypalUrl = res.links[1].href;
        // let browser = new InAppBrowser(paypalUrl, '_blank', 'location=yes');
      });
  }
}
