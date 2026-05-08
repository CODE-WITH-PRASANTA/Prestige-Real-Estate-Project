import React, { useState } from "react";
import "./RentDetailsGallery.css";

import { IMG_URL } from "../../api/axios";

const RentDetailsGallery = ({ property }) => {

  const [activeImage, setActiveImage] = useState(0);

  const images =
    property?.images?.length > 0
      ? property.images
      : ["/placeholder.jpg"];

  return (
    <section className="rent-gallery">

      <div className="rent-gallery-main">

        <img
          src={
            images[activeImage]?.startsWith("http")
              ? images[activeImage]
              : `${IMG_URL}${images[activeImage]}`
          }
          alt={property.title}
        />

      </div>

      <div className="rent-gallery-grid">

        {images.map((img, index) => (

          <img
            key={index}
            src={
              img.startsWith("http")
                ? img
                : `${IMG_URL}${img}`
            }
            alt=""
            className={
              activeImage === index
                ? "active-thumb"
                : ""
            }
            onClick={() => setActiveImage(index)}
          />

        ))}

      </div>

    </section>
  );
};

export default RentDetailsGallery;