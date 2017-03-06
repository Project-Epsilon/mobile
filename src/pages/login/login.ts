import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { TabsPage } from "../tabs/tabs";
import { AuthHttp } from "angular2-jwt";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public user: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth: AuthService,
      public app: App,
      public authHttp: AuthHttp,
      public storage: Storage
  ) {
    this.user = {
      email: '',
      password: '',
    }
  }

  /**
   * Shows the auth screen for the given provider
   *
   * @param provider
   */
  showAuth(provider){
    this.auth.login(provider).subscribe(user => {

      if(user){
        this.app.getRootNav().setRoot(TabsPage);
      }
    });
  }

}
