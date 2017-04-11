import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { App, AlertController, Loading, LoadingController, NavParams, ModalController } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { ContactsService } from "../../providers/contact.service";
import { CurrencyService } from "../../providers/currency.service";
import { WalletsService } from "../../providers/wallet.service";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {

  public wallets: Object = [];
  public contacts: any;
  public currentWalletIndex: number = -1;
  private loader: Loading;
  /* istanbul ignore next */
  constructor(
    public auth: AuthService,
    public app: App,
    public storage: Storage,
    public walletSrv: WalletsService,
    public currencySrv: CurrencyService,
    public http: Http,
    public loadingCtrl: LoadingController,
    public contactsSrv: ContactsService,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Loading.",
    });

    this.loader.present().catch((f) => f);
    this.currencySrv.init();
    this.walletSrv.getWallets()
      .subscribe(
        (wallets) => {
          this.wallets = wallets;
          this.loader.dismiss().catch((f) => f);
      });
    this.contactsSrv.getContacts()
      .subscribe((contacts) => this.contacts = contacts);
  }

  /**
   * Displays an alert page prompting the user to confirm whether they would like to logout or not.
   */
  public logoutPrompt() {
    let alert = this.alertCtrl.create({
      buttons: [{
        handler: () => {
          this.logout();
        },
        text: "Yes",
      }, "No"],
      subTitle: "Are you sure you want to sign out of mBarter?",
      title: "Sign Out",
    });
    alert.present();
  }

  /**
   * Handles the logout process
   */
  /* istanbul ignore next */
  private logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage).catch((f) => f);
  }

}
