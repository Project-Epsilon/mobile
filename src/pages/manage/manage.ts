import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Loading, LoadingController, NavController, NavParams} from "ionic-angular";


@Component({
  selector: "page-manage",
  templateUrl: "manage.html",
})
export class ManagePage {

  public loader: Loading;
  public action: string = "deposit";

  public currencies: Object;
  public wallets: any;

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
