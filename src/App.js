import React, { Component } from "react";
import ShowAirplaneSeats from "./components/ShowAirplaneSeats";
import AirplaneSeater from "./helpers/AirplaneSeater";
import InputForm from "./components/InputForm";
import { seats, passengers } from "./input/input";
import "./App.css";
import Legend from "./components/Legend";

class App extends Component {
  state = {
    seatingData: null,
    vw: null
  };

  componentDidMount = () => {
    this.createNewPlane(seats, passengers);
    window.addEventListener("resize", this.resize);
    this.resize();
  };

  resize = () => {
    let currentWidth = window.innerWidth;
    if (currentWidth !== this.state.vw) {
      this.setState({ vw: currentWidth });
    }
  };

  createNewPlane = (seats, passengers) => {
    const airplane = new AirplaneSeater(seats, passengers);
    const seatingData = airplane.seatingData;
    this.setState({ seatingData });
  };

  render() {
    return (
      <div>
        <h1>Airplane Seating</h1>
        <ShowAirplaneSeats
          seatingData={this.state.seatingData}
          vw={this.state.vw}
        />
        <div className="pt-5">
          <div className="ui two column container very relaxed stackable grid">
            <div className="column">
              <Legend />
            </div>
            <div className="column">
              <InputForm createNewPlane={this.createNewPlane} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
