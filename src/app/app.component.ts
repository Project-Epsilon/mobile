import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { Splashscreen, StatusBar,Deeplinks } from "ionic-native";
import { LoginPage } from "../pages/login/login";

import {AuthService} from "../providers/auth.service";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  public rootPage = LoginPage;

  constructor(platform: Platform, public auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
