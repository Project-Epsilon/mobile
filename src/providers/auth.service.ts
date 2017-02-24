import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';

import { environment } from '../environments/environment';
import { App } from "ionic-angular";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";

declare let Auth0: any;
declare let Auth0Lock: any;

@Injectable()
export class AuthService {

  // Angular JWT Helper
  private jwtHelper: JwtHelper = new JwtHelper();

  // Auth0
  public auth0 = new Auth0({
    clientID: environment.auth0_id,
    domain: environment.auth0_domain
  });

  // Auth0 Lock Widget
  public lock = new Auth0Lock(
      environment.auth0_id,
      environment.auth0_domain, {
        auth: {
          redirect: false,
        },
        params: {
          scope: 'openid offline_access',
          device: 'Mobile Phone'
        }
      }
  );

  public user: Object;
  public idToken: string;

  constructor(
      private authHttp: AuthHttp,
      public zone: NgZone,
      public storage: Storage
  ) {

    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });

    this.lock.on('authenticated', result => {

      this.storage.set('id_token', result.idToken);
      this.idToken = result.idToken;

      console.log(result);

      // Fetch profile information
      this.lock.getUserInfo(result.accessToken, (error, profile) => {

        if (error) {
          console.log(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.storage.set('profile', JSON.stringify(profile));
        this.user = profile;
      });

      this.lock.hide();

      this.storage.set('refresh_token', result.refreshToken);
      this.zone.run(() => this.user = result.profile);

    });
  }

  /**
   * Checks if token is not expired
   * @returns {boolean}
   */
  public authenticated() {
    return tokenNotExpired('id_token', this.idToken);
  }

  /**
   * Show the Auth0 Modal
   */
  public login() {
    this.lock.show();
  }

  /**
   * Removes all authentication parameters from the application.
   */
  public logout() {
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zone.run(() => this.user = null);

    // Unschedule the token refresh
  }
}