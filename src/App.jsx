import "./App.css";
import TrafficSignal from "./components/TrafficSignal";
import { useState, useEffect } from "react";

const signals = [
  {
    id: "1",
    isActive: true,
    colors: [
      { color: "red", isActive: false },
      { color: "yellow", isActive: false },
      { color: "green", isActive: true },
    ],
  },
  {
    id: "2",
    isActive: false,
    colors: [
      { color: "red", isActive: true },
      { color: "yellow", isActive: false },
      { color: "green", isActive: false },
    ],
  },
  {
    id: "3",
    isActive: false,
    colors: [
      { color: "red", isActive: true },
      { color: "yellow", isActive: false },
      { color: "green", isActive: false },
    ],
  },
  {
    id: "4",
    isActive: false,
    colors: [
      { color: "red", isActive: true },
      { color: "yellow", isActive: false },
      { color: "green", isActive: false },
    ],
  },
];

function App() {
  const [signalState, setSignalState] = useState(signals);
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        // When timer hits 0, switch signal
        if (prevTimer === 0) {
          setSignalState((prevSignals) => {
            const nextIndex = (activeSignalIndex + 1) % prevSignals.length;

            const updated = prevSignals.map((signal, index) => {
              if (index === activeSignalIndex) {
                // Set current to red
                return {
                  ...signal,
                  isActive: false,
                  colors: signal.colors.map((colorObj) => ({
                    ...colorObj,
                    isActive: colorObj.color === "red",
                  })),
                };
              } else if (index === nextIndex) {
                // Set next to green and active
                return {
                  ...signal,
                  isActive: true,
                  colors: signal.colors.map((colorObj) => ({
                    ...colorObj,
                    isActive: colorObj.color === "green",
                  })),
                };
              } else {
                // All others untouched
                return signal;
              }
            });
            setActiveSignalIndex(nextIndex); // Update for next cycle
            return updated;
          });
  
          return 20;
        }
  
        // If time is <= 5, prep transition with yellow
        if (prevTimer <= 5) {
          setSignalState((prevSignals) => {
            const nextIndex = (activeSignalIndex + 1) % prevSignals.length;
  
            return prevSignals.map((signal, index) => {
              if (index === activeSignalIndex || index === nextIndex) {
                // Yellow lights for current and next
                return {
                  ...signal,
                  colors: signal.colors.map((colorObj) => ({
                    ...colorObj,
                    isActive: colorObj.color === "yellow",
                  })),
                };
              }
  
              return {
                ...signal,
                colors: signal.colors.map((colorObj) => ({
                  ...colorObj,
                  isActive: colorObj.color === "red",
                })),
              };
            });
          });
        }
  
        return prevTimer - 1;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [activeSignalIndex]);
  
  

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `0${minutes}:${seconds.toString().padStart(2, '0')}`;
  return (
    <>
      <div className="wrapper">
        <div className="timer">{formattedTime}</div>
        <div className="traffic-signals-grid">
          {signalState.map((state) => (
            <TrafficSignal key={state.id} state={state} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;