import React from "react";
import { useState, useEffect } from "react";

const TrafficSignal = (props) => {
  const { state } = props;

  return (
    <>
      <div className="signal-container">
        {state.colors.map((item, i) => {
          return (
            <div
              key={i}
              className={`light ${item.color} ${
                item.isActive ?`active-${item.color}` : ""
              }`}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default TrafficSignal;
