import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { BankTransferService } from '../../providers/bank.service';
import { Storage } from "@ionic/storage";
import { WalletsService } from "../../providers/wallet.service";
import {WithdrawComponent} from "./withdraw/withdraw.component";

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage {

  currencies: Object;
  wallets: any;

  action: string = "add_money";
  loader: Loading;

  withdraw: WithdrawComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bankSrv: BankTransferService,
    public storage: Storage,
    public walletSrv: WalletsService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: 'Processing bank transfer.'
    });
    this.withdraw = new WithdrawComponent(
      this.loader,
      this.alertCtrl,
      this.loadingCtrl,
      this.bankSrv,
      this.walletSrv
    );
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

}


