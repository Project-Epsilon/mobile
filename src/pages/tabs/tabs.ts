import { Component, ViewChild } from "@angular/core";

import { HomePage } from "../home/home";
import { ManagePage } from "../manage/manage";
import { MorePage } from "../more/more";
import { SendMoneyPage} from "../send-money/send-money";
import { TransfersPage} from "../transfers/transfers";
import { NavParams, Tabs } from "ionic-angular";

@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  public tab5Root: any;
  public transferParams: any;

  constructor(
    public navParams: NavParams,
  ) {
    this.tab1Root = HomePage;
    this.tab2Root = ManagePage;
    this.tab3Root = SendMoneyPage;
    this.tab4Root = TransfersPage;
    this.tab5Root = MorePage;

    let transferToken = this.navParams.get("transferToken");
    /* istanbul ignore if */
    if (transferToken) {
      this.transferParams = {
        transferToken: transferToken,
      };
    }

  }

  /**
   * Runs when tabs page is initialized. If there is a transfer token, redirects to transfers page.
   */
  /* istanbul ignore next */
  public ionViewDidEnter() {
    if (this.transferParams) {
      this.tabRef.select(3);
    }
  }
}
