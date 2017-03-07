import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";

import { Http } from "@angular/http";
import { App, NavController } from "ionic-angular";
import { environment } from "../../environments/environment";
import { AuthService } from "../../providers/auth.service";
import {CurrencyService} from "../../providers/currency.service";
import { WalletsService } from "../../providers/wallet.service";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {

  wallets: Object = [];
  currentWalletIndex: number = -1;

  constructor(
      public navCtrl: NavController,
      public auth: AuthService,
      public app: App,
      public storage: Storage,
      public walletSrv: WalletsService,
      public currencySrv: CurrencyService,
      public http: Http,
  ) {}

  /**
   * Handles the logout process
   */
  logout(){
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  ionViewDidLoad(){
    this.currencySrv.init();

    this.walletSrv.getWallets()
      .subscribe((wallets) => {
        this.wallets = wallets;
      });
  }

}
