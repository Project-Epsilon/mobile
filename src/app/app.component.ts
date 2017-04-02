import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, App } from "ionic-angular";
import { Splashscreen, StatusBar, Deeplinks } from "ionic-native";
import { LoginPage } from "../pages/login/login";
import { AuthService } from "../providers/auth.service";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  public rootPage = LoginPage;
  @ViewChild(Nav) nav:Nav;


  constructor(platform: Platform, public auth: AuthService, public app: App,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      Deeplinks.routeWithNavController(this.nav, {
        '/login/:transferToken': LoginPage,
      }).subscribe((match) => {
       console.log("PETER"+ match.$route);
        console.log(match.$args + 'Successfully matched route', match.$route);
        this.app.getRootNav().setRoot(LoginPage, {transferToken: match.$args});

      }, (nomatch) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
    });
  }
}
