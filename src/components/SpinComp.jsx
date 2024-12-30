import React, { forwardRef, useImperativeHandle, useRef } from "react";

const Wheel = forwardRef(({ onFinished }, ref) => {
  const wheelRef = useRef();
  const segments = Array.from({ length: 12 }, (_, i) => i + 1);
  const totalSegments = segments.length;
  const segmentAngle = 360 / totalSegments;

  useImperativeHandle(ref, () => ({
    spinTo: (rotation, duration) => {
      if (wheelRef.current) {
        wheelRef.current.style.transition = `transform ${duration}ms ease-out`;
        wheelRef.current.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
          const normalizedRotation = rotation % 360;
          const segmentIndex = Math.floor(normalizedRotation / segmentAngle);
          const result = segments[segments.length - 1 - segmentIndex]; // Adjust for clockwise rotation
          if (onFinished) {
            onFinished(result);
          }
        }, duration);
      }
    },
  }));

  return (
    <div
      style={{
        position: "relative",
        width: "300px",
        height: "300px",
      }}
    >
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          top: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0",
          height: "0",
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "30px solid black",
          zIndex: 2,
        }}
      />
      {/* Wheel */}
      <div
        ref={wheelRef}
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          position: "relative",
          background: `conic-gradient(
            red 0deg ${segmentAngle}deg, 
            yellow ${segmentAngle}deg ${2 * segmentAngle}deg, 
            green ${2 * segmentAngle}deg ${3 * segmentAngle}deg, 
            blue ${3 * segmentAngle}deg ${4 * segmentAngle}deg, 
            orange ${4 * segmentAngle}deg ${5 * segmentAngle}deg, 
            pink ${5 * segmentAngle}deg ${6 * segmentAngle}deg, 
            cyan ${6 * segmentAngle}deg ${7 * segmentAngle}deg, 
            purple ${7 * segmentAngle}deg ${8 * segmentAngle}deg, 
            lime ${8 * segmentAngle}deg ${9 * segmentAngle}deg, 
            teal ${9 * segmentAngle}deg ${10 * segmentAngle}deg, 
            coral ${10 * segmentAngle}deg ${11 * segmentAngle}deg, 
            violet ${11 * segmentAngle}deg ${12 * segmentAngle}deg
          )`,
          border: "2px solid black",
        }}
      >
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: `rotate(${index * segmentAngle}deg)`,
              transformOrigin: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -130px) translateX(35px) rotate(-${
                  index * segmentAngle
                }deg)`,
                transformOrigin: "center",
                textAlign: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {segment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Wheel;
