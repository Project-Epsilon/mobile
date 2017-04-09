import { Component, Input } from "@angular/core";
import { HomePage } from "../../pages/home/home";
import { TransfersModalPage } from "../../pages/modals/transfers-modal/transfers-modal";
import { ModalController } from "ionic-angular";

@Component({
  selector: "transaction-log",
  templateUrl: "transaction-log.component.html",
})
export class TransactionLogComponent {

  @Input() public wallet: any;
  public transactions: any;

  constructor(
    public home: HomePage,
    public modalCtrl: ModalController,
  ) {
    this.transactions = this.getWallet()[0].transactions.data;
  }

  /**
   * Lifecycle hook that will change transactions whenver the wallet changes
   */
  public ngAfterContentChecked() {
    this.transactions = this.wallet.transactions.data;
  }

  /**
   * Returns all wallets that user contains
   *
   * @returns {Object}
   */
  public getWallet() {
    return this.home.wallets;
  }

  /**
   * Displays the modal page for the given transfer.
   *
   * @param transfer
   */
  public showTransferModal(transfer) {
    let modal = this.modalCtrl.create(TransfersModalPage, { transfer });
    modal.present();
  }
}
