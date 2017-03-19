import {Pipe} from "@angular/core";
@Pipe({
  name: "phone",
})
export class PhonePipe {
  /**
   * Modifies the input telephone number to match standard representations.
   *
   * @param val Telephone number as string.
   * @param args
   * @returns {String}
   */
  public transform(val, args) {
    if (val.length === 7) {
      return val.slice(0, 3) + "-" + val.slice(3, 7);
    } else
    if (val.length === 10) {
      let areaCode = val.slice(0, 3);
      let threeDigit = val.slice(3, 6);
      let fourDigit = val.slice(6, 10);

      return "(" + areaCode + ")" + " " + threeDigit + "-" + fourDigit;
    }

    return val;
  }
}
