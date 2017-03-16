import { AlertController } from "ionic-angular";

export function Alert(
  alertCtrl: AlertController,
  title: string,
  message: string,
  buttons: any[]
) {
  alertCtrl.create({title: title, message: message, buttons: buttons}).present();
}
