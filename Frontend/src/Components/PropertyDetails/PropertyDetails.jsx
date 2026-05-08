import React from "react";
import "./PropertyDetails.css";

const PropertyDetails = ({ data, setData }) => {
  const base = "property-details";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {/* LEFT TEXT */}

        <div className={`${base}__left`}>
          <h2 className={`${base}__title`}>Property Details</h2>

          <p className={`${base}__desc`}>
            Get key specs including layout, dimensions, and materials that
            define this property’s quality, structure, and overall design.
          </p>
        </div>

        {/* RIGHT FORM */}

        <div className={`${base}__form`}>
          <div className={`${base}__grid`}>
            {/* PROPERTY ID */}
            <div className={`${base}__field`}>
              <label>Property Id</label>
              <input
                name="propertyId"
                value={data.propertyId || ""}
                onChange={handleChange}
              />
            </div>

            {/* PRICE PER SQFT */}
            <div className={`${base}__field`}>
              <label>Price Per Sqft</label>
              <input
                name="pricePerSqft"
                value={data.pricePerSqft || ""}
                onChange={handleChange}
              />
            </div>

            {/* STRUCTURE TYPE */}
            <div className={`${base}__field`}>
              <label>Structure Type</label>
              <select
                name="structureType"
                value={data.structureType || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Concrete</option>
                <option>Wood</option>
                <option>Steel</option>
              </select>
            </div>

            {/* BEDROOMS */}
            <div className={`${base}__field`}>
              <label>No of Bedrooms</label>
              <input
                name="bedrooms"
                value={data.bedrooms || ""}
                onChange={handleChange}
              />
            </div>

            {/* BATHROOMS */}
            <div className={`${base}__field`}>
              <label>No of Bathrooms</label>
              <input
                name="bathrooms"
                value={data.bathrooms || ""}
                onChange={handleChange}
              />
            </div>

            {/* SQFT */}
            <div className={`${base}__field`}>
              <label>Sqft</label>
              <input
                name="sqft"
                value={data.sqft || ""}
                onChange={handleChange}
              />
            </div>

            {/* PARKING */}
            <div className={`${base}__field`}>
              <label>Parking</label>
              <input
                name="parking"
                value={data.parking || ""}
                onChange={handleChange}
              />
            </div>

            {/* BALCONY */}
            <div className={`${base}__field`}>
              <label>Balcony</label>
              <select
                name="balcony"
                value={data.balcony || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            {/* FLOOR */}
            <div className={`${base}__field`}>
              <label>Floor</label>
              <input
                name="floor"
                value={data.floor || ""}
                onChange={handleChange}
              />
            </div>

            {/* WARDROBE */}
            <div className={`${base}__field`}>
              <label>Wardrobe</label>
              <input
                name="wardrobe"
                value={data.wardrobe || ""}
                onChange={handleChange}
              />
            </div>

            {/* TV */}
            <div className={`${base}__field`}>
              <label>TV</label>
              <input
                name="tv"
                value={data.tv || ""}
                onChange={handleChange}
              />
            </div>

            {/* WATER PURIFIER */}
            <div className={`${base}__field`}>
              <label>Water Purifier</label>
              <input
                name="waterPurifier"
                value={data.waterPurifier || ""}
                onChange={handleChange}
              />
            </div>

            {/* MICROWAVE */}
            <div className={`${base}__field`}>
              <label>Microwave</label>
              <input
                name="microwave"
                value={data.microwave || ""}
                onChange={handleChange}
              />
            </div>

            {/* AC */}
            <div className={`${base}__field`}>
              <label>AC</label>
              <input
                name="ac"
                value={data.ac || ""}
                onChange={handleChange}
              />
            </div>

            {/* FRIDGE */}
            <div className={`${base}__field`}>
              <label>Fridge</label>
              <input
                name="fridge"
                value={data.fridge || ""}
                onChange={handleChange}
              />
            </div>

            {/* GARAGE SIZE */}
            <div className={`${base}__field`}>
              <label>Garage Size</label>
              <input
                name="garageSize"
                value={data.garageSize || ""}
                onChange={handleChange}
              />
            </div>

            {/* AVAILABLE FROM */}
            <div className={`${base}__field`}>
              <label>Available From</label>
              <input
                type="date"
                name="availableFrom"
                value={data.availableFrom || ""}
                onChange={handleChange}
              />
            </div>

            {/* CURTAINS */}
            <div className={`${base}__field`}>
              <label>Curtains</label>
              <select
                name="curtains"
                value={data.curtains || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            {/* YEAR CONSTRUCTED */}
            <div className={`${base}__field`}>
              <label>Year Constructed</label>
              <input
                type="date"
                name="yearConstructed"
                value={data.yearConstructed || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;