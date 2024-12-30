import React, { useRef } from "react";
import Wheel from "./components/SpinComp";

const App = () => {
  const wheelRef = useRef(null);

  const handleSpin = () => {
    const duration = 2600;
    const winningRotation = Math.random() * 360 + 360 * 5; // Random rotation between 360 and 1800
    if (wheelRef.current) {
      wheelRef.current.spinTo(winningRotation, duration);
    }
  };

  const handleFinished = (result) => {
    alert(`Spin finished! The arrow points to: ${result}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.arrow}></div> {/* Arrow positioned above the wheel */}
      <Wheel ref={wheelRef} onFinished={handleFinished} />
      <button style={styles.button} onClick={handleSpin}>
        Spin Wheel
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginTop: "50px",
    position: "relative",
  },
  // arrow: {
  //   width: "0",
  //   height: "0",
  //   borderLeft: "10px solid transparent",
  //   borderRight: "10px solid transparent",
  //   borderBottom: "20px solid red",
  //   position: "absolute",
  //   top: "20px", // Position the arrow above the wheel
  //   zIndex: 1,
  // },
  button: {
    padding: "10px 20px",
    backgroundColor: "magenta",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default App;
