import React, { useEffect, useState } from "react";
import axios from "axios";

const AddCoffee = () => {
  const [roasters, setRoastersState] = useState([]);
  const [roaster, setRoasterState] = useState("");
  const [coffeeName, setCoffeeNameState] = useState("");
  const [roastStyle, setRoastStyleState] = useState("");
  const [coffeeImageUrl, setCoffeeImageUrlState] = useState("");
  const [coffeePageUrl, setCoffeePageUrlState] = useState("");
  const [countryOfOrigin, setCountryOfOriginState] = useState("");
  const [coffeeDescription, setCoffeeDescriptionState] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/add-coffee`)
      .then((result) => {
        console.log(result.data);
        setRoastersState(result.data);
        setRoasterState(result.data[0]._id);
      })
      .catch((err) => console.error(err));
  }, []);

  const addCoffeeHandler = (event) => {
    event.preventDefault();
    console.log(event.target);
    axios
      .post("http://localhost:9000/api/add-coffee", {
        roaster,
        coffeeName,
        roastStyle,
        coffeeImageUrl,
        coffeePageUrl,
        countryOfOrigin,
        coffeeDescription,
      })
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  return (
    <div className="add-coffee">
      <form className="add-coffee-form" onSubmit={addCoffeeHandler}>
        <label>
          Select a Roaster:
          <select
            value={roaster}
            onChange={(e) => setRoasterState(e.target.value)}
          >
            {roasters.map((roaster, index) => {
              return (
                <option key={index} value={roaster._id}>
                  {roaster.roasterName}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Coffee Name:
          <input
            type="text"
            name="coffeeName"
            value={coffeeName}
            required
            onChange={(e) => setCoffeeNameState(e.target.value)}
          ></input>
        </label>
        <label>
          Roast Style:
          <input
            type="text"
            name="roastStyle"
            value={roastStyle}
            required
            onChange={(e) => setRoastStyleState(e.target.value)}
          ></input>
        </label>
        <label>
          Coffee Image URL:
          <input
            type="text"
            name="coffeeImageUrl"
            value={coffeeImageUrl}
            required
            onChange={(e) => setCoffeeImageUrlState(e.target.value)}
          ></input>
        </label>
        <label>
          Coffee Page URL:
          <input
            type="text"
            name="coffeePageUrl"
            value={coffeePageUrl}
            required
            onChange={(e) => setCoffeePageUrlState(e.target.value)}
          ></input>
        </label>
        <label>
          Country of Origin:
          <input
            type="text"
            name="countryOfOrigin"
            value={countryOfOrigin}
            onChange={(e) => setCountryOfOriginState(e.target.value)}
          ></input>
        </label>
        <label>
          Description:
          <input
            type="text"
            name="coffeeDescription"
            value={coffeeDescription}
            onChange={(e) => setCoffeeDescriptionState(e.target.value)}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCoffee;
