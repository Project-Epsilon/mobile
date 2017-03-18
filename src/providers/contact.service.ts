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
    let contactAdd =
    {
      name: name,
      phone_number: phoneNumber,
      email: email,
    };
    this.contacts.push(contactAdd);

    this.http.post(environment.server_url + "/api/user/contact",{
      contactAdd
    })
      .map((res) => res.json())
      .subscribe((res) => res);
  }

  public deleteContact(name, phoneNumber, email)  {
    let contactDelete =
      {
        name: name,
        phone_number: phoneNumber,
        email: email,
      };
    let contactDeleteId = this.contacts.indexOf(contactDelete);
    this.contacts.splice(contactDeleteId, 1);

    this.http.delete(environment.server_url + "/api/user/contact/" + contactDeleteId)
      .map((res) => res.json())
      .subscribe((res) => res);
  }
}
