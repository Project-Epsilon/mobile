import {Component} from "@angular/core";
import {Storage} from "@ionic/storage";
import {AuthHttp} from "angular2-jwt";
import {App, NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../providers/auth.service";
import {LoginPage} from '../login/login';
import {TabsPage} from "../tabs/tabs";
import {AlertController} from 'ionic-angular';


@Component({
  selector: "page-otp",
  templateUrl: "otp.html",
})
export class OTPPage {
  phoneNumber: number = 0;
  hideCodeinput: boolean = true;
  codeNumber: number = 0;
  invalidCode: boolean = false;
  public user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public app: App,
    public authHttp: AuthHttp,
    public storage: Storage,
    public alrtCtrl: AlertController
  ) {
    this.user = {
      email: "",
      password: "",
    };
  }

  /**
   * Shows the auth screen for the given provider
   *
   * @param provider
   */
  showAuth(provider) {
    this.auth.login(provider).subscribe((user) => {
      if (user) {
        this.app.getRootNav().setRoot(TabsPage);
      }
    });
  }

  OTPlogin() {
    this.app.getRootNav().setRoot(TabsPage);
  }

  submitOTPCode(codeNumber) {
    this.codeNumber = codeNumber;
    let verifyinfo: any;
    this.auth.OTPcodeauth(this.codeNumber).subscribe((data) => {
      this.invalidCode = false;
        this.hideCodeinput = true;
        this.app.getRootNav().setRoot(TabsPage);
        if (data == "ok")
        {
          this.invalidCode = false;
          this.hideCodeinput = true;
          this.app.getRootNav().setRoot(TabsPage);
        }
        else
        {
          let alert = this.alrtCtrl.create({
            buttons: ["Dismiss"],
            subTitle: "The Login Code you submitted was not valid! Please Re-enter it!",
            title: "Login Code Invalid!",
          });
          this.invalidCode = true;
          alert.present();
        }
        });
  }

  submitOTP(phoneNumber) {
    let verifyphone: any;

    this.auth.OTPauthenticate(this.phoneNumber).subscribe((res) => {
      if(res == "There was an error with the phone number.")
      {
        let alert = this.alrtCtrl.create({
          buttons: ["Dismiss"],
          subTitle: "The Login Code you submitted was not valid! Please Re-enter it!",
          title: "Login Code Invalid!",
        });
        this.invalidCode = true;
        alert.present();
      }
      else
      {
        console.log("Toggling false")
        this.hideCodeinput = false;
        console.log(this.hideCodeinput)

      }
    });
  }

  returnToPhoneEntry() {
    console.log(this.hideCodeinput);
    this.hideCodeinput = true;
    this.invalidCode = false;
  }

  returnToLogin() {
    this.app.getRootNav().setRoot(LoginPage);
    this.invalidCode = false;
  }
}
