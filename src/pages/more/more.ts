import { AlertController } from 'ionic-angular';
import { Component } from "@angular/core";
import { ContactPage } from "../contact/contact";
import { EditAccountPage } from "../edit-account/edit-account";


@Component({
  selector: "page-more",
  templateUrl: "more.html",
})
export class MorePage {

  public contactsPage: any;
  public editAccountPage: any;

  constructor(public alertCtrl: AlertController) {
    this.contactsPage = ContactPage;
    this.editAccountPage = EditAccountPage;
  }

  logoutPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      subTitle: 'Are you sure you want to sign out of mBarter?',
      buttons: ['Yes', 'No']
    });
    alert.present();
  }
}
