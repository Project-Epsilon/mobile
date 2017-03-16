import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AlertController, Loading, LoadingController, NavController, NavParams} from "ionic-angular";
import { InAppBrowser } from "ionic-native";
import { BankTransferService } from "../../providers/bank.service";
import { WalletsService } from "../../providers/wallet.service";

@Component({
  selector: "page-manage",
  templateUrl: "manage.html",
})
export class ManagePage {

  public loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
  ) {
      this.loader = this.loadingCtrl.create({
        content: "Processing bank transfer.",
      });
  }
}
