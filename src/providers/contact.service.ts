import { Injectable } from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable()
export class ContactsService {

  public contacts: any;

  constructor(
    public http: AuthHttp
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

  public addContact(name, phoneNumber, email) {

    this.http.post(environment.server_url + "/api/user/contact",{
      name,
      phone_number: phoneNumber,
      email,

    })
      .map((res) => res.json())
      .subscribe((res) => this.contacts.push(res.data));
  }

  public deleteContact(contactDelete) {

    let contactDeleteId = this.contacts.indexOf(contactDelete);

    this.contacts.splice(contactDeleteId, 1);

    this.http.delete(environment.server_url + "/api/user/contact/" + contactDelete.id)
      .subscribe((res) => res);
  }
}
