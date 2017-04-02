import { Component } from "@angular/core";
import { AlertController, Loading, LoadingController, ModalController } from "ionic-angular";
import { TransferService } from "../../providers/transfer.service";
import { WalletsService } from "../../providers/wallet.service";
import { Alert } from "../../utils/Alert";
import { TransfersModalPage} from "../modals/transfers-modal/transfers-modal";

@Component({
  selector: "page-transfers",
  templateUrl: "transfers.html",
})
export class TransfersPage {
  public token = "";
  public currencies: string = "CAD";
  public action: string = "pending";
  public wallets: any;
  public pending: any;
  private loader: Loading;

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Processing transfer.",
    });

    this.transfSrv.getPendingTransactions()
      .subscribe((pending) => {
        this.pending = pending;
      });
    this.wallets = this.walletSrv.wallets;
  }

  /**
   * Expands transaction to show more details
   */
  public showTransferModal() {
    let modal = this.modalCtrl.create(TransfersModalPage);
    modal.present().then();
  }

  /**
   * Allows user to accept a payment by inputting a token corresponding to the payment.
   */
  public receive () {
    if ( this.token.length !== 128 ) {
      Alert( this.alertCtrl, "Whoops!", "Please enter a valid transfer token.", ["Dismiss."] );

    } else {

      this.loader.present().catch((f) => f);

      this.transfSrv.receive(this.token)
        .subscribe(
          (res) => {
            this.loader.dismiss().catch((f) => f);
            this.handleReceive(res);
          },
          (error) => {
            this.loader.dismiss().catch((f) => f);
            Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
          },
        );
    }
  }

  /**
   * Updates the user's wallets if the receive was successful. Alerts the user if unsuccessful.
   * @param res
   */
  public handleReceive (res) {
    if ( res.data ) {
      this.token = "";
      this.walletSrv.updateWalletId(res.data.receiver_wallet_id);

      Alert(this.alertCtrl, "Transfer Success", "Your wallet has been updated.", ["Dismiss."]);
    } else {
      Alert(this.alertCtrl, "Whoops!", "There was a problem processing the transfer.", ["Dismiss."]);
    }

  }

  public foo(){
    console.log(this.pending);
    console.log(this.pending.data);
    console.log(this.pending.data[0]);
    console.log(this.pending.data[0].amount);
  }

}
