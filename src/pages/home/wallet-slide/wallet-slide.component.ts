import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wallet-slide',
  templateUrl: 'wallet-slide.component.html'
})
export class WalletSlideComponent implements OnInit {

  @Input() wallets: any;
  activeWallet: number;

  constructor() {}

  changeWallet($event){
    console.log($event);
  }

  ngOnInit() {
  }

}
