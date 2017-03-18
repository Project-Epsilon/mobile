import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { ContactsService } from "../../../providers/contact.service";

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
    ) {
    this.contact = this.params.get('contact');
  }

  /**
   * Close the modal page.
   */
  public dismiss() {
      this.viewCtrl.dismiss().catch( f => f);
  }

  /**
   * Removes a contact locally and then updates the server.
   *
   * @param contact
   */
  public deleteContact(contact) {
    this.contactsSrv.deleteContact(contact);
    this.dismiss();
  }
}
