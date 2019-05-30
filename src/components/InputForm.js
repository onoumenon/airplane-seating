import React, { Component } from "react";
import {
  isNonNegativeSafeInteger,
  isValid2dArray,
  isLessThan
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
    const seats = this.state.formInput.seats
      .split(/\s*]\s*,\s*\[\s*/)
      .map(ele => {
        const arr = ele.replace(bracketsRegex, "").split(",");
        return [+arr[0], +arr[1]];
      });
    if (!this.formIsValid(seats, passengers)) {
      return;
    }
    this.props.createNewPlane(seats, passengers);
    window.scrollTo(0, 0);
  };

  formIsValid(seats, passengers) {
    if (!isNonNegativeSafeInteger(passengers)) {
      this.setState({ error: "Passengers must be at least 0." });
      return false;
    }
    if (!isValid2dArray(seats, isLessThan, 10)) {
      this.setState({
        error: "Seats must be a valid array with numbers below 10."
      });
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
          className="ui error form card centered"
        >
          <div className="content">
            <div className="header">
              <h2>Create a Plane</h2>
            </div>
            <div className="description">
              Row and Col numbers must be below 10.
              <h3>Seats assignment priority</h3>
              <p>Aisle Seats</p> <p>Window Seats</p> <p>Middle Seats</p>
            </div>
          </div>
          <div className="field">
            <label htmlFor="seats-input">Seats (Row, Column)</label>
            <input
              value={this.state.seats}
              onChange={this.handleInput}
              type="text"
              id="seats-input"
              name="seats"
              placeholder="Array: [3, 2], [4, 3], [2, 3], [3, 4]"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="passengers-input">No of Passengers</label>
            <input
              value={this.state.passengers}
              onChange={this.handleInput}
              type="number"
              id="passengers-input"
              name="passengers"
              placeholder="No of Passengers: 30"
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
