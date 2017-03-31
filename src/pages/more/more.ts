import { AlertController } from 'ionic-angular';
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

  public logoutPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      subTitle: 'Are you sure you want to sign out of mBarter?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.logout();
        }
      }, 'No']
    });
    alert.present();
  }

  public logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage).catch((f) => f);
  }
}
