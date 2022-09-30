// import "react-calendar/dist/Calendar.css";
import "./App.css";
import Calendar from "react-calendar";
import React, { useState } from "react";
import "./Calendar.css";
import AllEvents from "./AllEvents";

function App() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="App App-header">
      <div className=" flex-container">
        <div className="Calendar-border flex-child">
          <Calendar onChange={onChange} value={value} />
        </div>
        <div className="flex-child">
          <AllEvents />
        </div>
      </div>
    </div>
  );
}

export default App;
