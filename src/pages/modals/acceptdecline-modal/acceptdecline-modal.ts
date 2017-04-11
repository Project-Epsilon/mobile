import { Component } from "@angular/core";
import { AlertController, Loading, LoadingController, NavParams, ToastController, ViewController } from "ionic-angular";
import { TransferService } from "../../../providers/transfer.service";
import { WalletsService } from "../../../providers/wallet.service";
import { Alert } from "../../../utils/Alert";

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
    this.transfSrv.decline(this.transfer.token)
      .subscribe(
        (res) => {
          this.handleDecline(res);
        },
        (error) => {
          Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
        },
      );
  }

  /**
   * Close the modal page, returning transfer only if it was processd
   */
  public dismiss() {
    if (!this.transferProcessed) {
      this.transfer = "";
    }

    this.viewCtrl.dismiss(
        this.transfer,
    ).catch( (f) => f );
  }

  /**
   * Shows notification that contact was added successfully
   * @param str
   */
  private presentToast(str) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: str,
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

      this.walletSrv.updateWalletId(res.data.receiver_wallet_id)
        .subscribe(
          () => {
            this.loader.dismiss().catch((f) => f);
            this.transferProcessed = true;
            this.presentToast("Transfer Success! Your wallet has been updated.");
            this.dismiss();
          },
        );
    } else {
      this.loader.dismiss().catch((f) => f);

      let error = res.json().errors.message;
      if ( error === "Transfer does not exists." ) {
        this.transferProcessed = true;
      }
      Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
      this.dismiss();
    }
  }

  /**
   * Declines the transfer token. This will mark the transfer as cancelled on the server.
   * @param res
   */
  private handleDecline(res) {
    if ( res.data ) {
      this.transferProcessed = true;
      this.presentToast("You have decline the transfer.");

    } else {
      let error = res.json().errors.message;
      if ( error === "Transfer does not exists." ) {
        this.transferProcessed = true;
      }
      Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
    }
    this.dismiss();
  }

}
