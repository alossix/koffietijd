import React, { useState } from "react";
import axios from "axios";

const AddRoaster = () => {
  const [roasterName, setRoasterNameState] = useState("");
  const [roasterAddress, setRoasterAddressState] = useState("");
  const [roasterUrl, setRoasterUrlState] = useState("");
  const [logoUrl, setLogoUrlState] = useState("");
  const [imageUrl, setImageUrlState] = useState("");

  const addRoasterHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/add-roaster", {
        roasterName,
        roasterAddress,
        roasterUrl,
        logoUrl,
        imageUrl,
      })
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  return (
    <div className="add-roaster">
      <form className="add-roaster-form" onSubmit={addRoasterHandler}>
        <label>
          Roaster Name:
          <input
            type="text"
            name="roasterName"
            value={roasterName}
            required
            onChange={(e) => setRoasterNameState(e.target.value)}
          ></input>
        </label>
        <label>
          Roaster Address:
          <input
            type="text"
            name="roasterAddress"
            value={roasterAddress}
            required
            onChange={(e) => setRoasterAddressState(e.target.value)}
          ></input>
        </label>
        <label>
          Roaster Website URL:
          <input
            type="text"
            name="roasterUrl"
            value={roasterUrl}
            required
            onChange={(e) => setRoasterUrlState(e.target.value)}
          ></input>
        </label>
        <label>
          Roaster Logo URL:
          <input
            type="text"
            name="logoUrl"
            value={logoUrl}
            onChange={(e) => setLogoUrlState(e.target.value)}
          ></input>
        </label>
        <label>
          Photo of Roastery URL:
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrlState(e.target.value)}
          ></input>
        </label>
        <button type="submit">Add New Roaster</button>
      </form>
      <button type="submit">Add roaster coffees</button>
    </div>
  );
};

export default AddRoaster;
