import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AuthHttp } from "angular2-jwt";
import { App, NavController, NavParams } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { LoginPage } from '../login/login';
import { TabsPage } from "../tabs/tabs";
import { AlertController } from 'ionic-angular';


@Component({
  selector: "page-otp",
  templateUrl: "otp.html",
})
export class OTPPage {
  phoneNumber: number = 0;
  hideCodeinput: boolean = true;
  codeNumber:number = 0;
  invalidCode: boolean = true;
  public user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public app: App,
    public authHttp: AuthHttp,
    public storage: Storage,
    public alrtCtrl:AlertController 
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
  showAuth(provider){
    this.auth.login(provider).subscribe((user) => {
      if (user){
        this.app.getRootNav().setRoot(TabsPage);
      }
});
  }
  OTPlogin(){
    this.app.getRootNav().setRoot(TabsPage);
  }
  
  submitOTPCode(codeNumber)
  {
    this.codeNumber = codeNumber;
    let verifyinfo:string;
    this.auth.OTPcodeauth(this.codeNumber).subscribe((res)=> {
    console.log(res);
     verifyinfo == res;
    });
    if(verifyinfo == "ok"){
      let alert = this.alrtCtrl.create({
        buttons: ["Dismiss"],
        subTitle: "The Login Code you submitted was not valid! Please Re-enter it!",
        title: "Login Code Invalid!",
        });
      this.invalidCode = !this.invalidCode;
      alert.present();
    }
    else{
      this.app.getRootNav().setRoot(TabsPage);
      this.invalidCode = true;
      this.hideCodeinput = true;
    }
  }
  
  submitOTP(phoneNumber){
    this.auth.OTPauthenticate(this.phoneNumber).subscribe((res) => {
    console.log(res);
    });
    this.hideCodeinput = !this.hideCodeinput;
  }
 
  returnToPhoneEntry(){
    console.log(JSON.stringify( this.hideCodeinput));
    this.hideCodeinput = !this.hideCodeinput;
    this.invalidCode = false;
  }
  returnToLogin(){
  this.app.getRootNav().setRoot(LoginPage);
  this.invalidCode = false;
  }
 }
