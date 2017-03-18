import { TabsPage } from "./tabs";


/**
 * Tabs Page test suite
 */
describe("TabsPage", () =>{

  beforeEach(() => {
    this.tabs = new TabsPage();
  });

  it("should create", () => {
    expect(this.tabs).toBeTruthy();
  });

});
