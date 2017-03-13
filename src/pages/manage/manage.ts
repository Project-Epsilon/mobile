import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { BankTransferService } from '../../providers/bank.service';
import { Storage } from "@ionic/storage";
import { WalletsService } from "../../providers/wallet.service";

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage {

  currencies: Object;
  wallets: any;

  action: string = "deposit";
  loader: Loading;

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
  }



}


