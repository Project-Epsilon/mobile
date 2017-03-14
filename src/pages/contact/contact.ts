import { Component } from "@angular/core";

import { NavController } from "ionic-angular";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {

  contacts = [
    {name: 'Alessandro Power', phone_number: '5143184311', email: 'alessandrojpower@gmail.com'},
    {name: 'Alessandro Power', phone_number: '5143184311', email: 'alessandrojpower@gmail.com'},
    {name: 'Alessandro Power', phone_number: '5143184311', email: 'alessandrojpower@gmail.com'},
    {name: 'Alessandro Power', phone_number: '5143184311', email: 'alessandrojpower@gmail.com'},
    {name: 'Alessandro Power', phone_number: '5143184311', email: 'alessandrojpower@gmail.com'}
  ];

  constructor(public navCtrl: NavController) {

  }

}
