import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Loading } from "ionic-angular";
import { BankTransferService } from "../../../providers/bank.service";
import { WalletsService } from "../../../providers/wallet.service";
import {Alert} from "../../../utils/Alert";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'withdraw-component',
  templateUrl: './withdraw.component.html'
})
export class WithdrawComponent implements OnInit {
  loader: Loading;
  private form: FormGroup;
  private wallets: any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public bankSrv: BankTransferService,
    public walletSrv: WalletsService,
    private formBuilder: FormBuilder
  ) {
    this.loader = this.loadingCtrl.create({
      content: 'Processing bank transfer.'
    });

    this.form = this.formBuilder.group({
      amount: ['', [Validators.required]],
      wallet: [null, Validators.required],
      email: ['', [Validators.required, Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')]]
    });

    this.wallets = this.walletSrv.wallets;
  }

  ngOnInit() {

  }

  ionViewDidLoad() {

  }

  public submitWithDrawMoney() {
    let displayAmount = this.form.value.amount  + " " + this.form.value.wallet.currency_code;

    let alertButtons = [
      { text: "Cancel", role: "cancel"},
      {
        text: "Confirm",
        handler: () => {
          this.loader.present();

          this.bankSrv.withdraw(
            this.form.value.wallet.id,
            this.form.value.amount,
            this.form.value.email,
          ).subscribe(
              (res) => this.handleWithdrawal(res, displayAmount),
              (error) => {new Alert(this.alertCtrl,"Whoops!", error, ["Dismiss."]);}
          );
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
