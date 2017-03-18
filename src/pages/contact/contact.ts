import { Component } from "@angular/core";
import { Pipe } from "@angular/core";

import { ModalController } from "ionic-angular";
import { NavController } from "ionic-angular";

import { ContactModalPage } from "../modals/contact-modals/contact-modal";
import { ContactsService } from "../../providers/contact.service";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {

  public contacts: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public contactsSrv: ContactsService
  ) {
    this.contacts = this.contactsSrv.contacts;
  }

  /**
   * Displays the modal page for the given contact.
   *
   * @param contact
   */
  public showContactModal(contact) {
    let modal = this.modalCtrl.create(ContactModalPage, { contact: contact });
    modal.present();
  }

  /**
   * Adds a contact locally and then updates the server.
   *
   * @param contact
   */
  public addContact() {
    // this.contactsSrv.addContact();
  }

}

@Pipe({
  name: 'phone'
})
export class PhonePipe {
  /**
   * Modifies the input telephone number to match standard representations.
   *
   * @param val Telephone number as string.
   * @param args
   * @returns {String}
   */
  public transform(val, args) {
    if (val.length == 7) return val.slice(0, 3) + '-' + val.slice(3, 7);

    else if (val.length == 10) {
      let area_code = val.slice(0, 3);
      let three_digit = val.slice(3, 6);
      let four_digit = val.slice(6, 10);

      return '(' + area_code + ')' + ' ' + three_digit + '-' + four_digit;
    }

    return val;
  }
}
