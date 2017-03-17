import { Component } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Pipe } from "@angular/core";

import { ModalController } from "ionic-angular";
import { NavController } from "ionic-angular";

import { environment } from "../../environments/environment";
import { ContactsModalPage } from "../modals/contacts-modals/contacts-modal";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {

  public contacts: any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public auth_http: AuthHttp) {
    this.auth_http.get(environment.server_url + "/api/user/contact")
        .map((res) => res.json())
        .subscribe((result) => this.contacts = result.data);
  }

  showContactsModal() {
    let modal = this.modalCtrl.create(ContactsModalPage);
    modal.present();
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
  transform(val, args) {
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
