import { Component } from "@angular/core";
import { AlertController, Loading, LoadingController, ModalController, NavParams } from "ionic-angular";
import { TransferService } from "../../providers/transfer.service";
import { WalletsService } from "../../providers/wallet.service";
import { Alert } from "../../utils/Alert";
import { AcceptDeclineModalPage } from "../modals/acceptdecline-modal/acceptdecline-modal";

@Component({
  selector: "page-transfers",
  templateUrl: "transfers.html",
})
export class TransfersPage {
  public token = "";
  public currencies: string = "CAD";
  public action: string = "pending";
  public wallets: any;
  private loader: Loading;
  public pendingTransfers: any[];

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public loadingCtrl: LoadingController,
  ) {

    this.loader = this.loadingCtrl.create({
      content: "Adding transfer.",
    });


    this.wallets = this.walletSrv.wallets;

    let transferToken = this.navParams.get("transferToken");
    if (transferToken) {
      this.addTransaction(transferToken);
    }
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
          let transfer = res;
          transfer["token"] = transferToken;
          this.pendingTransfers.push(transfer);
        },
        (error) => {
          this.loader.dismiss().catch((f) => f);
          Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
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
  }

}
