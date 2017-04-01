import { Component } from "@angular/core";
import { NavParams, ToastController, ViewController } from "ionic-angular";
import {Alert} from "../../../utils/Alert";

@Component({
    selector: "page-acceptdecline-modal",
    templateUrl: "acceptdecline-modal.html",
})
export class AcceptDeclineModalPage {

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    private toastCtrl: ToastController,

  ) {

  }

  /**
   * Allows user to accept a payment by inputting a token corresponding to the payment.
   */
  public accept() {
    this.loader.present().catch((f) => f);

    this.transfSrv.receive(this.token)
      .subscribe(
        (res) => {
          this.loader.dismiss().catch((f) => f);
          this.handleAccept(res);
        },
        (error) => {
          this.loader.dismiss().catch((f) => f);
          Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
        },
      );
  }

  /**
   * Declines the transaction and returns funds to sendee's wallet.
   */
  public decline () {

  }

  /**
   * Close the modal page.
   */
  public dismiss() {
      this.viewCtrl.dismiss( ).catch( (f) => f);
  }


  /**
   * Shows notification that contact was added successfully
   */
  private presentToast() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: "Contact was added successfully",
      position: "top",
    });

    toast.present();
  }

  /**
   * Updates the user's wallets if the receive was successful. Alerts the user if unsuccessful.
   * @param res
   */
  private handleAccept (res) {
    if ( res.data ) {
      this.walletSrv.updateWalletId(res.data.receiver_wallet_id);

      Alert(this.alertCtrl, "Transfer Success", "Your wallet has been updated.", ["Dismiss."]);
    } else {
      Alert(this.alertCtrl, "Whoops!", "There was a problem processing the transfer.", ["Dismiss."]);
    }

  }

}
