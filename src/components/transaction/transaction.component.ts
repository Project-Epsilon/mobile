import { Component, Input } from "@angular/core";
import { HomePage } from "../../pages/home/home";

@Component({
  selector: "transaction",
  templateUrl: "transaction.component.html",
})
export class TransactionComponent {

  @Input() public transaction: any;

  constructor(public home: HomePage) {
  }


}
