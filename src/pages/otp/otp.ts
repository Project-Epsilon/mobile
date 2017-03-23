import { Component } from '@angular/core';
import {NavController, NavParams, App} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../providers/auth.service";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html'
})
export class OtpPage {

  public showRequest: boolean;

  public request: FormGroup;
  public unlock: FormGroup;

  public loading: boolean;

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public app: App,
    public fb: FormBuilder
  ) {
    this.showRequest = true;

    this.request = this.fb.group({
      phone_number: ['', Validators.required]
    });
    this.unlock = this.fb.group({
      token: ['', Validators.required]
    });
  }

  /**
   * Requests otp token to their phone.
   */
  public requestCode(){
    if (this.request.valid){
      this.loading = true;
      this.auth.otp(this.request.value, false)
        .subscribe((res: any) => {
          this.loading = false;
          if (res == "ok") {
            this.showRequest = false;
          } else if (res["message"]){
            //alert
          } else {
            //something else
          }
        });
    }
  }

  /**
   * Unlocks the user from their account with the received otp token
   */
  public unlockAccount(){
    if (this.unlock.valid){
      this.loading = true;
      this.auth.otp(this.unlock.value, true)
        .subscribe((res: any) => {
          this.loading = false;
          if (res == "ok") {
            this.app.getRootNav().setRoot(TabsPage);
          } else if (res["message"]){
            //alert
          } else {
            //something else
          }
        });
    }
  }

}
