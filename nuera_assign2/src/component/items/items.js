import React from "react";
import Aux from "./../../hoc/Auxiliary";
/**
 *A stateless component that handles displaying the list of items
 *
 * @param {*} props - Passed props
 * @returns Component
 */
const items = props => {
  const itemsDisplay = props.itemList.map(itemElement => (
    <Aux key={itemElement[0].category}>
      <div className="columns has-text-left">
        <div className="column title">{itemElement[0].category}</div>
        <div className="column">
          ${props.categoryTotal(itemElement[0].category)}
        </div>
      </div>
      
      {itemElement.map(innerItemElement => (
        <div key={innerItemElement.id} className="columns has-text-left">
          <div className="column has-text-weight-bold">{innerItemElement.name}</div>
          <div className="column">${innerItemElement.value}</div>
          <div className="column"><button className="button is-danger" onClick={props.handleItemDelete.bind(this, innerItemElement.id)}>Remove</button></div>
        </div>
      ))}
    </Aux>
  ));

  return <div>{itemsDisplay}
  
  <div className="columns has-text-left">
      <div className="column">TOTAL</div>
      <div className="column">${props.listTotal}</div>
  </div>
  </div>;
};

export default items;
