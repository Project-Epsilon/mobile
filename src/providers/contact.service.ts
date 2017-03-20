import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { environment } from "../environments/environment";
import { Alert } from "../utils/Alert";

@Injectable()
export class ContactsService {

  public contacts: any;

  constructor(
    public http: AuthHttp,
    public alertCtrl: AlertController,
  ) { }

  /**
   * Gets all contacts of the user.
   * @returns {Observable|"../../Observable".Observable|"../../../Observable".Observable}
   */
  public getContacts() {
    return new Observable((observer) => {
      this.http.get(environment.server_url + "/api/user/contact")
        .map((res) => res.json())
        .subscribe((res) => {
          this.contacts = res.data;
          observer.next(this.contacts);
          observer.complete();
        });
    });
  }

  /**
   * Adds a user contact locally and updates the server
   * @param name
   * @param phoneNumber
   * @param email
   *
   * @returns {Observable|"../../Observable".Observable|"../../../Observable".Observable}
   */
  public addContact(name, phoneNumber, email) {
    return new Observable((observer) => {
      this.http.post(environment.server_url + "/api/user/contact", {
        name,
        phone_number: phoneNumber,
        email,
      })
        .map((res) => res.json())
        .subscribe(
          (res) => {
            this.contacts.push(res.data);
            observer.next(res.data);
            observer.complete();
          },
          (err) => Alert(this.alertCtrl, "Whoops!", err, ["Dismiss."]),
        );
    });

  }

  /**
   * Deletes a contact locally and updates the server.
   * @param contactDelete
   */
  public deleteContact(contactDelete) {

    let contactDeleteId = this.contacts.indexOf(contactDelete);

    this.http.delete(environment.server_url + "/api/user/contact/" + contactDelete.id)
      .subscribe(
        (res) => this.contacts.splice(contactDeleteId, 1),
        (err) => Alert(this.alertCtrl, "Whoops!", err, ["Dismiss."]),
      );
  }
}
