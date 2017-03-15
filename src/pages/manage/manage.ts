import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AlertController, Loading, LoadingController, NavController, NavParams} from "ionic-angular";
import { InAppBrowser } from "ionic-native";
import { BankTransferService } from "../../providers/bank.service";
import { WalletsService } from "../../providers/wallet.service";
import {HomePage} from "../home/home";

@Component({
  selector: "page-manage",
  templateUrl: "manage.html",
})
export class ManagePage {

  currencies: Object;
  wallets: any;

  action: string = "deposit";
  loader: Loading;

  private transferErrors: Error;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bankSrv: BankTransferService,
    public storage: Storage,
    public walletSrv: WalletsService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
      this.loader = this.loadingCtrl.create({
        content: "Processing bank transfer.",
      });
  }

  /**
   * If came here through homepage must reset to homepage before leaving
   */
  ionViewDidLeave(){
    if(this.navParams.get("wallet")) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidEnter(){
    if(this.navParams.get("wallet")){
      if(this.navParams.get("action")=="withdraw"){
        this.action = "withdraw";
        // this.withdrawMoney = {
        //   wallet: this.navParams.get("wallet"),
        //   amount: 0,
        //   email: "",
        // }
      } else {
        this.action = "deposit";
        // this.addMoney = {
        //   currency: this.navParams.get("currency"),
        //   amount: 0,
        //   decimalPlaces: 0.01,
        // };
      }
    }
  }
}
