import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { AuthHttp } from "angular2-jwt";
import { App, NavController, NavParams } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { TabsPage } from "../tabs/tabs";
import { OtpPage } from "../otp/otp";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth: AuthService,
      public app: App,
      public authHttp: AuthHttp,
      public http: Http,
      public storage: Storage,
  ){}

  /**
   * Shows the auth screen for the given provider
   *
   * @param provider
   */
  showAuth(provider){
    this.auth.login(provider).subscribe((user: any) => {
      this.otpCheck(user)
    });
  }

  /**
   * Auto login for development
   *
   */
  public autoLogin(){
    this.http.post("http://server.laurendylam.com/api/login", {
      email: "user@user.com",
      password: "password",
    }).subscribe((res) => {
      let data = res.json();
      console.log(data);

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
  public otpCheck(user){
    if (user.locked){
      this.app.getRootNav().setRoot(OtpPage);
    } else {
      this.app.getRootNav().setRoot(TabsPage);
    }
  }

}
