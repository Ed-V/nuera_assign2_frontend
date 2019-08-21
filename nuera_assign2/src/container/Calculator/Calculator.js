import React, { Component } from "react";
import CalcControl from "./../../component/ui/CalcControl";
import Items from "../../component/items/items";
import * as category from "./../../entity/category";
import { inject, observer } from "mobx-react";
import axios from "./../../wrappers/axiosWrapper";
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

  /**
   * Get list of items after component has bee loaded
   */
  componentDidMount() {
    axios
      .get("/item")
      .then(response => {
        let itemListObject = JSON.parse(response.data);

        itemListObject.forEach(element => {
          this.props.itemStore.addItem(
            element.name,
            element.value,
            element.category,
            element.itemId
          );
        });
      })
      .catch(error => {
        //Basic error for brevity of assessment
        alert("An error occured, see console for details");
        console.log(error);
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    var itemId = this.props.itemStore.generateId();

    axios
      .post(
        "/item",
        JSON.stringify([
          {
            name: this.state.itemName,
            value: this.state.itemCost,
            category: this.state.itemCategory,
            itemId: itemId
          }
        ]),
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then(response => {
        this.props.itemStore.addItem(
          this.state.itemName,
          this.state.itemCost,
          this.state.itemCategory,
          itemId
        );
      })
      .catch(error => {
        alert("An error occured, see console for more detail");
        console.log(error);
      });
  };

  handleItemEdit = (itemId, event) => {
    axios
      .put(
        "/item",
        JSON.stringify({
          name: this.state.itemName,
          value: this.state.itemCost,
          category: this.state.itemCategory,
          itemId: itemId
        }),
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then(response => {
        let itemEdit = this.props.itemStore.findItem(itemId);

        itemEdit.name = this.state.itemName;
        itemEdit.value = this.state.itemCost;
        itemEdit.category = this.state.itemCategory;
      })
      .catch(error => {
        alert("An error occured, see console for more detail");
        console.log(error);
      });
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
    axios
      .delete("item/" + id)
      .then(response => {
        this.props.itemStore.removeItem(id);
      })
      .catch(error => {
        alert("An error occured, see console for details");
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <Items
          handleItemDelete={this.handleItemDelete}
          itemList={this.props.itemStore.sortedArray}
          categoryTotal={this.props.itemStore.calcCategoryTotal}
          listTotal={this.props.itemStore.itemTotalPrice}
          handleItemEdit={this.handleItemEdit}
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
