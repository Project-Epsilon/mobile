import { Component } from "@angular/core";

import { NavController } from "ionic-angular";

import { Pipe } from "@angular/core";

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

@Pipe({
  name: 'phone'
})
export class PhonePipe {
  transform(val, args) {
    if (val.length == 7) return val.slice(0, 3) + '-' + val.slice(3, 7);
    else if (val.length == 10) {
      let area_code = val.slice(0, 3);
      let three_digit = val.slice(3, 6);
      let four_digit = val.slice(6, 10);

      return '(' + area_code + ')' + ' ' + three_digit + '-' + four_digit;
    }
  }
}
