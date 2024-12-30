import React, { useState, useRef, useCallback } from "react";
import Wheel from "./components/SpinComp"; // Assuming the Wheel component is in the same directory

const App = () => {
  const wheelRef = useRef(null);
  const [userInputs, setUserInputs] = useState([3, 5, 4]);
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
      return;
    }

    // Set the same duration and speed for both the second and third spins
    const duration = 3500; // Same duration for both second and third spins
    const direction = 1; // Always clockwise (right) rotation (positive)
    const randomRotation = Math.random() * 360 + 360 * 5; // Random number of rotations (ensures multiple turns)

    const winningRotation = direction * randomRotation; // Always clockwise rotation

    if (wheelRef.current) {
      // Triggering the spin again using the wheelRef
      wheelRef.current.spinTo(winningRotation, duration); // Apply the same function for all spins
    }
  };

  const handleFinished = (result) => {
    alert(`Spin finished! The arrow points to: ${result}`);

    // Check if the first spin result matches the first input value
    const isMatch = currentSpin === 0 ? result === userInputs[0] : true;

    if (!isMatch) {
      alert("The spin result did not match your first input. Try again.");
      setIsEligible(false); // Disable further spins if the result does not match the first input
    } else {
      setIsEligible(true); // Enable further spins if the result matches the first input
    }

    setCurrentSpin((prevSpin) => prevSpin + 1);

    // If the first spin result matches, we proceed to the next spins
    if (currentSpin === 0 && isMatch) {
      alert("You can now proceed to the second and third spins!");
    }
  };

  // Force the Wheel component to re-render when the currentSpin changes
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

      {/* Key change triggers re-render of the Wheel component */}
      <Wheel
        ref={wheelRef}
        onFinished={handleFinished}
        key={handleWheelKey()} // Key forces re-render
      />

      <button style={styles.button} onClick={handleSpin}>
        Spin Wheel
      </button>
      <p>Spin {currentSpin}/3</p>
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
    color: "green", // Will toggle dynamically based on validation
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
