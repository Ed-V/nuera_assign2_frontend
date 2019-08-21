import React from "react";
import "./App.css";
import Layout from "./component/layout/layout";
import Calculator from './container/Calculator/Calculator';

//The main application component, acts as the entry
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout><Calculator></Calculator></Layout>
      </div>
    );
  }
}

export default App;
