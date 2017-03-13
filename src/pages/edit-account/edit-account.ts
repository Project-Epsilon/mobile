import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from "../../providers/auth.service";

/*
 Generated class for the EditAccount page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})

export class EditAccountPage {

  private updateAccount: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public auth:AuthService ) {
    let user: any = Object.assign({}, this.auth.user);

    this.updateAccount = this.formBuilder.group({
      name: [user.name, Validators.required],
      email: [user.email, Validators.required],
      phone: [user.phone_number, Validators.required],
      username: [user.username, Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  updateInfo() {
    
  }

}
