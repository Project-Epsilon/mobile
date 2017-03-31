import { Component } from "@angular/core";
import { NavParams, ToastController, ViewController } from "ionic-angular";

@Component({
    selector: "page-acceptdecline-modal",
    templateUrl: "acceptdecline-modal.html",
})
export class AcceptDeclineModalPage {

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    private toastCtrl: ToastController,

  ) {

  }
  /**
   * Accepts the transaction and adds funds to the users wallet.
   */
  public accept() {

  }

  /**
   * Declines the transaction and returns funds to sendee's wallet.
   */
  public decline () {

  }

  /**
   * Close the modal page.
   */
  public dismiss() {
      this.viewCtrl.dismiss( ).catch( (f) => f);
  }


  /**
   * Shows notification that contact was added successfully
   */
  private presentToast() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: "Contact was added successfully",
      position: "top",
    });

    toast.present();
  }
}
