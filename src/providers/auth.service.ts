import {Injectable, NgZone} from "@angular/core";
import {Storage} from "@ionic/storage";
import {AuthHttp, tokenNotExpired} from "angular2-jwt";

import {Http} from "@angular/http";
import {InAppBrowser} from "ionic-native";
import {environment} from "../environments/environment";

import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  public user: Object;
  public idToken: string;

  constructor(private authHttp: AuthHttp,
              public zone: NgZone,
              public storage: Storage,
              public http: Http) {

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

  public OTPauthenticate(phone_number) {
    console.log(phone_number);
    let data = new Observable((observer) => {
      this.authHttp.post(environment.server_url + "/api/auth/otp", {
        phone_number: phone_number,
      })

        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        },
          (err) => {
            let data = err.json().errors.message;
            console.log(data + "OTPRES");
            observer.next(data);
            observer.complete();
        },
        );
    });

    return data;
  }

  public OTPcodeauth(token) {
    let data = new Observable((observer) => {
      this.authHttp.post(environment.server_url + "/api/auth/otp/unlock", {
        token: token,
      }).subscribe((res) => {
            observer.next(res);
            observer.complete();
          }, (err) => {
            let data = err.json().errors.message;
            console.log(data + "OTPRES");

            observer.next(data);
            observer.complete();
          },
        );
    });
    return data;
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
        let browser = new InAppBrowser(url, "_blank");
        browser.on("loadstart")
          .subscribe((event) => {
            if (event.url.indexOf(environment.server_url + "/api/app/callback") == 0) {
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

    // Unschedule the token refresh
  }
}
