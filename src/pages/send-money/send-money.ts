import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WalletsService} from "../../providers/wallet.service";
import {TransferService} from "../../providers/transfer.service";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "page-send-money",
  templateUrl: "send-money.html",
})
export class SendMoneyPage {
  private sendMoneyForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    private formBuilder: FormBuilder
  )
  {
    this.sendMoneyForm = this.formBuilder.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      receiver: ['', Validators.required],
      message: ['']
    });

  }

  ionViewDidLoad() {

  }


  /**
   * Uses transfer server to send money to another user.
   *
   */
  public send(){

  /*let receiver = this.sendMoneyForm.receiver;
  let amount = this.sendMoneyForm.amount;
  let wallet_id = this.sendMoneyForm.wallet_id;
  let message = this.sendMoneyForm.message;*/

  console.log(this.sendMoneyForm.value);

  /*this.transfSrv.send(receiver, amount, wallet_id, message)
    .subscribe(res => {
      console.log(res);
    });*/

  }

}
