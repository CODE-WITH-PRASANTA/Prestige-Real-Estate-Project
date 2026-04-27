import React from "react";
// import WeaveSpinner from "../../Components/WeaveSpinner/WeaveSpinner";
import "./Loader.css";
import WeaveSpinner from "../WeaveSpinner/WeaveSpinner";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <WeaveSpinner />
    </div>
  );
};

export default Loader;