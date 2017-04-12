import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "page-transfers-modal",
  templateUrl: "transfers-modal.html",
})
export class TransfersModalPage {

  public transfer;
  public isIncoming;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams) {
    this.transfer = this.params.get("transfer");
    this.isIncoming = this.params.get("isIncoming");
  }

  /**
   * Dismiss view
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
