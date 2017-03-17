import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AlertController, Loading, LoadingController, NavController, NavParams} from "ionic-angular";
import { BankTransferService } from "../../providers/bank.service";
import { WalletsService } from "../../providers/wallet.service";
import { HomePage } from "../home/home";

@Component({
  selector: "page-manage",
  templateUrl: "manage.html",
})
export class ManagePage {

  currencies: Object;
  wallets: any;

  action: string = "deposit";
  loader: Loading;

  private transferErrors: Error;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public walletSrv: WalletsService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

      this.loader = this.loadingCtrl.create({
        content: "Processing bank transfer.",
      });
  }

  /**
   * If came here through homepage must reset to homepage before leaving
   */
  ionViewDidLeave(){
    if(this.navParams.get("wallet")) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  /**
   * Determines which manage page to show user depending on button clicked
   */
  ionViewDidEnter(){
    if(this.navParams.get("wallet")){
      if(this.navParams.get("action")=="withdraw"){
        this.action = "withdraw";
      } else {
        this.action = "deposit";
      }
    }
  }
}
