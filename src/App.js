import React from "react";
import "./styles.css";

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

function Comp1(props) {
  return <div className="comp1">Comp1</div>;
}

let cntr = 1;

setInterval(() => {
  cntr++;
  dataCtx.update({ val1: cntr, val2: 2 * cntr });
}, 100);

class Comp2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    dataCtx.register(d => {
      this.setState({ ...d });
    });
  }

  render() {
    return (
      <div className="comp2">
        <h5>Comp2</h5>
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
