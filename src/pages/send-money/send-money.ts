import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WalletsService} from "../../providers/wallet.service";
import {TransferService} from "../../providers/transfer.service";


/*
  Generated class for the SendMoney page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-send-money",
  templateUrl: "send-money.html",
})
export class SendMoneyPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public transfSrv: TransferService,
    public walletSrv: WalletsService
) {

  }

  ionViewDidLoad() {

  }

  sendMoneyForm = {
  receiver: null,
  amount: 0,
  wallet_id: null,
  message: ""
  };

  /**
   * Uses transfer server to send money to another user.
   *
   * @param form
   */
  public send(form){
  let receiver = this.sendMoneyForm.receiver;
  let amount = this.sendMoneyForm.amount;
  let wallet_id = this.sendMoneyForm.wallet_id;
  let message = this.sendMoneyForm.message;

    this.transfSrv.send(receiver, amount, wallet_id, message)
      .subscribe(res => {
        console.log(res);
      });

  }

}
