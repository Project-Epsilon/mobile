import { Component, OnInit } from '@angular/core';
import { BankTransferService } from "../../../providers/bank.service";
import { Storage } from "@ionic/storage";
import { WalletsService } from "../../../providers/wallet.service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'deposit-component',
  templateUrl: './deposit.component.html'
})
export class DepositComponent {
  public currencies: Object;
  public wallets: any;
  public form: FormGroup;

  constructor(
    public bankSrv: BankTransferService,
    public storage: Storage,
    public walletSrv: WalletsService,
    private formBuilder: FormBuilder

  ) {
    this.form = this.formBuilder.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.storage.get('currencies')
      .then(currencies => {
        this.currencies = currencies;
        this.form.value.currency = this.currencies[0];
        this.setDecimalPlaces();
      });

    this.wallets = this.walletSrv.wallets
  }

  public setDecimalPlaces() {
    let minorUnit = this.form.value.currency.minor_unit;
    if (minorUnit == 0) {
      this.form.value.decimalPlaces = 1;
    } else {
      this.form.value.decimalPlaces = 1.0 / Math.pow(10, minorUnit);
    }
  }

  public submitAddMoney() {
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