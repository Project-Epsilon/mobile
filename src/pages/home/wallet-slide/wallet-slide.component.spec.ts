/* tslint:disable:no-unused-variable */
import { WalletSlideComponent } from "./wallet-slide.component";

/**
 * Fake event class for testing purposes only
 */
class FakeEvent {
  public direction: number;

  constructor(direction: number) {
    this.direction = direction;
  }
}

/**
 * Wallet Slide test suite
 */
describe("WalletSlideComponent", () => {

  beforeEach(() => {
    this.walletSlideComponent = new WalletSlideComponent();
    this.walletSlideComponent.wallets = [1, 2, 3];
    this.walletSlideComponent.activeWallet = this.walletSlideComponent.wallets[0];
  });

  it("should create", () => {
    expect(this.walletSlideComponent).toBeTruthy();
  });

  it("should have wallet", () => {
    expect(this.walletSlideComponent.ngOnInit()).not.toBeNull();
  });

  it("should swipe right", () => {
    this.walletSlideComponent.changeWallet(new FakeEvent(2));
    expect(this.walletSlideComponent.activeWallet).toEqual(2);
  });

  it("should not swipe left", () => {
    this.walletSlideComponent.changeWallet(new FakeEvent(4));
    expect(this.walletSlideComponent.activeWallet).toEqual(1);
  });
});
