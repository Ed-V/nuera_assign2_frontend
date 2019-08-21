import { observable, action, decorate, computed } from "mobx";
import { computedFn } from "mobx-utils";
import item from "../../entity/item";
import * as itemCategory from "../../entity/category";

/**
 * Store used to store items and provide access to revelant functions
 */
export const itemStore = class ItemStore {
  _itemList = [];

 /**
  *
  * Add an item to the item list. Item object are automatically created
  * @param {string} name - Name of the object
  * @param {Number} value - Cost of the item
  * @param {string} category - Category of the item
  */
 addItem(name, value, category) {
    this._itemList.push(new item(name, value, category));
  }
/**
 * Remove the item from list
 *
 * @param {string} id - Unique id of item to be removed
 */
removeItem(id) {
    let toRemove = this._itemList.findIndex(item => item.id === id);
    this._itemList.splice(toRemove, 1);
  }
/**
 *Sum the totals of items based on given category
 *@param {string} category - The category to sum pricing totals of
 *@returns {number} - Sum of item in category
 */
calcCategoryTotal = computedFn(category => {
    let total = 0;
    this._itemList.forEach(element => {
      if (element.category === category) {
        total = total + element.value;
      }
    });

    return total;
  });
/**
 * Sort the item list in to arrays seperated by categories
 *
 * @readonly
 */
get sortedArray() {
    let sortedResult = [];

    itemCategory.CategoryList.forEach(category => {
      let sortedSegment = [];
      this._itemList.forEach(item => {
        if (category === item.category) {
          sortedSegment.push(item);
        }
      });

      if (sortedSegment.length > 0) {
        sortedResult.push(sortedSegment);
      }
    });

    return sortedResult;
  }
/**
 * Return the item list 
 *
 * @readonly
 */
get itemList() {
    return this._itemList;
  }
/**
 * Return the total pricing of all items in list
 *
 * @readonly
 */
get itemTotalPrice() {
    let totalCost = 0;

    this._itemList.forEach(item => {
      totalCost += item.value;
    });

    return totalCost;
  }
};

/**
 * Aid in decorating without using legacy decorators
 * 
 */
decorate(itemStore, {
  _itemList: observable,
  addItem: action,
  removeItem: action,
  sortedArray: computed,
  itemTotalPrice: computed,
  itemList: computed
});
