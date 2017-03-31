import { Component, Input } from "@angular/core";
import { HomePage } from "../../pages/home/home";

@Component({
  selector: "transaction-log",
  templateUrl: "transaction-log.component.html",
})
export class TransactionLogComponent {

  @Input() public wallet: any;
  public transactions: any;


  constructor(public home: HomePage) {
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

}
