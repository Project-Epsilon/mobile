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
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public auth:AuthService ) {
    this.user = Object.assign({}, this.auth.user);

    this.updateAccount = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      phone_number: [this.user.phone_number, Validators.required],
      username: [this.user.username, Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  updateInfo() {
    this.auth.updateUserInfo(this.updateAccount.value).subscribe((user: any) => {
      console.log(user);
      this.user = user;
    });
  }

}
