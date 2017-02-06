import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {TabsPage} from '../pages/tabs/tabs';
import {IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

let fixture: ComponentFixture<MyApp>;
let comp: MyApp;

describe('Component: Root Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            providers: [],
            imports: [
                IonicModule.forRoot(MyApp)
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        comp = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it('initialises with a root page of HomePage', () => {
        expect(comp['rootPage']).toBe(TabsPage);
    });

});