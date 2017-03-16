import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, Loading, LoadingController } from "ionic-angular";
import { BankTransferService } from "../../../providers/bank.service";
import { WalletsService } from "../../../providers/wallet.service";
import { Alert } from "../../../utils/Alert";

@Component({
  selector: "withdraw-component",
  templateUrl: "./withdraw.component.html",
})
export class WithdrawComponent {
  private loader: Loading;
  private form: FormGroup;
  public validAmount = true;
  private maxAmount: number;
  private maxCurrency: number;
  private wallets: any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public bankSrv: BankTransferService,
    public walletSrv: WalletsService,
    private formBuilder: FormBuilder,
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Processing bank transfer.",
    });

    this.form = this.formBuilder.group({
      amount: ["", [Validators.required, Validators.pattern("^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$")]],
      email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      wallet: [null, Validators.required],
    });
// Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    this.wallets = this.walletSrv.wallets;
  }

  /**
   * Updates the maximum amount of money the user can withdraw based on his selected wallet.
   */
  public updateValidAmount() {
    if (!this.form.value.wallet) {
      return;
    } else {
      this.validAmount = (this.form.value.amount <= parseFloat(this.form.value.wallet.balance));
      this.maxAmount = this.form.value.wallet.balance;
      this.maxCurrency = this.form.value.wallet.currency_code;
    }
  }

  /**
   * Sends a withdraw request to server. Alerts user for confirmation.
   */
  public withdraw() {
    let displayAmount = this.form.value.amount  + " " + this.form.value.wallet.currency_code;

    let alertButtons = [
      { text: "Cancel", role: "cancel"},
      {
        handler: () => {
          this.loader.present().catch(f => f);

          this.bankSrv.withdraw(
            this.form.value.wallet.id,
            this.form.value.amount,
            this.form.value.email,
          ).subscribe(
              (res) => { this.loader.dismiss().catch(f => f); this.handleWithdrawal(res, displayAmount);  },
              (error) => { this.loader.dismiss().catch(f => f); Alert(this.alertCtrl, "Whoops!", error, ["Dismiss."]); },
          )
        },
        text: "Confirm",
      },
    ];

    Alert(this.alertCtrl, "Confirm withdraw", "Do you want to withdraw " + displayAmount, alertButtons);

  }

  /**
   * Handles the server response. If the withdrawl is succesful, the wallet is updated.
   *
   * @param res
   * @param displayAmount
   */
  private handleWithdrawal(res, displayAmount) {

    if (res.data) {
      this.walletSrv.updateWallet(res.data);
      this.form.reset();
      Alert(
        this.alertCtrl,
        "Withdrawal Success",
        displayAmount + " has been successfully withdrawn from your account.",
        ["Dismiss"],
      );

    } else {
      Alert(
        this.alertCtrl,
        "Withdrawal Failed",
        displayAmount + " could not have been processed." + res.errors.message,
        ["Dismiss"],
      );
    }
  }
}
