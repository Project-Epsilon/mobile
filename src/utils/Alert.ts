import { AlertController } from "ionic-angular";

export function Alert(
  alertCtrl: AlertController,
  title: string,
  message: string,
  buttons: any[],
) {
  alertCtrl.create({title, message, buttons}).present();
}
