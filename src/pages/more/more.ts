import { AlertController } from "ionic-angular";
import { App } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";
import { Component } from "@angular/core";
import { ContactPage } from "../contact/contact";
import { EditAccountPage } from "../edit-account/edit-account";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-more",
  templateUrl: "more.html",
})
export class MorePage {

  public contactsPage: any;
  public editAccountPage: any;

  constructor(
      public alertCtrl: AlertController,
      public app: App,
      public auth: AuthService,
  ) {
    this.contactsPage = ContactPage;
    this.editAccountPage = EditAccountPage;
  }

  /**
   * Displays an alert page prompting the user to confirm whether they would like to logout or not.
   */
  public logoutPrompt() {
    let alert = this.alertCtrl.create({
      buttons: [{
        handler: () => {
          this.logout();
        },
        text: "Yes",
      }, "No"],
      subTitle: "Are you sure you want to sign out of mBarter?",
      title: "Sign Out",
    });
    alert.present();
  }

  /**
   * Logs the user out and redirects them to the login page.
   */
  public logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage).catch((f) => f);
  }
}
