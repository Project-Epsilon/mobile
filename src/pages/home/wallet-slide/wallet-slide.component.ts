import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "wallet-slide",
  templateUrl: "wallet-slide.component.html",
})
export class WalletSlideComponent implements OnInit {

  @Input() wallets: any;
  activeWallet: Object;

  constructor() {}

  /**
   * Changes current displayed wallet
   *
   * @param $event
   */
  public changeWallet($event){
    if($event.direction==2){ //right swipe
      if(this.wallets.indexOf(this.activeWallet)!=this.wallets.length-1){
        let next = this.wallets.indexOf(this.activeWallet)+1;
        this.activeWallet = this.wallets[next];
      }
    }
    if($event.direction==4){ //left swipe
      if(this.wallets.indexOf(this.activeWallet)!= 0){
        let next = this.wallets.indexOf(this.activeWallet)-1;
        this.activeWallet = this.wallets[next];
      }
    }
  }

  /**
   * Lifecycle hook to initialize active wallet
   */
  public ngOnInit() {
    this.activeWallet = this.wallets[0];
  }

}
