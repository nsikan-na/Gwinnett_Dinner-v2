import React from "react";

export default function LocationPortal() {
  return (
    <div>
      <form >
        <label >Select a location</label>
        <select name="location" id="location">
          <option default hidden></option>
          <option>Snellville</option>
          <option>Peachtree Corners</option>
          <option>Lawrenceville</option>
          <option>Mountain Park</option>
        </select>
        <button>I live here!</button>
      </form>
    </div>
  );
}
