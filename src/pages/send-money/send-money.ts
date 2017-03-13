import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/*
  Generated class for the SendMoney page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-send-money",
  templateUrl: "send-money.html",
})
export class SendMoneyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SendMoneyPage");
  }

  currencies: string= "USD";
  recipients: string= "trump";
}
