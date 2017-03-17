import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    selector: "page-contacts-modal",
    templateUrl: "contacts-modal.html",
})
export class ContactsModalPage {

    constructor(public viewCtrl: ViewController) {}

    dismiss() {
        this.viewCtrl.dismiss();
    }
}