import { AfterContentChecked, Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "transaction-log",
  templateUrl: "transaction-log.component.html",
})
export class TransactionLogComponent implements OnInit, AfterContentChecked {

  @Input() public wallet: any;
  public transactions: any;
  /**
   * Lifecycle hook that will change transactions whenver the wallet changes
   */
  public ngAfterContentChecked() {
    this.transactions = this.wallet.transactions.data.reverse();
  }

  /**
   * Does logic.
   */
  public ngOnInit () {
    this.transactions = this.wallet.transactions.data.reverse();
  }
}
