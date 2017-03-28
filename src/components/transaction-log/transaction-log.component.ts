import {Component, Input} from "@angular/core";
import {HomePage} from "../../pages/home/home";

@Component({
  selector: "transaction-log",
  templateUrl: "transaction-log.component.html",
})
export class TransactionLogComponent {

  @Input() public wallet: any;
  public transactions: any; //make this array and shove in multiple wallets

  public ngAfterContentChecked() {
    console.log(this.wallet);
    this.transactions = this.wallet.transactions.data;
    console.log(this.transactions);
  }
  constructor(public home: HomePage) {

    this.transactions = this.getWallet()[0].transactions.data;
    console.log(this.transactions);
  }

  getWallet(){
    return this.home.wallets;
  }

  getTransactions(){
    //this.wallets[0].transactions.data[0].amount);
  }
}
