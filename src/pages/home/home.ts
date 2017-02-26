import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { LoginPage } from "../login/login";
import { AuthHttp } from "angular2-jwt";
import {environment} from "../../environments/environment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  wallets: Object = [];
  currentWalletIndex: number = -1;

  constructor(
      public navCtrl: NavController,
      public auth: AuthService,
      public app: App,
      public storage: Storage,
      public http: AuthHttp
  ) {}

  /**
   * Handles the logout process
   */
  logout(){
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  ionViewDidLoad(){
    this.http.get(environment.server_url + '/api/app/currencies')
        .subscribe(res => {
          let currencies = res.json().data;
          console.log(currencies);
          this.storage.set('currencies', currencies)
        });

    this.http.get(environment.server_url + '/api/wallet')
        .subscribe(res => {
            let wallets = res.json().data;

            this.wallets = wallets;
        })
  }

}
