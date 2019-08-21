import React, { Component } from "react";
import CalcControl from "./../../component/ui/CalcControl";
import Items from "../../component/items/items";
import * as category from "./../../entity/category";
import { inject, observer } from "mobx-react";
/**
 *A stateful component that creates a calculator
 *
 * @class Calculator
 * @extends {Component}
 */
class Calculator extends Component {

    //Local states are used as the data entered doesn't matter to other parts of the program
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemCost: 0,
      itemCategory: category.Electronics
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.itemStore.addItem(
      this.state.itemName,
      this.state.itemCost,
      this.state.itemCategory
    );
  };

  handleCostChanged = event => {
    this.setState({ itemCost: event.target.value });
  };

  handleNameChanged = event => {
    this.setState({ itemName: event.target.value });
  };

  handleCategoryChanged = event => {
    this.setState({
      itemCategory:
        event.target.options[event.target.options.selectedIndex].value
    });
  };

  handleItemDelete = (id, event) => {
    this.props.itemStore.removeItem(id);
  };

  render() {
    return (
      <div className="container">
        <Items
          handleItemDelete={this.handleItemDelete}
          itemList={this.props.itemStore.sortedArray}
          categoryTotal={this.props.itemStore.calcCategoryTotal}
          listTotal={this.props.itemStore.itemTotalPrice}
        />
        <CalcControl
          itemName={this.state.itemName}
          itemCost={this.state.itemCost}
          itemCategory={this.state.itemCategory}
          handleCostChanged={this.handleCostChanged}
          handleNameChanged={this.handleNameChanged}
          handleCategoryChanged={this.handleCategoryChanged}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default inject("itemStore")(observer(Calculator));
