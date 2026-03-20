import React from "react";
import "./PropertyDetailsStrip.css";

const PropertyDetailsStrip = () => {
  const data = [
    { label: "Total Floors", value: "3 Floors" },
    { label: "Parking", value: "1 Covered, 1 Open" },
    { label: "Rent Agreement Duration", value: "11 Months" },
    { label: "Months of Notice", value: "2 Months" },
    { label: "Electricity & Water Charges", value: "Charges not included" },
    { label: "Power Backup", value: "None" },
    { label: "Property Age", value: "5 to 10 Year Old" },
    { label: "Security Deposit", value: "Rs46,000" }
  ];

  return (
    <div className="pds-wrapper">
      <div className="pds-grid">
        {data.map((item, index) => (
          <div className="pds-item" key={index}>
            <p className="pds-label">{item.label} :</p>
            <h4 className="pds-value">{item.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetailsStrip;