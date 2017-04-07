import { Component, Input } from "@angular/core";

@Component({
  selector: "transaction",
  templateUrl: "transaction.component.html",
})
export class TransactionComponent {

  @Input() public transaction: any;

}
