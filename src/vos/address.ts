export default class Address {
  private _street: string;

  private _number: number;

  private _district: string;

  private _complement: string;

  private _zip: string;

  private _city: string;

  private _state: string;

  constructor(
    street: string,
    number: number,
    district: string,
    complement: string,
    zip: string,
    city: string,
    state: string,
  ) {
    this._street = street;
    this._number = number;
    this._district = district;
    this._complement = complement;
    this._zip = zip;
    this._city = city;
    this._state = state;

    this.validate();
  }

  private validate(): void {
    if (this._street.length <= 0) {
      throw new Error('Street is required.');
    }
  }

  public toString(): string {
    return `${this._street}, ${this._number}, ${this._district}, ${this._complement}, ${this._zip}, ${this._city}-${this._state}`;
  }
}
