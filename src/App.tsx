import React from "react";
import { Divider, PageHeader } from "antd";
import { Body } from "./Components/Body";
import { Footer } from "./Components/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <PageHeader
        className="header"
        title="Sprout Mnemonic"
        subTitle="Deserialize your Sprout mnemonic"
      />
      <Body />
      <Divider style={{ margin: "1rem" }} />
      <Footer />
    </div>
  );
}

export default App;
