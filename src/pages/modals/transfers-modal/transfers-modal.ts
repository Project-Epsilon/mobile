import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: "page-transfers-modal",
  templateUrl: "transfers-modal.html",
})
export class TransfersModalPage {

  constructor(public viewCtrl: ViewController) {}

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
