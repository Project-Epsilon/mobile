import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {BankTransfer} from '../../providers/bank-transfer';

//import { Config } from '../env';  // Fast workaround for global variables. Use apiUrl
//let config = new Config();
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public bankTransferService: BankTransfer) {
    this.test();
  }
    ionViewDidLoad() {
      console.log('ionViewDidLoad ManagePage');
  }

  currencies: string = "CAD";
  action: string="add_money";

  public withdraw() {

    //let browser = new InAppBrowser(config.apiUrl, '_system');
  }


  public test() {
    this.bankTransferService.post()
      .then(data => {
        this.data = data;
        this.message = this.data.message;
      });
  }

}


