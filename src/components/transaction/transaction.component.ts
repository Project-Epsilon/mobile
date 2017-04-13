import { Component, Input } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { ModalController } from "ionic-angular";
import { environment } from "../../environments/environment";
import { BankTransferModalPage } from "../../pages/modals/banktransfer-modal/banktransfer-modal";
import {TransfersModalPage} from "../../pages/modals/transfers-modal/transfers-modal";

@Component({
  selector: "transaction",
  templateUrl: "transaction.component.html",
})
export class TransactionComponent {

  @Input() public transaction: any;
  constructor(
    private modalCtrl: ModalController,
    private http: AuthHttp,
  ) {}

  /**
   * Displays the modal page for the given transfer.
   *
   * @param transaction
   */
  public showTransferModal(transaction) {
    if (transaction.transaction_type === "bank") {
      this.http.get(environment.server_url + "/api/transfer/bank/transfer/" + transaction.transaction_id)
        .map((res) => res.json())
        .subscribe((res) => {
          this.modalCtrl.create(BankTransferModalPage, { transfer: res.data }).present();
        });
    } else {
      this.http.get(environment.server_url + "/api/transfer/user/transfer/" + transaction.transaction_id)
        .map((res) => res.json())
        .subscribe((res) => {
          let isIncoming = transaction.amount > 0 ? true : false;

          this.modalCtrl.create(TransfersModalPage, { transfer: res.data, isIncoming: isIncoming }).present();
        });
    }
  }
}
