import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import {AlertController, Loading, LoadingController, NavController, NavParams} from "ionic-angular";
import { InAppBrowser } from "ionic-native";
import { BankTransferService } from "../../providers/bank.service";
import { WalletsService } from "../../providers/wallet.service";
import {Alert} from "../../utils/Alert";

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
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Processing bank transfer.",
    });
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

    let alertButtons = [
      { text: "Cancel", role: "cancel"},
      {
        text: "Confirm",
        handler: () => {
          this.loader.present();

          this.bankSrv.withdraw(
            this.withdrawMoney.wallet.id,
            this.withdrawMoney.amount,
            this.withdrawMoney.email,
          ).subscribe((res) => this.handleWithdrawal(res, displayAmount), (error) => this.transferErrors = error);
        },
      },
    ];

    new Alert(this.alertCtrl,"Confirm withdraw", "Do you want to withdraw " + displayAmount, alertButtons);

  }

  private handleWithdrawal(res, displayAmount) {
    this.loader.dismiss();

    if (res.data){

      this.walletSrv.updateWallet(res.data);
      new Alert(
        this.alertCtrl,
        "Withdrawal Success",
        displayAmount + " has been successfully withdrawn from your account.",
        ["Dismiss"]
      );

    } else {
      new Alert(
        this.alertCtrl,
        "Withdrawal Failed",
        displayAmount + " could not have been processed." + res.errors.message,
        ["Dismiss"]);

    }

  }
}




