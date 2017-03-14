import { Component, OnInit } from '@angular/core';
import { BankTransferService } from "../../../providers/bank.service";
import { Storage } from "@ionic/storage";
import { WalletsService } from "../../../providers/wallet.service";


@Component({
  selector: 'deposit-component',
  templateUrl: './deposit.component.html'
})
export class DepositComponent implements OnInit {
  currencies: Object;
  wallets: any;

  constructor(
    public bankSrv: BankTransferService,
    public storage: Storage,
    public walletSrv: WalletsService
  ) { }

  ngOnInit() {
  }

  //******************************************************
  // AddMoney
  //******************************************************

  addMoney = {
    currency: null,
    amount: 0,
    decimalPlaces: 0
  };

  public setDecimalPlaces() {
    let minorUnit = this.addMoney.currency.minor_unit;
    if (minorUnit == 0) {
      this.addMoney.decimalPlaces = 1;
    } else {
      this.addMoney.decimalPlaces = 1.0 / Math.pow(10, minorUnit);
    }
  }

  public submitAddMoney() {
    this.bankSrv.deposit(this.addMoney.amount, this.addMoney.currency.code)
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
        // let paypalUrl = res.links[1].href;
        // let browser = new InAppBrowser(paypalUrl, '_blank', 'location=yes');
      });
  }

  ionViewDidLoad() {
    this.storage.get('currencies')
      .then(currencies => {
        this.currencies = currencies;
        this.addMoney.currency = this.currencies[0];
        this.setDecimalPlaces();
      });
    this.wallets = this.walletSrv.wallets
  }

}
