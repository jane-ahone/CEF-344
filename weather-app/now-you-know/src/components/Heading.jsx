import React from "react";
import "./Heading.css";

const Heading = ({ weatherInfoProp }) => {
  const date = new Date();
  const time = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const weatherInfo = weatherInfoProp.get();
  return (
    <div className="headingMain">
      <p className="location">Buea</p>
      <p className="time"> {time} </p>
    </div>
  );
};

export default Heading;
