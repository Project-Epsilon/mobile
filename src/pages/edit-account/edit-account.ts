import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from "../../providers/auth.service";

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})

export class EditAccountPage {

  private updateAccount: FormGroup;
  private user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public auth:AuthService
  )
  {
    this.user = Object.assign({}, this.auth.user);
    this.updateAccount = this.formBuilder.group({
      name: [this.user.name,
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required]
        )],
      email: [this.user.email,
        Validators.compose([
          Validators.required]
        )],
      phone_number: [this.user.phone_number,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*'),
          Validators.required]
        )],
      username: [this.user.username,
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z0-9]*'),
          Validators.required]
        )],
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
