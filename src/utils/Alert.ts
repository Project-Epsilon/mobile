import { AlertController } from "ionic-angular";

export class Alert {
  constructor(
    private alertCtrl: AlertController,
    private title: string,
    private message: string,
    private buttons: any[]
  ) {
    alertCtrl.create({title: title, message: message, buttons: buttons}).present();
  }
}
