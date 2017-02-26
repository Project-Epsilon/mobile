import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wallet-slide',
  templateUrl: 'wallet-slide.component.html'
})
export class WalletSlideComponent implements OnInit {

  @Input() wallets: Object;
  activeWallet: Object;

  constructor() {}

  changeWallet($event){
    console.log($event);
  }

  ngOnInit() {
    this.activeWallet = this.wallets[0];
  }

}
