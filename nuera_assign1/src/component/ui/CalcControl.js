import React from "react";
import * as category from "./../../entity/category";
/**
 *A stateless component that handles the controls of the item list
 *
 * @param {*} props - Passed in props
 */
const calcControl = props => (
  <form onSubmit={props.handleSubmit.bind(this)}>
    <div className="field is-horizontal">
      <div className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Item Name"
          value={props.itemName}
          onChange={props.handleNameChanged.bind(this)}
        />
      </div>

      <div className="control is-expanded">
        <input
          className="input"
          type="number"
          placeholder="ItemCost"
          value={props.itemCost}
          onChange={props.handleCostChanged.bind(this)}
        />
      </div>

      <div className="control is-expanded">
        <div className="select is-fullwidth">
          <select
            selected={props.itemCategory}
            className="is-fullWidth"
            onChange={props.handleCategoryChanged.bind(this)}
          >
            <option value={category.Electronics}>{category.Electronics}</option>
            <option value={category.Clothing}>{category.Clothing}</option>
            <option value={category.Kitchen}>{category.Kitchen}</option>
          </select>
        </div>
      </div>

      <div className="control is-expanded">
        <input className="button is-primary" type="submit" value="Add" />
      </div>
    </div>
  </form>
);

export default calcControl;
