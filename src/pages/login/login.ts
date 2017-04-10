import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { App, NavParams, NavController } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { OtpPage } from "../otp/otp";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})

export class LoginPage {
  private transferToken;

  constructor(
      public auth: AuthService,
      public app: App,
      public http: Http,
      public storage: Storage,
      public navParams: NavParams,
      public navCtrl: NavController,
  ) {
    this.transferToken = navParams.get("transferToken");
  }

  /**
   * Shows the auth screen for the given provider
   *
   * @param provider
   */
  /* istanbul ignore next */
  public showAuth(provider) {
    this.auth.login(provider).subscribe((user) => {
      this.otpCheck(user);
    });
  }

  /**
   * Auto login for development
   *
   */
  /* istanbul ignore next */
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
  /* istanbul ignore next */
  public otpCheck(user) {
    if (user.locked && !this.transferToken) {
      this.navCtrl.setRoot(OtpPage);
    } else if (user.locked && this.transferToken) {
      this.navCtrl.setRoot(OtpPage, {transferToken: this.transferToken});
    } else if (!user.locked && this.transferToken) {
      this.navCtrl.setRoot(TabsPage, {transferToken: this.transferToken});
    } else {
      this.navCtrl.setRoot(TabsPage);
    }
  }
}
