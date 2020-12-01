import React from "react";

const AddRoaster = () => {
  return (
    <div className="add-roaster">
      <p>Test</p>
      <form action="/add-roaster" method="POST">
        <label>
          Roaster Name:
          <input type="text" name="roasterName"></input>
        </label>
        <label>
          Roaster Address:
          <input type="text" name="roasterAddress"></input>
        </label>
        <label>
          Roaster Website URL:
          <input type="text" name="roasterUrl"></input>
        </label>
        <label>
          Roaster Logo URL:
          <input type="text" name="logoUrl"></input>
        </label>
        <label>
          Photo of Roastery URL:
          <input type="text" name="imageUrl"></input>
        </label>
      </form>
    </div>
  );
};

export default AddRoaster;
