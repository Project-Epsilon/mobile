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
  private wallets: any;

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
      wallet_id: ['', Validators.required],
      receiver: ['', Validators.required],
      message: ['']
    });

    this.wallets = this.walletSrv.wallets;

  }

  ionViewDidLoad() {

  }


  /**
   * Uses transfer server to send money to another user.
   *
   */
  public send(){


    let receiver = this.sendMoneyForm.value.receiver;
    let amount = this.sendMoneyForm.value.amount;
    let wallet_id = this.sendMoneyForm.value.wallet_id;
    let message = this.sendMoneyForm.value.message;

    this.transfSrv.send(receiver, amount, wallet_id, message)
      .subscribe(res => {
        console.log(res);
      });

  this.sendMoneyForm.reset();

  this.walletSrv.updateWallet(this.wallets);

  }

}
