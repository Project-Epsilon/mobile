import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";

import { Http } from "@angular/http";
import { App, NavController, LoadingController, Loading } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import {CurrencyService} from "../../providers/currency.service";
import { WalletsService } from "../../providers/wallet.service";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {

  public wallets: Object = [];
  public currentWalletIndex: number = -1;
  private loader: Loading;

  constructor(
      public navCtrl: NavController,
      public auth: AuthService,
      public app: App,
      public storage: Storage,
      public walletSrv: WalletsService,
      public currencySrv: CurrencyService,
      public http: Http,
      public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Loggin in.",
    });

    this.loader.present().catch(f => f);
    this.currencySrv.init();

    this.walletSrv.getWallets()
      .subscribe((wallets) => {
        this.wallets = wallets;
        this.loader.dismiss().catch(f => f);
      });
  }

  /**
   * Handles the logout process
   */
  public logout(){
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage).catch(f => f);
  }

  public ionViewDidLoad() {

  }

}
