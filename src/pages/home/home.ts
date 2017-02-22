import { Component, OnInit } from '@angular/core';

import { App, NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  wallets: any = ['Wallet 1', 'Wallet 2'];
  currentWalletIndex: number = -1;

  constructor(public navCtrl: NavController, public appCtrl: App) {}

  logout(){
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  ngOnInit(){
    if(this.wallets.length > 0){
      this.currentWalletIndex = 0;
    }
  }

}
