import React from "react";
import "./styles.css";

// I will create a context here that I can share between
// different components
let createDataContext = function() {
  let listeners = [];
  let state = {
    // Data
    val1: 1,
    val2: 2,
    val3: 0,
    cntr: 0,

    // Methods
    onClick: () => {
      state.val3++;
    }
  };

  return {
    update: data => {
      state = { ...state, ...data };
      listeners.forEach(cb => cb(state));
    },
    register: cb => {
      listeners.push(cb);
    },
    getState: () => {
      return state;
    },
    incr: () => {
      state.cntr++;
    },
    decr: () => {
      state.cntr--;
    }
  };
};

let dataCtx = createDataContext();

class Comp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    dataCtx.register(d => {
      this.setState({ ...d });
    });
  }

  handleClick = () => {
    // console.log("Comp1 clicked...");
    dataCtx.getState().onClick();
  };

  render() {
    return (
      <div className="comp1" onClick={this.handleClick}>
        --- Comp1 ---
        <hr />
        val1: {this.state.val1} & val2: {this.state.val2} & val3:
        {this.state.val3} & cntr: {this.state.cntr}
      </div>
    );
  }
}

class Comp2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    dataCtx.register(d => {
      this.setState({ ...d });
    });
  }

  render() {
    return (
      <div className="comp2">
        --- Comp2 ---
        <hr />
        val1: {this.state.val1} & val2: {this.state.val2} & val3:
        {this.state.val3}
        <hr />
        <Comp1 />
        <hr />
        <button onClick={() => dataCtx.incr()}>+</button>
        <button onClick={() => dataCtx.decr()}>-</button>
        cntr: {this.state.cntr}
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <Comp1 />
      <Comp2 />
    </div>
  );
}

function updateData4Demo() {
  let cntr = 0;

  setInterval(() => {
    cntr++;
    dataCtx.update({ val1: cntr, val2: 2 * cntr });
  }, 100);
}

updateData4Demo();
