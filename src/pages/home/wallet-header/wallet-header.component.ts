import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { CurrencyService } from "../../../providers/currency.service";

@Component({
  selector: 'wallet-header',
  templateUrl: 'wallet-header.component.html'
})
export class WalletHeaderComponent implements OnInit, AfterContentChecked {

  @Input() wallet: any;
  currencyName: string;

  constructor(
    public currencySrv: CurrencyService
  ) {}

  ngAfterContentChecked(){
    console.log('changing wallets!');
    this.currencyName = this.currencySrv.getCurrency(this.wallet.currency_code).name;
  }

  ngOnInit() {
    this.currencyName = this.currencySrv.getCurrency(this.wallet.currency_code).name;
  }

}
