import { Component } from "@angular/core";
import {AlertController, NavParams, ViewController, ToastController } from "ionic-angular";
import { ContactsService } from "../../../providers/contact.service";
import { Alert } from "../../../utils/Alert";
@Component({
    selector: "page-contact-modal",
    templateUrl: "contact-modal.html",
})
export class ContactModalPage {

  public contact;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    public contactsSrv: ContactsService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) {
    this.contact = this.params.get("contact");
  }

  /**
   * Close the modal page.
   */
  public dismiss() {
      this.viewCtrl.dismiss().catch( (f) => f);
  }

  /**
   * Removes a contact locally and then updates the server.
   *
   * @param contact
   */
  public deleteContact(contact) {

    let alertButtons = [
      { text: "Cancel", role: "cancel"},
      {
        handler: () => {
          this.contactsSrv.deleteContact(contact);
          this.dismiss();
          this.presentToast();
        },
        text: "Confirm",
      },
    ];

    Alert(this.alertCtrl, "Delete Contact", "Are you sure you want to delete " + contact.name, alertButtons);
  }

  private presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Contact was deleted successfully',
      duration: 2500,
      position: 'top'
    });

    toast.present();
  }
}
