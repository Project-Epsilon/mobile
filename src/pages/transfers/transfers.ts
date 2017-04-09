import { Component } from "@angular/core";
import { AlertController, Loading, LoadingController, ModalController, NavParams } from "ionic-angular";
import { TransferService } from "../../providers/transfer.service";
import { WalletsService } from "../../providers/wallet.service";
import { Alert } from "../../utils/Alert";
import { TransfersModalPage } from "../modals/transfers-modal/transfers-modal";
import { AcceptDeclineModalPage } from "../modals/acceptdecline-modal/acceptdecline-modal";

@Component({
  selector: "page-transfers",
  templateUrl: "transfers.html",
})
export class TransfersPage {
  public token = "";
  public currencies: string = "CAD";
  public action: string = "incoming";
  public wallets: any;
  public outgoingTransfers: any;
  public incomingTransfers: any [] = [];
  private loader: Loading;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Loading transfers.",
    });

    this.loader.present().catch((f) => f);
    this.transfSrv.getIncomingTransactions()
      .subscribe((res) => {
        this.outgoingTransfers = res;
        this.loader.dismiss().catch((f) => f);
      });
    this.wallets = this.walletSrv.wallets;

    let transferToken = this.navParams.get("transferToken");
    if (transferToken) {
      this.addTransaction(transferToken);
    }
  }

  /**
   * Expands transaction to show more details
   * @param transfer
   */
  public showTransferModal(transfer) {
    let modal = this.modalCtrl.create(TransfersModalPage, {transfer});
    modal.present();
  }

  /**
   * Gets transaction information from server and adds it to list of transfers.
   * @param transferToken
   */
  public addTransaction (transferToken) {
    this.transfSrv.getTransferByToken(transferToken)
      .subscribe(
        (res) => {
          this.loader.dismiss().catch((f) => f);
          let transfer = <any> res;
          let transferWithToken = transfer.data;
          transferWithToken.token = transferToken;
          this.incomingTransfers.push(transferWithToken);
        },
        (err) => {
          this.loader.dismiss().catch((f) => f);
          Alert(this.alertCtrl, "Whoops!", err, ["Dismiss."]);
        },
      );
  }

  /**
   * Displays the modal page for the given transfer.
   *
   * @param transfer
   */
  public showAcceptDeclineModal (transfer) {
    let modal = this.modalCtrl.create(AcceptDeclineModalPage, { transfer });
    modal.present();
    modal.onDidDismiss(
      (res) => {
        if (res) {
          let transferIndex = this.incomingTransfers.indexOf(res);
          this.incomingTransfers.splice(transferIndex, 1);
        }
      },
    );
  }

}
