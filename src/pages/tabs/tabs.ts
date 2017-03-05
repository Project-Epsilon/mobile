import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ManagePage } from '../manage/manage';
import { SendMoneyPage} from "../send-money/send-money";
import { TransfersPage} from "../transfers/transfers";
import { MorePage } from "../more/more";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ManagePage;
  tab3Root: any = SendMoneyPage;
  tab4Root: any = TransfersPage;
  tab5Root: any = MorePage;

  constructor() {

  }
}
