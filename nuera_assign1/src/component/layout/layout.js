import React from "react";
import Aux from "../../hoc/Auxiliary";

/**
 *Stateless component that handles the layout of the app 
 *
 * @param {*} props
 */
const layout = props => (
  <Aux>
    <main>{props.children}</main>
  </Aux>
);

export default layout;
