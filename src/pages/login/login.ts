import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { App,NavParams } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { OtpPage } from "../otp/otp";
import { TabsPage } from "../tabs/tabs";
import { TabsPage } from "../tabs/tabs";
import {TransfersPage} from "../transfers/transfers";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  private transactionId;

  constructor(
      public auth: AuthService,
      public app: App,
      public http: Http,
      public storage: Storage,
      public navParams: NavParams,
  ) {
    this.transactionId = navParams.get('transationID');
  }

  /**
   * Shows the auth screen for the given provider
   *
   * @param provider
   */
  public showAuth(provider) {
    this.auth.login(provider).subscribe((user) => {
      this.otpCheck(user);
    });
  }

  /**
   * Auto login for development
   *
   */
  public autoLogin() {
    this.http.post("http://server.laurendylam.com/api/login", {
      email: "user@user.com",
      password: "password",
    }).subscribe((res) => {
      let data = res.json();

      this.auth.user = data.data;
      this.auth.idToken = data.meta.token;

      this.storage.set("token", data.meta.token).then((value) => {
        this.otpCheck(data.data);
      });
    });
  }

  /**
   * Redirects the user to the appropriate page.
   *
   * @param user
   */
  public otpCheck(user) {
    if (user.locked) {
      this.app.getRootNav().setRoot(OtpPage);
    } else if (!user.locked && this.transactionId) {
      this.app.getRootNav().setRoot(TransfersPage, {transactionId: this.transactionId, action: "pending"});
    } else {
        this.app.getRootNav().setRoot(TabsPage);
      }
    }

}
