import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "page-banktransfer-modal",
  templateUrl: "banktransfer-modal.html",
})
export class BankTransferModalPage {

  public transfer: Object;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public params: NavParams,
  ) {
    this.transfer = this.params.get("transfer");
  }

  /**
   * Dismiss view
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
