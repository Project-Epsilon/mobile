import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { BankTransferService } from '../../providers/bank.service';
import { Storage } from "@ionic/storage";
import { WalletsService } from "../../providers/wallet.service";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { DepositComponent } from "./deposit/deposit.component";

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
  deposit: DepositComponent;

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
    this.deposit = new DepositComponent(
      this.bankSrv
    );
  }

  ionViewDidLoad() {
    this.storage.get('currencies')
      .then(currencies => {
        this.currencies = currencies;
        this.deposit.addMoney.currency = this.currencies[0];
        this.deposit.setDecimalPlaces();
      });
    this.wallets = this.walletSrv.wallets
  }

}


