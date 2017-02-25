import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { TransfersModalPage} from "../modals/transfers-modal/transfers-modal";

/*
  Generated class for the Transfers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transfers',
  templateUrl: 'transfers.html'
})
export class TransfersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransfersPage');
  }

  showTransferModal() {
    this.navCtrl.push(TransfersModalPage);
  }

  currencies: string = "CAD";
  action: string="pending";
}
