// import "react-calendar/dist/Calendar.css";
import "./App.css";
import Calendar from "react-calendar";
import React, { useState } from "react";
import "./Calendar.css";
import AllEvents from "./AllEvents";

function App() {
  const [value, onChange] = useState(new Date());
  const day = value.toLocaleDateString();
  // console.log(day);
  return (
    <div className="App App-header">
      <div className=" flex-container">
        <div className="Calendar-border flex-child">
          <Calendar onChange={onChange} />
        </div>
        <div className="flex-child">
          <AllEvents day={day} />
        </div>
      </div>
    </div>
  );
}

export default App;
