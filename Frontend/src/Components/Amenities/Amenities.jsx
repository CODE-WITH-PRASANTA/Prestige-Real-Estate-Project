import React from "react";
import "./Amenities.css";

const Amenities = ({ data, setData }) => {
  const base = "amenities";

  const amenitiesList = [
    "Air Conditioning",
    "TV Cable",
    "Refrigerator",
    "Lawn",
    "Dryer",
    "WiFi",
    "Swimming Pool",
    "Outdoor Shower",
    "Laundry",
    "Barbeque",
    "Washer", // ✅ duplicate removed
    "Microwave",
    "Gym",
    "Window Coverings",
    "Wide Open Spaces",
    "Parks",
    "Rooftop Gardens",
    "Billiards Table",
    "Clubhouse",
    "Spa",
    "Valet Trash",
    "Sporting Facilities",
  ];

  const toggleAmenity = (item) => {
    if (data.includes(item)) {
      setData(data.filter((a) => a !== item));
    } else {
      setData([...data, item]);
    }
  };

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {/* LEFT TEXT */}

        <div className={`${base}__left`}>
          <h2 className={`${base}__title`}>Amenities</h2>

          <p className={`${base}__desc`}>
            Enjoy premium features like pool, gym, parking, security, and more—
            all designed for modern, comfortable everyday living.
          </p>
        </div>

        {/* RIGHT BOX */}

        <div className={`${base}__box`}>
          <div className={`${base}__grid`}>
            {amenitiesList.map((item, index) => (
              <label key={index} className={`${base}__item`}>
                <input
                  type="checkbox"
                  checked={data.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />

                <span className={`${base}__checkmark`}></span>

                <span className={`${base}__text`}>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;