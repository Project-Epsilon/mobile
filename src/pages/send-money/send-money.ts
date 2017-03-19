import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, Loading, LoadingController, NavController, NavParams } from "ionic-angular";
import { TransferService } from "../../providers/transfer.service";
import { WalletsService } from "../../providers/wallet.service";
import { Alert } from "../../utils/Alert";
import { HomePage } from "../home/home";

@Component({
  selector: "page-send-money",
  templateUrl: "send-money.html",
})

export class SendMoneyPage {
  private form: FormGroup;
  private wallets: any;
  private validAmount = true;
  private maxAmount: number;
  private maxCurrency: number;
  private loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,

  ) {
    this.loader = this.loadingCtrl.create({
      content: "Processing transfer.",
    });

    this.form = this.formBuilder.group({
      amount: ["", [Validators.required, Validators.pattern("^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$")]],
      message: ["", Validators.maxLength(255)],
      receiver: ["", Validators.required],
      wallet: [this.navParams.get("wallet"), Validators.required],

    });

    this.wallets = this.walletSrv.wallets;
  }

  /**
   * If came here through homepage must reset to homepage before leaving
   */
  public ionViewDidLeave(){
    if(this.navParams.get("wallet")) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  /**
   * Updates the maximum amount of money the user can send based on his selected wallet.
   */
  public updateValidAmount() {
    if (!this.form.value.wallet) {
      return;
    } else {
      this.validAmount = (this.form.value.amount <= parseFloat(this.form.value.wallet.balance));
      this.maxAmount = this.form.value.wallet.balance;
      this.maxCurrency = this.form.value.wallet.currency_code;
    }
  }

  /**
   * Uses transfer server to send money to another user.
   */
  public send() {
    let receiver = {phone_number : "5145555555"};
      // this.sendMoneyForm.value.receiver;
    let amount = this.form.value.amount;
    let wallet = this.form.value.wallet;
    let message = this.form.value.message;

    let displayAmount = amount + " " + wallet.currency_code;

    let alertButtons = [
      { text: "Cancel", role: "cancel"},
      {
        handler: () => {
          this.loader.present().catch(f => f);
          this.transfSrv.send(
            receiver,
            amount,
            wallet.id,
            message,
          ).subscribe(
            (res) => {
              this.loader.dismiss().catch(f => f);
              this.handleSend(res, displayAmount)
            },
            (error) => {
              this.loader.dismiss().catch(f => f);
              Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
            },
          );
        },
        text: "Confirm",
      },
    ];

    Alert(this.alertCtrl, "Confirm transfer", "Do you want to transfer " + displayAmount, alertButtons);

  }

  /**
   * Updates user wallet and alerts user on successful transfer of money.
   * If unsuccessful, alerts user of the problem.
   *
   * @param res
   * @param displayAmount
   */
  private handleSend(res, displayAmount) {

    if (res.data) {
      this.form.reset();
      this.walletSrv.updateWalletId(this.form.value.wallet.id);

      Alert(
        this.alertCtrl,
        "Transfer Success",
        displayAmount + " has been successfully transfer from your account.",
        ["Dismiss"],
      );

    } else {
      Alert(
        this.alertCtrl,
        "Transfer Failed",
        displayAmount + " could not have been processed. " + res.errors.message,
        ["Dismiss"]);
    }
  }
}
