import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "transaction-log",
  templateUrl: "transaction-log.component.html",
})
export class TransactionLogComponent {

  @Input() public wallet: any;

}
