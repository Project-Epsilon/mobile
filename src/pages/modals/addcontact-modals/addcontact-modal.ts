import { Component } from "@angular/core";
import { NavParams, ViewController, AlertController } from "ionic-angular";
import { ContactsService } from "../../../providers/contact.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "page-addcontact-modal",
    templateUrl: "addcontact-modal.html",
})
export class AddContactModalPage {

  private form: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    public contactsSrv: ContactsService,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      name: ["", Validators.required,],
      phoneNumber: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      email: ["", Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")],
    });
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
  public addContact() {
    this.contactsSrv.addContact(
      this.form.value.name,
      this.form.value.phoneNumber,
      this.form.value.email,
    );
    this.dismiss();
    this.form.reset();
  }
}
