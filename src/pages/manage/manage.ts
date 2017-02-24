import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {BankTransfer} from '../../providers/bank-transfer';

/*
  Generated class for the Manage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
  providers: [BankTransfer]
})
export class ManagePage {
  data: any;
  message: string;
  paypalUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bankTransferService: BankTransfer) {
  }
    ionViewDidLoad() {
      console.log('ionViewDidLoad ManagePage');
  }

  currencies: string = "CAD";
  action: string="add_money";

  public withdraw() {
    this.test('11','CAD');
  }


  public test(amount, currency) {
    this.bankTransferService.post(amount, currency)
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


