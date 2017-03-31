import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { TransfersModalPage } from "../transfers-modal/transfers-modal"
import { Http } from "@angular/http";
import { App, Loading, LoadingController, NavController,ModalController, NavParams } from "ionic-angular";
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
  public params:'';

  constructor(
      public navCtrl: NavController,
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

  ) {
    this.loader = this.loadingCtrl.create({
      content: "Loading.",
    });

    this.loader.present().catch((f) => f);
    this.currencySrv.init();
    this.walletSrv.getWallets()
      .subscribe((wallets) => {
        this.wallets = wallets;
        this.loader.dismiss().catch((f) => f);
      });
    this.contactsSrv.getContacts()
      .subscribe((contacts) =>
        this.contacts = contacts,
      );

    this.params = navParams.get('userId');

    if (this.params != '')
    {

      let profileModal = this.modalCtrl.create(TransfersModalPage, { userId: this.params });
      profileModal.present();

    }
  }

  /**
   * Handles the logout process
   */
  public logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage).catch((f) => f);
  }

}
