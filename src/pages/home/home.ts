import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  wallets: any = [];

  constructor(public navCtrl: NavController) {

  }

  changeWallet($event){
    console.log($event);
  }

  signOut(){
    this.navCtrl.setRoot(LoginPage)
  }

}
