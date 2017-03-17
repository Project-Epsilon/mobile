import { Component } from "@angular/core";
import { ModalController, NavController, NavParams} from "ionic-angular";
import { TransfersModalPage} from "../modals/transfers-modal/transfers-modal";


@Component({
  selector: "page-transfers",
  templateUrl: "transfers.html",
})
export class TransfersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TransfersPage");
  }

  /**
   * Expands transaction to show more details
   */
  showTransferModal() {
    let modal = this.modalCtrl.create(TransfersModalPage);
    modal.present();
  }

  currencies: string = "CAD";
  action: string= "pending";
}
