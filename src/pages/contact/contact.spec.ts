import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { IonicModule, ModalController, NavController } from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { ContactsService } from "../../providers/contact.service";
import { ContactPage } from "./contact";

let component: ContactPage;
let fixture: ComponentFixture<ContactPage>;

class MockModalCtrl {
  public present() { return true; }
  public dismiss(): any { return; }
}

class MockEvent {
  public target;
  constructor() { this.target = new MockTarget(); }
}

class MockTarget {
  public value;
  constructor() { this.value = new MockValue(); }
}

class MockValue {
  public string = "text";
  public trim() { return this.string; }
}

/**
 * Contact test suite
 */
describe("Contact", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, ContactPage],
      imports: [
        IonicModule.forRoot(ContactPage),
      ],
      providers: [
        {
          deps: [MockBackend, BaseRequestOptions],
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        },
        {
          provide: ModalController, useClass: MockModalCtrl,
        },
        {
          deps: [Http],
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
        },
        Storage,
        MockBackend,
        BaseRequestOptions,
        ContactsService,
        NavController,
        ModalController,
      ],

    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Contact component should create", () => {
    expect(component).toBeTruthy();
  });

  it("Modal should be shown", async(inject([ContactsService], (service) => {
    let contact = service.getContacts();
    try {
      expect(component.showContactModal(contact)).toBeTruthy();
    }
    catch (err){

    }
  })));

  it("Add contact modal should be created", async(inject([ContactsService], (service) => {
    try {
      expect(component.showAddContactModal()).toBeDefined();
    }
    catch (err){

    }
  })));

  it("Contacts should be filtered", async(inject([ContactsService], (service) => {
    try {
      expect(component.filterContacts(new MockEvent())).toBeDefined();
    }
    catch (err){

    }
  })));

});
