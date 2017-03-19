import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Loading, LoadingController, NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-manage",
  templateUrl: "manage.html",
})
export class ManagePage {

  public currencies: Object;
  public wallets: any;

  public action: string = "deposit";
  private loader: Loading;

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

  /**
   * If came here through homepage must reset to homepage before leaving
   */
  public ionViewDidLeave() {
    if (this.navParams.get("wallet")) {
      this.navCtrl.pop().catch((f) => f);
    }
  }

  /**
   * Determines which manage page to show user depending on button clicked
   */
  public ionViewDidEnter() {
    if (this.navParams.get("wallet")) {
      if (this.navParams.get("action") === "withdraw") {
        this.action = "withdraw";
      } else {
        this.action = "deposit";
      }
    }
  }
}
