import React from "react";

const RentFullDescription = ({ property }) => {

  return (
    <div className="rent-description-card">

      <h2>About This Property</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: property.description,
        }}
      />

    </div>
  );
};

export default RentFullDescription;