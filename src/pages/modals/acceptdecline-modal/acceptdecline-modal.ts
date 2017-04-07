import { Component } from "@angular/core";
import { NavParams, ToastController, ViewController, Loading, AlertController, LoadingController } from "ionic-angular";
import { Alert } from "../../../utils/Alert";
import { TransferService } from "../../../providers/transfer.service";
import { WalletsService } from "../../../providers/wallet.service";

@Component({
    selector: "page-acceptdecline-modal",
    templateUrl: "acceptdecline-modal.html",
})
export class AcceptDeclineModalPage {
  private loader: Loading;
  private transfer: any;
  private transferProcessed: boolean = false;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Accepting funds.",
    });

    this.transfer = this.params.get("transfer");
  }

  /**
   * Allows user to accept a payment by inputting a token corresponding to the payment.
   */
  public accept() {
    this.loader.present().catch((f) => f);

    this.transfSrv.receive(this.transfer.token)
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
   * Close the modal page, returning transfer and if it was processed
   */
  public dismiss() {
    this.viewCtrl.dismiss(
      {
        transferProcessed: this.transferProcessed,
        transfer: this.transfer,
      }
    ).catch( (f) => f );
  }


  /**
   * Shows notification that contact was added successfully
   */
  private presentToast() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: "Transfer Success! Your wallet has been updated.",
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
      this.transferProcessed = true;
      this.presentToast();
    } else {
      Alert(this.alertCtrl, "Whoops!", "There was a problem processing the transfer.", ["Dismiss."]);
    }
  }

}
