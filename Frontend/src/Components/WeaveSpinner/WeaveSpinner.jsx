import React from "react";

const WeaveSpinner = () => {
  return (
    <>
      <style>
        {`
          .spinner-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .spinner-container {
            position: relative;
            width: 160px;
            height: 160px;
            transform-style: preserve-3d;
            perspective: 1200px;
          }

          /* Center glowing dot */
          .node {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 12px;
            background: #ffaa00;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow:
              0 0 20px #ffaa00,
              0 0 40px rgba(255, 170, 0, 0.6);
            animation: nodePulse 1.6s ease-in-out infinite;
          }

          /* Thread base */
          .thread {
            position: absolute;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 170, 0, 0.8),
              transparent
            );
            box-shadow: 0 0 10px rgba(255, 170, 0, 0.5);
            transform-origin: center;
          }

          .t1 {
            width: 100%;
            height: 2px;
            top: 30%;
            animation: weave1 2s infinite;
          }

          .t2 {
            width: 2px;
            height: 100%;
            left: 70%;
            animation: weave2 2.2s infinite;
          }

          .t3 {
            width: 100%;
            height: 2px;
            bottom: 30%;
            animation: weave3 2.4s infinite;
          }

          .t4 {
            width: 2px;
            height: 100%;
            left: 30%;
            animation: weave4 2.6s infinite;
          }

          /* Animations */
          @keyframes nodePulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.4);
            }
          }

          @keyframes weave1 {
            0% { transform: translateY(0); }
            50% { transform: translateY(40px) rotateX(60deg); }
            100% { transform: translateY(0); }
          }

          @keyframes weave2 {
            0% { transform: translateX(0); }
            50% { transform: translateX(-40px) rotateY(60deg); }
            100% { transform: translateX(0); }
          }

          @keyframes weave3 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-40px) rotateX(-60deg); }
            100% { transform: translateY(0); }
          }

          @keyframes weave4 {
            0% { transform: translateX(0); }
            50% { transform: translateX(40px) rotateY(-60deg); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div className="spinner-wrapper">
        <div className="spinner-container">
          <div className="thread t1" />
          <div className="thread t2" />
          <div className="thread t3" />
          <div className="thread t4" />
          <div className="node" />
        </div>
      </div>
    </>
  );
};

export default WeaveSpinner;