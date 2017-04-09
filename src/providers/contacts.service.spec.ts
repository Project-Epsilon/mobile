import { async, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { AlertController,App,Config,Platform } from "ionic-angular";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import "rxjs/add/operator/map";
import { ContactsService } from "./contact.service";

/**
 * Bank test suite
 */
describe("Contact Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          deps: [MockBackend, BaseRequestOptions],
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        },
        {
          deps: [Http],
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
        },
        MockBackend,
        ContactsService,
        App,
        Config,
        BaseRequestOptions,
        AlertController,
        Platform,
      ],

    });

  });
  it("contacts should be defined", async(inject([ContactsService], (service) => {
    expect(service).toBeDefined();
  })));

  it("getcontactcs promise", async(inject([ContactsService], (service) => {
    return service.getContacts().then((result) => {
      expect(result).not.toBeNull();

    });
  })));

    it("contacts v2", async(inject([ContactsService], (service) => {
      expect(service.getContacts()).toBeDefined();
    })));

  it("addContact should not be null", async(inject([ContactsService], (service) => {
    expect(service.addContact()).toBeDefined();
  })));

});
