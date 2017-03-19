import { Component } from "@angular/core";
import { ModalController } from "ionic-angular";
import { NavController } from "ionic-angular";
import { ContactsService } from "../../providers/contact.service";
import { AddContactModalPage } from "../modals/addcontact-modals/addcontact-modal";
import { ContactModalPage } from "../modals/contact-modals/contact-modal";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {

  public contacts: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public contactsSrv: ContactsService,
  ) {
    this.contacts = this.contactsSrv.contacts;
  }

  /**
   * Displays the modal page for the given contact.
   *
   * @param contact
   */
  public showContactModal(contact) {
    let modal = this.modalCtrl.create(ContactModalPage, { contact });
    modal.present();
  }

  /**
   * Opens modal to add contact
   *
   */
  public showAddContactModal() {
    let modal = this.modalCtrl.create(AddContactModalPage);
    modal.present();
  }
}
