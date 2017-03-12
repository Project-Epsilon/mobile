import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import {AlertController, Loading, LoadingController, NavController, NavParams} from "ionic-angular";
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

  action: string = "add_money";
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

  //refactoring will be needed
  ionViewDidEnter(){
    
    //If came through home page
    if(this.navParams.get("wallet")){
      console.log(this.navParams.get("action"));
      if(this.navParams.get("action")=="remove"){
        this.action = "withdraw";
        this.withdrawMoney = {
          wallet: this.navParams.get("wallet"),
          amount: this.navParams.get("wallet").balance, //should be 0
          email: "", //TODO
        }
      } else {
        this.action = "add_money";
        console.log(this.navParams.get("currency"));
        this.addMoney = {
          currency: this.navParams.get("currency"),
          amount: this.navParams.get("wallet").balance,
          decimalPlaces: 0.01, //What should this be
        };

      }
    }
  }

  ionViewDidLoad() {
    this.storage.get("currencies")
      .then((currencies) => {
        this.currencies = currencies;
        this.addMoney.currency = this.currencies[0];
        this.setDecimalPlaces();
      });
    this.wallets = this.walletSrv.wallets;
  }

  //******************************************************
  // AddMoney
  //******************************************************

  addMoney = {
    currency: null,
    amount: 0,
    decimalPlaces: 0,
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
      .subscribe((res) => {
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

  //******************************************************
  // Withdraw Money
  //******************************************************

  public withdrawMoney = {
    wallet: null,
    amount: null,
    email: "",
  };

  public submitWithDrawMoney(form) {
    console.log(form);
    let displayAmount = this.withdrawMoney.amount  + " " + this.withdrawMoney.wallet.currency_code;

    this.alertCtrl.create({
      title: "Confirm withdraw",
      message: "Do you want to withdraw " + displayAmount,
      buttons: [
        { text: "Cancel", role: "cancel"},
        {
          text: "Confirm",
          handler: () => {
            this.loader.present();

            this.bankSrv.withdraw(
              this.withdrawMoney.wallet.id,
              this.withdrawMoney.amount,
              this.withdrawMoney.email,
            ).subscribe((res) => {

              this.loader.dismiss();
              if (res.data){

                this.walletSrv.updateWallet(res.data);
                this.alertCtrl.create({
                  title: "Withdrawal Success",
                  subTitle: displayAmount + " has been successfully withdrawn from your account.",
                  buttons: ["Dismiss"],
                }).present();

              } else {

                this.alertCtrl.create({
                  title: "Withdrawal Failed",
                  subTitle: displayAmount + " could not have been processed.",
                  buttons: ["Dismiss"],
                }).present();

              }
            });
          },
        },
      ],
    }).present();
  }

}
