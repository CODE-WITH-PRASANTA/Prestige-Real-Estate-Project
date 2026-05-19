import React, { useState } from "react";
import "./RentShortDescription.css";

const RentShortDescription = ({ property }) => {

  const [expanded, setExpanded] = useState(false);

  const shortText =
    property?.shortDesc ||
    "No short description available.";

  const limit = 180;

  const shouldTrim =
    shortText.length > limit;

  const displayText =
    expanded || !shouldTrim
      ? shortText
      : shortText.slice(0, limit) + "...";

  return (
    <div className="rent-short-card">

      <div className="rent-short-top">

        <h2>
          About This Property
        </h2>

        <span className="rent-short-badge">
          Premium Listing
        </span>

      </div>

      <p className="rent-short-text">
        {displayText}
      </p>

      {shouldTrim && (
        <button
          className="rent-read-more-btn"
          onClick={() =>
            setExpanded(!expanded)
          }
          type="button"
        >
          {expanded
            ? "Show Less"
            : "Read More"}
        </button>
      )}

    </div>
  );
};

export default RentShortDescription;