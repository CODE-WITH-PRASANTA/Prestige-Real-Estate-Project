import React, { useEffect, useState } from "react";
import API, { IMG_URL } from "../../api/axios";
import { useParams } from "react-router-dom";
import "./PropertyView.css";

const PropertyView = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/user-properties/${id}`);
      setProperty(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-view">
      {/* HERO IMAGE */}
      <div className="property-view__gallery">
        {property.gallery?.map((img, i) => (
          <img key={i} src={IMG_URL + img} alt="" />
        ))}
      </div>

      {/* MAIN */}
      <div className="property-view__container">
        <h2>{property.basicInfo?.name}</h2>

        <div className="property-view__price">
          ₹ {property.basicInfo?.salePrice}
        </div>

        {/* DETAILS GRID */}
        <div className="property-view__grid">
          <div>
            <h4>Type</h4>
            <p>{property.basicInfo?.type}</p>
          </div>
          <div>
            <h4>Category</h4>
            <p>{property.basicInfo?.category}</p>
          </div>
          <div>
            <h4>City</h4>
            <p>{property.location?.city}</p>
          </div>
          <div>
            <h4>State</h4>
            <p>{property.location?.state}</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <section>
          <h3>Description</h3>
          <p>{property.description}</p>
        </section>

        {/* AMENITIES */}
        <section>
          <h3>Amenities</h3>
          <div className="property-view__amenities">
            {property.amenities?.map((a, i) => (
              <span key={i}>{a}</span>
            ))}
          </div>
        </section>

        {/* FLOOR PLANS */}
        <section>
          <h3>Floor Plans</h3>
          {property.floorPlans?.map((plan, i) => (
            <div key={i} className="property-view__plan">
              <h4>{plan.name}</h4>
              <p>{plan.description}</p>

              <div className="property-view__plan-images">
                {plan.photos?.map((img, j) => (
                  <img key={j} src={IMG_URL + img} alt="" />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PropertyView;