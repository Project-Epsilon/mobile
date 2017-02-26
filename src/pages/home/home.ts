import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  wallets: any = ['Wallet 1', 'Wallet 2'];
  currentWalletIndex: number = -1;

  constructor(
      public navCtrl: NavController,
      public auth: AuthService,
      public app: App,
      public storage: Storage
  ) {}

  /**
   * Handles the logout process
   */
  logout(){
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  ionViewDidLoad(){
    // this.storage.get('id_token').then((token) => {
    //   console.log(token);
    // });
    if(this.wallets.length > 0){
      this.currentWalletIndex = 0;
    }
  }

}
