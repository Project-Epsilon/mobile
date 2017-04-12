import { OnChanges, Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "transaction-log",
  templateUrl: "transaction-log.component.html",
})
export class TransactionLogComponent implements OnInit, OnChanges {

  @Input() public wallet: any;
  public transactions: any;

  /**
   * On input changes. Update the transactions.
   */
  public ngOnChanges() {
    this.transactions = this.wallet.transactions.data.reverse();
  }

  /**
   * Does logic.
   */
  public ngOnInit () {
    console.log('Hello1');
    this.transactions = this.wallet.transactions.data.reverse();
  }
}
