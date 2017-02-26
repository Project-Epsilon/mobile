import { Storage } from '@ionic/storage';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';

import { environment } from '../environments/environment';

declare let Auth0: any;
declare let Auth0Lock: any;

@Injectable()
export class AuthService {

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
          params: {
            scope: 'openid profile'
          }
        }
      }
  );

  public user: Object;
  public idToken: string;

  constructor(private authHttp: AuthHttp, public zone: NgZone, public storage: Storage) {

    // Check if there is a profile saved in local storage
    this.storage.get('user').then(user => {
      this.user = user;
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });

    //Authenticate user and change jwt key with server key.
    this.lock.on('authenticated', result => {
      this.storage.set('id_token', result.idToken);

      this.lock.hide();
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
    this.authHttp.get(environment.server_url + '/api/logout');

    this.storage.remove('user');
    this.storage.remove('id_token');
    this.idToken = null;
    this.zone.run(() => this.user = null);

    // Unschedule the token refresh
  }
}