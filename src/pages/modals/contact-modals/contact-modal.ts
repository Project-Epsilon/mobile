import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    selector: "page-contact-modal",
    templateUrl: "contact-modal.html",
})
export class ContactModalPage {

    constructor(public viewCtrl: ViewController) {}

    dismiss() {
        this.viewCtrl.dismiss();
    }
}