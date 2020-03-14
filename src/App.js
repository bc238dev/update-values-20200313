import React from "react";
import "./styles.css";

// I will create a context here that I can share between
// different components
let createDataContext = function() {
  let listeners = [];
  let state = { val1: 1, val2: 2 };

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

  render() {
    return (
      <div className="comp1">
        --- Comp1 ---
        <hr />
        val2: {this.state.val2}
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
        val1: {this.state.val1} & val2: {this.state.val2}
        <Comp1 />
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <Comp2 />
    </div>
  );
}

function updateData4Demo() {
  let cntr = 1;

  setInterval(() => {
    cntr++;
    dataCtx.update({ val1: cntr, val2: 2 * cntr });
  }, 100);
}

updateData4Demo();
