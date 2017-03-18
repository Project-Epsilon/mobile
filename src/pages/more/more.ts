import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {ContactPage} from "../contact/contact";
import { EditAccountPage } from "../edit-account/edit-account";

/*
  Generated class for the More page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-more",
  templateUrl: "more.html",
})
export class MorePage {

  contactsPage = ContactPage;
  editAccountPage = EditAccountPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MorePage");
  }

}
