import {Storage} from '@ionic/storage';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Injectable, NgZone} from '@angular/core';

import {environment} from '../environments/environment';
import {InAppBrowser} from "ionic-native";
import {Http} from "@angular/http";

import {Observable } from "rxjs";


@Injectable()
export class AuthService {

  public user: Object;
  public idToken: string;

  constructor(private authHttp: AuthHttp,
              public zone: NgZone,
              public storage: Storage,
              public http: Http) {

    // Check if there is a profile saved in local storage
    this.storage.get('user').then(user => {
      this.user = user;
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
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
   *
   * @param provider
   * @returns {Observable}
   */
  public login(provider) {

    let data = new Observable(observer => {

      this.http.get(environment.server_url + '/api/auth/' + provider).subscribe(res => {
        let url = res.json().data.url;
        let browser = new InAppBrowser(url, '_blank');
        browser.on('loadstart')
          .subscribe(event => {
            if (event.url.indexOf(environment.server_url + '/api/app/callback') == 0) {
              let token = event.url.substring(event.url.indexOf('=') + 1, event.url.indexOf('&success=true'));
              this.storage.set('token', token).then(value => {
                this.authHttp.get(environment.server_url + '/api/user').subscribe(res => {
                  this.user = res.json().data;
                  observer.next(this.user);
                  observer.complete();
                });
              });
              browser.close();
            }
          });
      });
    });
    return data;
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
