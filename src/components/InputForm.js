import React, { Component } from "react";
import {
  isNonNegativeInteger,
  isValid2dArray
} from "../helpers/ValidationHelper";

class InputForm extends Component {
  state = {
    formInput: {
      seats: "",
      passengers: ""
    },
    error: null
  };

  handleInput = ({ currentTarget: input }) => {
    const formInput = { ...this.state.formInput };
    formInput[input.name] = input.value;
    this.setState({ formInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    const passengers = +this.state.formInput.passengers;
    const bracketsRegex = /(\[*\]*)/g;
    const seats = this.state.formInput.seats.split("],[").map(ele => {
      const arr = ele.replace(bracketsRegex, "").split(",");
      return [+arr[0], +arr[1]];
    });
    if (this.formIsValid(seats, passengers)) {
      this.props.createNewPlane(seats, passengers);
    }
  };

  formIsValid(seats, passengers) {
    if (!isNonNegativeInteger(passengers)) {
      this.setState({ error: "Passengers must be at least 0." });
      return false;
    }
    if (!isValid2dArray(seats)) {
      this.setState({ error: "Seats must be a valid array" });
      return false;
    }
    this.setState({ error: null });
    return true;
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="ui error form card black centered"
        >
          <div className="content">
            <div className="header">Create a Plane</div>
            <div className="description">
              <h3>Seats assignment priority:</h3>
              <ol>
                <li>Aisle Seats</li> <li>Window Seats</li> <li>Middle Seats</li>
              </ol>
            </div>
          </div>
          <div className="field">
            <label>Seats (Row, Column)</label>
            <input
              value={this.state.seats}
              onChange={this.handleInput}
              type="text"
              name="seats"
              placeholder="Array: [3,2],[2,2],[3,2]"
              required
            />
          </div>
          <div className="field">
            <label>No of Passengers</label>
            <input
              value={this.state.passengers}
              type="number"
              onChange={this.handleInput}
              name="passengers"
              placeholder="Number of Passengers"
            />
          </div>
          {this.state.error && (
            <div className="ui error message">
              <div className="header">Input Error</div>
              <p>{this.state.error}</p>
            </div>
          )}
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default InputForm;
