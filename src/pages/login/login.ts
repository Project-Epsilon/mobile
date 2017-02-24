import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { TabsPage } from "../tabs/tabs";

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
      public app: App
  ) {
    this.user = {
      email: '',
      password: '',
    }
  }

  /**
   * Initializes code.
   */
  ionViewDidLoad() {
    //Load the event listener.
    this.auth.lock.on('authenticated', result => {
      this.app.getRootNav().setRoot(TabsPage);
    });
  }

  /**
   * Shows the auth screen.
   */
  showAuth(){
    this.auth.login()
  }

}
