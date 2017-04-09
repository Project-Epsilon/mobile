import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { App, NavController, NavParams } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-otp",
  templateUrl: "otp.html",
})
export class OtpPage {

  public showRequest: boolean;

  public request: FormGroup;
  public unlock: FormGroup;

  public loading: boolean;

  public transferToken;

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public app: App,
    public fb: FormBuilder,
  ) {
    this.showRequest = true;

    this.request = this.fb.group({
      phone_number: ["", Validators.required],
    });
    this.unlock = this.fb.group({
      token: ["", Validators.required],
    });

    this.transferToken = navParams.get("transferToken");
  }

  /**
   * Requests otp token to their phone.
   */
  public requestCode() {
    if (this.request.valid) {
      // this.loading = true;
      this.auth.otp(this.request.value, false)
        .subscribe((res: any) => {
          this.loading = false;
          if (res === "ok") {
            this.showRequest = false;
          }
        });
    }
  }

  /**
   * Unlocks the user from their account with the received otp token
   */
  public unlockAccount() {
    if (this.unlock.valid) {
      this.loading = true;
      this.auth.otp(this.unlock.value, true)
        .subscribe((res: any) => {
          this.loading = false;
          if (res === "ok") {
            if (this.transferToken) {
              this.app.getRootNav().setRoot(TabsPage, {transferToken: this.transferToken});
            } else {
              this.app.getRootNav().setRoot(TabsPage);
            }
          }
        });
    }
  }
}
