import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {BankTransfer} from '../../providers/bank-transfer';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage {

  data: any;
  message: string;
  paypalUrl: string;
  currencies: Object;

  action: string = "add_money";

  addMoney = {
    currency: null,
    amount: 0,
    decimalPlaces: 0
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bankTransferService: BankTransfer,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    this.storage.get('currencies')
      .then(currencies => {
        this.currencies = currencies;
        this.addMoney.currency = this.currencies[0];
        this.setDecimalPlaces();
      });
  }

  /**
   *
   */
  public setDecimalPlaces() {
    let minorUnit = this.addMoney.currency.minor_unit;
    if (minorUnit == 0) {
      this.addMoney.decimalPlaces = 1;
    } else {
      this.addMoney.decimalPlaces = 1.0 / Math.pow(10, minorUnit);
    }
  }

  public submitAddMoney() {
    this.bankTransferService.post(this.addMoney.amount, this.addMoney.currency.code)
      .then(data => {
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
        this.data = data;
        this.message = this.data.message;
        this.paypalUrl = this.data.links[1].href;

        let browser = new InAppBrowser(this.paypalUrl, '_blank', 'location=yes');
      });
  }

}


