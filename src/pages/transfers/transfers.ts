import { Component } from "@angular/core";
import { ModalController, NavController, NavParams, AlertController, Loading, LoadingController } from "ionic-angular";
import { TransfersModalPage} from "../modals/transfers-modal/transfers-modal";
import { Alert } from "../../utils/Alert";
import { TransferService } from "../../providers/transfer.service";
import { WalletsService } from "../../providers/wallet.service";

@Component({
  selector: "page-transfers",
  templateUrl: "transfers.html",
})
export class TransfersPage {
  private loader: Loading;
  public token: string;
  public currencies: string = "CAD";
  public action: string= "pending";
  public wallets: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public transfSrv: TransferService,
    public walletSrv: WalletsService,
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Processing transfer.",
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

  public receive () {
    if ( this.token.length !== 128 ) {
      Alert( this.alertCtrl, "Whoops!", "Please enter a valid transfer token.", ["Dismiss."] );

    } else {

      this.loader.present().catch(f => f);

      this.transfSrv.receive(this.token)
        .subscribe(
          (res) => {
            this.loader.dismiss().catch(f => f);
            this.handleReceive(res);
          },
          (error) => {
            this.loader.dismiss().catch(f => f);
           Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]);
          },
        )
    }
  }

  public handleReceive (res) {
    if( res.data ) {
      this.token = "";
      this.walletSrv.getWallets().subscribe( (walletRes) => this.wallets = walletRes);
      Alert(this.alertCtrl, "Transfer Success", "Your wallet has been updated.", ["Dismiss."])
    } else {
      Alert(this.alertCtrl, "Whoops!", "There was a problem processing the transfer.", ["Dismiss."])
    }

  }
}

