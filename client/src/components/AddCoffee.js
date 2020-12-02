import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddCoffee = () => {
  // const formHandler = (data) => {
  // }

  const getRoasters = () => {
    // db query for list of existing roasters
    return [1, 2, 3];
  };

  return (
    <div className="add-coffee">
      <form className="add-coffee-form" action="/add-coffee" method="POST">
        <label>
          Select a Roaster:
          <select>
            {/* // add full roaster info and connect to ID */}
            {/* {getRoasters.map((roaster) => {
            return <option>{roaster}</option>;
          })} */}
          </select>
        </label>
        <label>
          Coffee Name:
          <input type="text" name="coffeeName" required></input>
        </label>
        <label>
          Roast Style:
          <input type="text" name="roastStyle" required></input>
        </label>
        <label>
          Coffee Image URL:
          <input type="text" name="coffeeImageUrl" required></input>
        </label>
        <label>
          Country of Origin:
          <input type="text" name="countryOfOrigin"></input>
        </label>
        <label>
          {/* // separate array Coffee Description / Tasting Notes: */}
          <input type="text" name="coffeeDescription"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCoffee;
