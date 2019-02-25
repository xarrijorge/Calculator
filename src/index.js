import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const Button = props => {
  return (
    <span className="key" id={props.id} onClick={props.handleClick}>
      {props.num}
    </span>
  );
};
function Display(props) {
  return <div className="display">{props.value !== "" ? props.value : 0}</div>;
}

class App extends Component {
  state = {
    display: "",
    previous: "",
    current: "",
    result: 0
  };

  handleClick = evt => {
    let mathKeys = ["-", "+", "*", "/"];

    this.setState({
      display: this.state.display + evt.target.id[1],
      current: evt.target.id[1],
      previous: this.state.display[this.state.display.length - 1]
    });
    if (
      mathKeys.includes(this.state.current) &&
      mathKeys.includes(this.state.previous)
    ) {
      console.log("they are both in array!");
      this.setState({
        display: this.state.display.slice(0, -1) + this.state.current
      });
    }
  };
  clearDisplay = () => {
    this.setState({
      display: "",
      current: "",
      previous: ""
    });
  };

  handleEqual = () => {
    let result = eval(this.state.display);
    this.setState({
      display: result
    });
  };

  removeChar = () => {
    this.setState({
      display: this.state.display.slice(0, -1)
    });
  };

  render() {
    console.log(
      `display:' ${this.state.display}, 'current:' ${
        this.state.current
      }, 'previous: ${this.state.previous}`
    );
    let mathKeys = ["-", "+", "*", "/"];
    let numKeysList = [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0];
    let numKeys = [];
    let arthKeys = [];

    for (let i of numKeysList) {
      numKeys.push(
        <Button
          className="key"
          key={i}
          num={i}
          id={"s" + i}
          handleClick={this.handleClick}
        />
      );
    }
    for (let k of mathKeys) {
      arthKeys.push(
        <Button key={k} num={k} id={"s" + k} handleClick={this.handleClick} />
      );
    }

    return (
      <div className="app">
        <Display value={this.state.display} />
        <div className="keypad">
          <div className="numericPad">
            {numKeys}
            <Button num="=" id="=" handleClick={this.handleEqual} />
          </div>
          <div className="arthKeys">
            <Button num="clr" handleClick={this.clearDisplay} />
            {arthKeys}
            <Button num="del" handleClick={this.removeChar} />
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
