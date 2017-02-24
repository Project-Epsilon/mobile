import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService],
})
export class LoginPage {

  public user: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth: AuthService
  ) {
    this.user = {
      email: '',
      password: '',
    }
  }

  ionViewDidLoad() {

  }

  login(form){
    console.log(form);
  }

  showAuth(){
    this.auth.login()
  }

}
