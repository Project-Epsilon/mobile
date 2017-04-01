import { Component } from "@angular/core";
import { AlertController, Loading, LoadingController, ModalController, NavParams } from "ionic-angular";
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
  private acceptLoader: Loading;
  private addLoader: Loading;
  public pendingTransfers: any[];

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public loadingCtrl: LoadingController,
  ) {
    this.acceptLoader = this.loadingCtrl.create({
      content: "Processing transfer.",
    });
    this.addLoader = this.loadingCtrl.create({
      content: "Adding transfer.",
    });


    this.wallets = this.walletSrv.wallets;

    let transferToken = this.navParams.get("transferToken");
    if (transferToken) {
      this.addTransaction(transferToken);
    }

  }
  /**
   * Expands transaction to show more details
   */
  public showTransferModal() {
    let modal = this.modalCtrl.create(TransfersModalPage);
    modal.present().then();
  }

  /**
   * Gets transaction information from server and adds it to list of transfers.
   * @param transferToken
   */
  public addTransaction (transferToken) {
    this.transfSrv.getTransferByToken(transferToken)
      .subscribe(
        (res) => {
          this.acceptLoader.dismiss().catch((f) => f);
          this.pendingTransfers.push(res);
        },
        (error) => {
          this.acceptLoader.dismiss().catch((f) => f);
          Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
        },
      );
  }

  
}
