import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the TransfersModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transfers-modal',
  templateUrl: 'transfers-modal.html'
})
export class TransfersModalPage {

  constructor(public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransfersModalPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
