import { Component } from "@angular/core";
import {HomePage} from "../../pages/home/home";

@Component({
  selector: "transaction-log",
  templateUrl: "transaction-log.component.html",
})
export class TransactionLogComponent {

  public transactions: any; //make this array and shove in multiple wallets

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
