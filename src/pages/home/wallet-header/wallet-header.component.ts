import {Component, Input, OnInit} from "@angular/core";
import {CurrencyService} from "../../../providers/currency.service";

@Component({
  selector: "wallet-header",
  templateUrl: "wallet-header.component.html",
})
export class WalletHeaderComponent implements OnInit {

  @Input() wallet: any;
  currencyName: string;

  constructor(
    public currencySrv: CurrencyService,
  ) {}

  ngOnInit() {
    this.currencyName = this.currencySrv.getCurrency(this.wallet.currency_code).name;
  }

}
