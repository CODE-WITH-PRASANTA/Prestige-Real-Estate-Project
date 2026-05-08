import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

import "./Rentdetails.css";

import RentDetailsGallery from "../../Components/RentDetailsGallery/RentDetailsGallery";
import RentDetailsHeader from "../../Components/RentDetailsHeader/RentDetailsHeader";
import RentpropertiesStats from "../../Components/RentpropertiesStats/RentpropertiesStats";
import RentShortDescription from "../../Components/RentShortDescription/RentShortDescription";
import RentDetailsAmenities from "../../Components/RentDetailsAmenities/RentDetailsAmenities";
import RentFullDescription from "../../Components/RentFullDescription/RentFullDescription";
import RentLocationMap from "../../Components/RentLocationMap/RentLocationMap";
import RentSimilarProperties from "../../Components/RentSimilarProperties/RentSimilarProperties";
import RentStickyInquirySidebar from "../../Components/RentStickyInquirySidebar/RentStickyInquirySidebar";

const Rentdetails = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProperty = async () => {

      try {

        const res = await API.get(`/rent/${id}`);

        setProperty(res.data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

    fetchProperty();

  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!property) {
    return <h2>Property Not Found</h2>;
  }

  return (
    <section className="rent-details-page">

      <RentDetailsGallery property={property} />

      <div className="rent-details-layout">

        <div className="rent-details-left">

          <RentDetailsHeader property={property} />

          <RentpropertiesStats property={property} />

          <RentShortDescription property={property} />

          <RentDetailsAmenities property={property} />

          <RentFullDescription property={property} />

          <RentLocationMap property={property} />

          <RentSimilarProperties
          currentId={property?._id}
          />

        </div>

        <div className="rent-details-right">

          <RentStickyInquirySidebar property={property} />

        </div>

      </div>

    </section>
  );
};

export default Rentdetails;