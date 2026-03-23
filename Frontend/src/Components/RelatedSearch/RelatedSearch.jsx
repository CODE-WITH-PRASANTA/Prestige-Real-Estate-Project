import React from "react";
import "./RelatedSearch.css";

const RelatedSearch = () => {
  return (
    <div className="relatedSearch">
      <div className="relatedSearch-container">

        <h2 className="relatedSearch-title">
          Related to your search
        </h2>

        <div className="relatedSearch-grid">

          {/* COLUMN 1 */}
          <div className="relatedSearch-col">
            <h4>Satabdi Nagar & nearby listings</h4>
            <p>Rent 3 BHK House/Villa in Satabdi Nagar for Rs 23000</p>
          </div>

          {/* COLUMN 2 */}
          <div className="relatedSearch-col">
            <h4>Property Options in Satabdi Nagar</h4>
            <p>House for rent in Satabdi Nagar without brokerage</p>
            <p>Verified House for rent in Satabdi Nagar</p>
            <p>Villas for rent in Satabdi Nagar</p>
            <span className="relatedSearch-link">View 1 More</span>
          </div>

          {/* COLUMN 3 */}
          <div className="relatedSearch-col">
            <h4>House near Satabdi Nagar</h4>
            <p>House for rent in Jagamara</p>
            <p>House for rent in Nayapalli</p>
            <p>House for rent in Ganga Nagar</p>
            <span className="relatedSearch-link">View 13 More</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RelatedSearch;