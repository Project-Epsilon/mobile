import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Loading } from "ionic-angular";
import { BankTransferService } from "../../../providers/bank.service";
import { WalletsService } from "../../../providers/wallet.service";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  constructor(
    public loader: Loading,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public bankSrv: BankTransferService,
    public walletSrv: WalletsService,
  ) {
    this.loader = this.loadingCtrl.create({
      content: 'Processing bank transfer.'
    });
  }

  ngOnInit() {

  }

  //******************************************************
  // Withdraw Money
  //******************************************************

  public withdrawMoney = {
    wallet: null,
    amount: null,
    email: ''
  };

  public
  submitWithDrawMoney(form) {
    console.log(form);
    let displayAmount = this.withdrawMoney.amount + ' ' + this.withdrawMoney.wallet.currency_code;

    this.alertCtrl.create({
      title: 'Confirm withdraw',
      message: 'Do you want to withdraw ' + displayAmount,
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {
          text: 'Confirm',
          handler: () => {
            this.loader.present();

            this.bankSrv.withdraw(
              this.withdrawMoney.wallet.id,
              this.withdrawMoney.amount,
              this.withdrawMoney.email
            ).subscribe(res => {

              this.loader.dismiss();
              if (res.data) {

                this.walletSrv.updateWallet(res.data);
                this.alertCtrl.create({
                  title: 'Withdrawal Success',
                  subTitle: displayAmount + ' has been successfully withdrawn from your account.',
                  buttons: ['Dismiss']
                }).present();

              } else {

                this.alertCtrl.create({
                  title: 'Withdrawal Failed',
                  subTitle: displayAmount + ' could not have been processed.',
                  buttons: ['Dismiss']
                }).present();

              }
            })
          }
        }
      ]
    }).present();
  }

}
