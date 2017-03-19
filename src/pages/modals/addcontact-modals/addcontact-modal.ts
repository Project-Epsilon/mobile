import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavParams, ViewController, ToastController } from "ionic-angular";
import { ContactsService } from "../../../providers/contact.service";

@Component({
    selector: "page-addcontact-modal",
    templateUrl: "addcontact-modal.html",
})
export class AddContactModalPage {

  private form: FormGroup;
  private addedContact: any;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    public contactsSrv: ContactsService,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      email: ["", Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")],
      name: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    });
  }

  /**
   * Close the modal page.
   */
  public dismiss() {
      this.viewCtrl.dismiss(
        this.addedContact,
      ).catch( (f) => f);
  }

  /**
   * Adds a contact locally and then updates the server.
   */
  public addContact() {
    this.contactsSrv.addContact(
      this.form.value.name,
      this.form.value.phoneNumber,
      this.form.value.email,
    )
      .subscribe(
        (res) => {
          this.addedContact = res;
          this.dismiss();
          this.presentToast();
          this.form.reset();
        },
      );
  }

  /**
   * Shows notification that contact was added successfully
   */
  private presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Contact was added successfully',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}
