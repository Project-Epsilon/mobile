import { Component,ViewChild } from "@angular/core";
import { Platform,Nav } from "ionic-angular";
import { Splashscreen, StatusBar, Deeplinks } from "ionic-native";
import { LoginPage } from "../pages/login/login";
import {AuthService} from "../providers/auth.service";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  public rootPage = LoginPage;
  @ViewChild(Nav) nav:Nav;


  constructor(platform: Platform, public auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      Deeplinks.routeWithNavController(this.nav, {
        '/login/:transferToken': LoginPage,
      });
    });
  }
}
