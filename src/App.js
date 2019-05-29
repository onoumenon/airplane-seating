import React, { Component } from "react";
import ShowAirplaneSeats from "./components/ShowAirplaneSeats";
import { AirplaneSeating } from "./helpers/AirplaneSeating";
import InputForm from "./components/InputForm";
import { seats, passengers } from "./input/input";
import "./App.css";
import Legend from "./components/Legend";

class App extends Component {
  state = {
    seatingData: null
  };

  componentDidMount = () => {
    this.createNewPlane(seats, passengers);
  };

  createNewPlane = (seats, passengers) => {
    const airplane = new AirplaneSeating(seats, passengers);
    const seatingData = airplane.seatingData;
    this.setState({ seatingData });
  };

  render() {
    return (
      <div>
        <h1>Airplane Seating</h1>
        <ShowAirplaneSeats seatingData={this.state.seatingData} />
        <div className="pt-5">
          <div className="ui two column container very relaxed stackable grid">
            <div className="column">
              <InputForm createNewPlane={this.createNewPlane} />
            </div>
            <div className="column">
              <Legend />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
