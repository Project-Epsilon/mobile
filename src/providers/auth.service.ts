import { Injectable, NgZone } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AuthHttp, tokenNotExpired } from "angular2-jwt";

import { Http } from "@angular/http";
import { InAppBrowser } from "ionic-native";
import { environment } from "../environments/environment";

import { Observable } from "rxjs";
import { Alert } from "../utils/Alert";
import {AlertController} from "ionic-angular";

@Injectable()
export class AuthService {

  public user: Object;
  public idToken: string;

  constructor(private authHttp: AuthHttp,
              public zone: NgZone,
              public storage: Storage,
              public http: Http,
              public alertCtrl: AlertController,
  ) {

    // Check if there is a profile saved in local storage
    this.storage.get("user").then((user) => {
      this.user = user;
    });

    this.storage.get("id_token").then((token) => {
      this.idToken = token;
    });

  }

  /**
   * Checks if token is not expired
   * @returns {boolean}
   */
  public authenticated() {
    return tokenNotExpired("id_token", this.idToken);
  }

  /**
   * Show the Auth0 Modal
   *
   * @param provider
   * @returns {Observable}
   */
  public login(provider) {

    return new Observable((observer) => {

      this.http.get(environment.server_url + "/api/auth/" + provider).subscribe((res) => {
        let url = res.json().data.url;
        let browser = new InAppBrowser(url, "_blank", "clearcache=yes,clearsessioncache=yes");
        browser.on("loadstart")
          .subscribe((event) => {
            if (event.url.indexOf(environment.server_url + "/api/app/callback") === 0) {
              let data: any = event.url.substring(event.url.indexOf("data=") + 5, event.url.indexOf("&success=true"));
              data = JSON.parse(decodeURIComponent(data));
              this.storage.set("token", data.meta.token).then((value) => {
                this.user = data.data;
                observer.next(this.user);
                observer.complete();
              });
              browser.close();
            }
          });
      });
    });
  }

  /**
   * Removes all authentication parameters from the application.
   */
  public logout() {
    this.authHttp.get(environment.server_url + "/api/logout");

    this.storage.remove("user");
    this.storage.remove("id_token");
    this.idToken = null;
    this.zone.run(() => this.user = null);
  }

  /**
   * Sends http requests for otp authentication, requesting otp and unlocking user.
   *
   * @param data
   * @param unlock
   * @returns {Observable|"../../Observable".Observable|"../../../Observable".Observable}
   */
  public otp(data, unlock) {
    return new Observable((observer) => {
      this.authHttp.post(environment.server_url + "/api/auth/otp" + ((unlock) ? "/unlock" : ""), data)
        .subscribe((res) => {
          observer.next(res.text());
          observer.complete();
        }, (res) => {
          let msg = res.json();
          if (msg.errors) {
            msg = msg.errors;
          }
          observer.next(msg);
          observer.complete();
        });
    });
  }

  /**
   * Update user information
   *
   * @param user
   * @returns {Observable}
   */
  public updateUserInfo(user: Object) {
    return new Observable((observer) => {
      this.authHttp.post(environment.server_url + "/api/user", user).subscribe((res) => {
        let data = res.json().data;
        this.user = data;

        observer.next(this.user);
        observer.complete();
      });
    });
  }

  /**
   * Delete user
   *
   * @param user
   * @returns {Observable}
   */
  public deleteUser(user: Object) {
    console.log("delete user");
    this.authHttp.delete(environment.server_url + "/api/user/" + user)
      .subscribe(
        (res) => this.user,
        (err) => Alert(this.alertCtrl, "Whoops!", err, ["Dismiss."]),
      );
  }
}
