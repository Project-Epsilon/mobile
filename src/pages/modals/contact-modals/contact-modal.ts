import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
    selector: "page-contact-modal",
    templateUrl: "contact-modal.html",
})
export class ContactModalPage {

    public contact;

    constructor(public viewCtrl: ViewController,
                public params: NavParams) {
        this.contact = this.params.get('contact');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}