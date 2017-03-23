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

  constructor() {
    this.contactsPage = ContactPage;
    this.editAccountPage = EditAccountPage;
  }
}
