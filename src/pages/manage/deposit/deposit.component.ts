import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { BankTransferService } from "../../../providers/bank.service";
import { WalletsService } from "../../../providers/wallet.service";

@Component({
  selector: "deposit-component",
  templateUrl: "./deposit.component.html",
})
export class DepositComponent {
  private currencies: Object;
  private wallets: any;
  private form: FormGroup;

  constructor(
    public bankSrv: BankTransferService,
    public storage: Storage,
    public walletSrv: WalletsService,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      amount: ["", Validators.required],
      currency: ["", Validators.required],
    });
  }

  /**
   * Retrieves currencies from local storage and sets the appropiate decimal places.
   * Function is called when page loads.
   */
  public ionViewDidLoad() {
    this.storage.get("currencies")
      .then((currencies) => {
        this.currencies = currencies;
        this.form.value.currency = this.currencies[0];
        this.setDecimalPlaces();
      });

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
   * Sends a deposit request to server. Opens up a paypal browser allowing user to deposit money.
   */
  public deposit() {
    this.bankSrv.deposit(this.form.value.amount, this.form.value.currency.code)
      .subscribe((res) => {
        // console.log(res);
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
        // let paypalUrl = res.links[1].href;
        // let browser = new InAppBrowser(paypalUrl, '_blank', 'location=yes');
      });
  }
}
