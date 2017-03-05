import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { TabsPage } from "../tabs/tabs";
import { AuthHttp } from "angular2-jwt";
import { environment } from "../../environments/environment";
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
   * Initializes code.
   */
  ionViewDidLoad() {
    console.log('loaded');
    //Load the event listener.
    // this.auth.lock.on('authenticated', result => {
    //   this.authHttp.post(environment.server_url + '/api/login/auth0', {})
    //       .subscribe(res => {
    //         let data = res.json().data;
    //
    //         console.log(data);
    //
    //         //Set token and user
    //         this.storage.set('user', data.user);
    //         this.storage.set('id_token', data.token).then(() => {
    //           this.app.getRootNav().setRoot(TabsPage);
    //         });
    //       });
    // });
  }

  /**
   * Shows the auth screen.
   */
  showAuth(provider){
    this.auth.login(provider).subscribe(user => {

      if(user){
        this.app.getRootNav().setRoot(TabsPage);
      }
    });
  }

}
