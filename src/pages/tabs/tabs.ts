import { Component } from "@angular/core";

import { HomePage } from "../home/home";
import { ManagePage } from "../manage/manage";
import { MorePage } from "../more/more";
import { SendMoneyPage} from "../send-money/send-money";
import { TransfersPage} from "../transfers/transfers";

@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  public tab5Root: any;

  constructor() {
    this.tab1Root = HomePage;
    this.tab2Root = ManagePage;
    this.tab3Root = SendMoneyPage;
    this.tab4Root = TransfersPage;
    this.tab5Root = MorePage;
  }
}
