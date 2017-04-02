import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";

@Component({
  selector: "page-transfers-modal",
  templateUrl: "transfers-modal.html",
})
export class TransfersModalPage {

  public transfer;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams) {
    this.transfer = this.params.get("transfer");
    console.log(this.transfer);
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
