import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AuthHttp } from "angular2-jwt";
import { App, NavController, NavParams } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { TabsPage } from "../tabs/tabs";
import {Http} from "@angular/http";

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
    this.auth.login(provider).subscribe((user) => {

      if (user){
        this.app.getRootNav().setRoot(TabsPage);
      }
    });
  }

  /**
   * Shows the auth screen for the given provider
   *
   * @param provider
   */
  autoLogin(){
    this.http.post('http://server.laurendylam.com/api/login', {
      email: "user@user.com",
      password: "password"
    }).subscribe((res) => {
      let data = res.json().data;
      console.log(data);

      this.auth.user = data.user;
      this.auth.idToken = data.token;

      this.storage.set("token", data.token).then((value) => {
        this.app.getRootNav().setRoot(TabsPage);
      });
    });


  }

}
