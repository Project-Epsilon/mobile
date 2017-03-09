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

  public send(){

    this.transfSrv.send(amount, wallet_id, option, recipient)
      .subscribe(res => {
        console.log(res);
      });

  }

  currencies: string= "USD";
  recipients: string= "trump";
}
