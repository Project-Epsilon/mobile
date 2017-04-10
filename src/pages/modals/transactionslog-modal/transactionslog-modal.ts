import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";

@Component({
  selector: "page-transactionslog-modal",
  templateUrl: "transactionslog-modal.html",
})
export class TransactionsLogModalPage {

  public transfer;
  public to_or_from;
  public send_or_receive;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams) {
    this.transfer = this.params.get("transfer");

    if(this.transfer.amount > 0) {
      this.to_or_from = "From";
      this.send_or_receive = "Received on: ";
    }
    else if(this.transfer.amount < 0){
      this.to_or_from = "To";
      this.send_or_receive = "Sent on: ";
    }
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
