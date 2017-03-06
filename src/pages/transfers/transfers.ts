import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransfersPage');
  }

  showTransferModal() {
    let modal = this.modalCtrl.create(TransfersModalPage);
    modal.present();
  }

  currencies: string = "CAD";
  action: string="pending";
}
