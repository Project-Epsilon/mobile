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
    val = val.charAt(0) != 0 ? '0' + val : '' + val;
    let newStr = '';
    let i = 0;

    for(; i < (Math.floor(val.length/2) - 1); i++){
      newStr = newStr+ val.substr(i*2, 2) + '-';
    }
    return newStr+ val.substr(i*2);
  }
}
