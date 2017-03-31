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

  /**
   * Used by Ionic search bar to filter contacts
   *  @param event
   */
  public filterContacts (event) {
    this.contacts = this.contactsSrv.contacts;

    let val = event.target.value;

    if (val && val.trim() !== "") {
      this.contacts = this.contacts.filter((contact) => {
        return (contact.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
}
