import React, { Component } from "react";
import socketIOClient from "socket.io-client";

// Making the App component
class App extends Component {
  endpoint = "https://2b2b904f.ngrok.io";

  componentDidMount() {
    const socket = socketIOClient(this.endpoint);
    socket.on("others", data => {
      console.log(JSON.parse(data));
    });
  }
  render() {
    return <div>하세기</div>;
  }
}

export default App;
