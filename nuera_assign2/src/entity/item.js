import { observable, action, decorate, computed } from "mobx";

/**
 *
 * This class represents an item
 *
 * @export {Item} The item class
 * @class Item
 */
const item = class Item {
  constructor(name, value, category, id) {
    this._id = id;
    this._name = name;
    this._value = this.StringCoverter(value);
    this._category = category;
  }

  get name() {
    return this._name;
  }

  get value() {
    return this._value;
  }

  get category() {
    return this._category;
  }

  get id() {
    return this._id;
  }

  set name(newName) {
    this._name = newName;
  }

  set value(newValue) {
    this._value = this.StringCoverter(newValue);
  }

  set category(newCategory) {
    this._category = newCategory;
  }

  set id(newValue) {
    this._id = newValue;
  }

  /**
   * Covert a string to number if not already
   * @param {number} value - coverted value
   */
  StringCoverter(value) {
    let result = 0;
    if (typeof value === "string") {
      result = parseInt(value, 10);
    } else {
      result = value;
    }
    return result;
  }
}

export default item;

decorate (item, {
  _name: observable,
  _id: observable,
  _value: observable,
  _category: observable
})
