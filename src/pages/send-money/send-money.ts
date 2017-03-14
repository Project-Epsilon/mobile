import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {WalletsService} from "../../providers/wallet.service";
import {TransferService} from "../../providers/transfer.service";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Alert} from "../../utils/Alert";

@Component({
  selector: "page-send-money",
  templateUrl: "send-money.html",
})

export class SendMoneyPage {
  private form: FormGroup;
  private wallets: any;
  private validAmount = true;
  private maxAmount : number;
  private maxCurrency : number;
  loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController

  )
  {
    this.loader = this.loadingCtrl.create({
      content: "Processing transfer.",
    });

    this.form = this.formBuilder.group({
      amount: ['', [Validators.required]],
      wallet: [null, Validators.required],
      receiver: ['', Validators.required],
      message: ['', Validators.maxLength(255)]
    });

    this.wallets = this.walletSrv.wallets;
  }

  ionViewDidLoad() {

  }

  /**
   * Uses transfer server to send money to another user.
   */
  public send(){
    let receiver = {phone_number : '5145555555'};
      //this.sendMoneyForm.value.receiver;
    let amount = this.form.value.amount;
    let wallet = this.form.value.wallet;
    let message = this.form.value.message;

    let displayAmount = amount + " " + wallet.currency_code;

    let alertButtons = [
      { text: "Cancel", role: "cancel"},
      {
        text: "Confirm",
        handler: () => {
          this.loader.present();

          this.transfSrv.send(
            receiver,
            amount,
            wallet.id,
            message
          ).subscribe(
            (res) => this.handleSend(res, displayAmount),
            (error) => {new Alert(this.alertCtrl,"Whoops!", error, ["Dismiss."]);}

            );
        },
      },
    ];

    new Alert(this.alertCtrl,"Confirm transfer", "Do you want to transfer " + displayAmount, alertButtons);

  }

  /**
   * Updates user wallet and alerts user on successful transfer of money.
   * If unsuccessful, alerts user of the problem.
   *
   * @param res
   * @param displayAmount
   */
  private handleSend(res, displayAmount) {
    this.loader.dismiss();

    if (res.data){
      this.form.reset();
      this.walletSrv.getWallets().subscribe((res) => this.wallets = res);

      new Alert(
        this.alertCtrl,
        "Transfer Success",
        displayAmount + " has been successfully transfer from your account.",
        ["Dismiss"]
      );

    } else {
      new Alert(
        this.alertCtrl,
        "Transfer Failed",
        displayAmount + " could not have been processed. " + res.errors.message,
        ["Dismiss"]);
    }
  }

  /**
   * Updates the maximum amount of money the user can send based on his selected wallet.
   */
  public updateValidAmount(){
    if (!this.form.value.wallet) {
      return;
    }
    else {
      this.validAmount = (this.form.value.amount <= parseFloat(this.form.value.wallet.balance));
      this.maxAmount = this.form.value.wallet.balance;
      this.maxCurrency = this.form.value.wallet.currency_code;
    }
  }

}
