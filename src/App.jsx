import React, { useState, useRef, useCallback } from "react";
import Wheel from "./components/SpinComp";

const App = () => {
  const wheelRef = useRef(null);
  const [userInputs, setUserInputs] = useState(["", "", ""]);
  const [isValidated, setIsValidated] = useState(false);
  const [currentSpin, setCurrentSpin] = useState(0);
  const [isEligible, setIsEligible] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  const handleInputChange = (index, value) => {
    const newInputs = [...userInputs];
    newInputs[index] = value ? parseInt(value, 10) : ""; // Store as numbers or empty
    setUserInputs(newInputs);
    validateInputs(newInputs);
  };

  const validateInputs = (inputs) => {
    const areValid =
      inputs.length === 3 &&
      inputs.every((val) => val >= 1 && val <= 12 && val !== "");
    if (areValid) {
      setValidationMessage("Inputs are valid! You can now spin the wheel.");
      setIsValidated(true);
    } else {
      setValidationMessage("Please enter 3 valid numbers between 1 and 12.");
      setIsValidated(false);
    }
  };

  const handleSpin = () => {
    if (!isValidated) {
      alert("Please validate inputs before spinning.");
      return;
    }

    if (currentSpin >= 3) {
      alert("You have completed all 3 spins!");
      return;
    }

    if (!isEligible) {
      alert("Spin denied! The last spin didn't match your first input.");
      setCurrentSpin(0);
      return;
    }

    const duration = 3500; // Spin duration
    const direction = 1; // Always clockwise
    const randomRotation = Math.random() * 360 + 360 * 5; // Random rotations

    const winningRotation = direction * randomRotation;

    if (wheelRef.current) {
      // Triggering the spin using the wheelRef
      wheelRef.current.spinTo(winningRotation, duration);
    }
  };

  const handleFinished = (result) => {
    alert(`Spin finished! The arrow points to: ${result}`);

    const isMatch = result === userInputs[0];

    if (!isMatch) {
      alert("The spin result did not match your first input. Try again.");
      setIsEligible(false); // Disable further spins
      setCurrentSpin(0); // Reset currentSpin to 0
      return; // Exit early
    }

    // If the result matches, proceed
    setIsEligible(true);
    setCurrentSpin((prevSpin) => prevSpin + 1);

    if (currentSpin === 0) {
      alert("You can now proceed to the second and third spins!");
    }
  };

  const handleWheelKey = useCallback(() => {
    return currentSpin; // Returning the currentSpin as a key to force re-render
  }, [currentSpin]);

  return (
    <div style={styles.container}>
      <div style={styles.inputsContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <input
            key={index}
            type="number"
            min="1"
            max="12"
            value={userInputs[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Input ${index + 1}`}
            style={styles.input}
          />
        ))}
      </div>
      <p style={styles.validationMessage}>{validationMessage}</p>

      <Wheel
        ref={wheelRef}
        onFinished={handleFinished}
        key={handleWheelKey()} // Key forces re-render
      />

      <button style={styles.button} onClick={handleSpin}>
        Spin Wheel {currentSpin} /3
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
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "50px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  validationMessage: {
    color: "green",
    fontSize: "14px",
  },
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
