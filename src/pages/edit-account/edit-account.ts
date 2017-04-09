import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, NavParams, AlertController, ToastController, ViewController } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { Alert } from "../../utils/Alert";

import { LoginPage } from "../login/login";
import { Response } from "@angular/http";

@Component({
  selector: "page-edit-account",
  templateUrl: "edit-account.html",
})

export class EditAccountPage {

  private updateAccount: FormGroup;
  private user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
  ) {
    this.user = Object.assign({}, this.auth.user);
    this.updateAccount = this.formBuilder.group({
      email: [this.user.email,
        Validators.compose(
          [
            Validators.maxLength(255),
            Validators.pattern("[a-zA-Z]{1,}([a-zA-Z0-9\_\.\-]*)*@[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{1,}"),
            Validators.required,
          ],
        )],
      name: [this.user.name,
        Validators.compose(
          [
            Validators.maxLength(30),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required,
          ],
        )],
      phone_number: [this.user.phone_number,
        Validators.compose(
          [
            Validators.minLength(10),
            Validators.maxLength(11),
            Validators.pattern("[0-9]*"),
            Validators.required,
          ],
        )],
      username: [this.user.username,
        Validators.compose(
          [
            Validators.maxLength(30),
            Validators.pattern("[a-zA-Z]*"),
            Validators.required,
          ],
        )],
    });
  }

  /**
   * Persist information taken from submitted form in the user db
   *
   */
  public updateInfo() {
    this.auth.updateUserInfo(this.updateAccount.value).subscribe((user: any) => {
      this.user = user;
    });
  }

  /**
   * Delete user from db
   *
   * @param user
   */
  public deleteUser() {
    let alertButtons = [
      {
        role: "cancel",
        text: "Cancel",
      },
      {
        handler: () => {
          this.handleDelete();
        },
        text: "Confirm",
      },
    ];

    Alert(this.alertCtrl, "Delete User", "Are you sure you want to delete your account?", alertButtons);
  }

  /**
   * Display successful contact deletion confirmation
   *
   */
  private presentToast() {
    let toast = this.toastCtrl.create({
      duration: 2500,
      message: "User was deleted successfully",
      position: "top",
    });

    toast.present();
  }

  /**
   * Close the modal page.
   */
  public dismiss() {
    this.viewCtrl.dismiss().catch( (f) => f);
  }

  /**
   * Handle user deletion.
   */
  private handleDelete() {
    this.auth.deleteUser()
      .subscribe(
        (res: Response) => {
          let response = res.json();

          if (response.status === "ok") {
            this.auth.logout();

            this.navCtrl.popToRoot();
            this.navCtrl.push(LoginPage);

            this.dismiss();
            this.presentToast();
          }
          else {
            let alertButtons = [
              {
                role: "cancel",
                text: "Dismiss",
              }
            ];

            Alert(this.alertCtrl, "Delete User Failed", response.errors.message, alertButtons);
          }
        }
      );
  }

}
