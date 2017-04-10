import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";

@Component({
  selector: "page-transactionslog-modal",
  templateUrl: "transactionslog-modal.html",
})
export class TransactionsLogModalPage {

  public transfer;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams) {
    this.transfer = this.params.get("transfer");
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
