import { Component, ViewChild } from "@angular/core";
import { App, Nav, Platform } from "ionic-angular";
import { Deeplinks, Splashscreen, StatusBar } from "ionic-native";
import { LoginPage } from "../pages/login/login";
import { AuthService } from "../providers/auth.service";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  public rootPage = LoginPage;
  @ViewChild(Nav) public nav: Nav;

  constructor(
    platform: Platform,
    public auth: AuthService,
    public app: App,
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      Deeplinks.routeWithNavController(this.nav, {
        "/login/:transferToken": LoginPage,
      }).subscribe(
        (match) => {
          let parsedToken = match.$link.path;
          let token = undefined;
          if (parsedToken.indexOf("[") > -1) {
            token = parsedToken.substring(11, parsedToken.indexOf("["));
          } else  {
            token = parsedToken.substring(parsedToken.lastIndexOf("/") + 1, parsedToken.length);
          }
          this.app.getRootNav().setRoot(LoginPage, {transferToken: token});
        },
        (nomatch) => {
          // If no match don't do anything.
        });
    });
  }
}
