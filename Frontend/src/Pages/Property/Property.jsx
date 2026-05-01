import React, { useState } from "react";
import API from "../../api/axios";

import PropertyHero from "../../Components/PropertyHero/PropertyHero";
import Switchbar from "../../Components/Switchbar/Switchbar";
import PropertyInformation from "../../Components/PropertyInformation/PropertyInformation";
import PropertyDetails from "../../Components/PropertyDetails/PropertyDetails";
import Amenities from "../../Components/Amenities/Amenities";
import PropertyDocument from "../../Components/PropertyDocument/PropertyDocument";
import PropertyGallery from "../../Components/PropertyGallery/PropertyGallery";
import PropertyVedio from "../../Components/PropertyVedio/PropertyVedio";
import Description from "../../Components/Description/Description";
import FloorPlanes from "../../Components/FloorPlanes/FloorPlanes";
import Location from "../../Components/Location/Location";

const Property = () => {
  const [activeTab, setActiveTab] = useState("Property Information");

  /* ================= GLOBAL STATE ================= */

  const [basicInfo, setBasicInfo] = useState({});
  const [details, setDetails] = useState({});
  const [amenities, setAmenities] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [video, setVideo] = useState({});
  const [description, setDescription] = useState("");

  const [floorPlans, setFloorPlans] = useState([
    {
      name: "",
      type: "",
      category: "",
      currency: "",
      salePrice: "",
      offerPrice: "",
      description: "",
      photos: [],
    },
  ]);

  const [location, setLocation] = useState({});
  const [thumbnail, setThumbnail] = useState(null);

  /* ================= SUBMIT FUNCTION ================= */

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      /* JSON DATA */
      formData.append("basicInfo", JSON.stringify(basicInfo));
      formData.append("details", JSON.stringify(details));
      formData.append("amenities", JSON.stringify(amenities));
      formData.append("video", JSON.stringify(video));
      formData.append("location", JSON.stringify(location));
      formData.append("floorPlans", JSON.stringify(floorPlans));
      formData.append("description", description);

      /* FILES */

      gallery.forEach((file) => {
        formData.append("gallery", file);
      });

      documents.forEach((file) => {
        formData.append("documents", file);
      });

      /* 🔥 FIX: FLOOR PLAN IMAGES */
      floorPlans.forEach((plan) => {
        (plan.photos || []).forEach((file) => {
          formData.append("floorPlansPhotos", file);
        });
      });

      /* THUMBNAIL */
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      /* 🔥 FIX: CORRECT API ROUTE */
      const res = await API.post("/user-properties", formData);

      console.log(res.data);
      alert("Property Created Successfully 🚀");

    } catch (err) {
      console.error(err);
      alert("Error creating property");
    }
  };

  /* ================= SWITCH ================= */

  const renderComponent = () => {
    switch (activeTab) {
      case "Property Information":
        return (
          <PropertyInformation
            data={basicInfo}
            setData={setBasicInfo}
          />
        );

      case "Property Details":
        return <PropertyDetails data={details} setData={setDetails} />;

      case "Amenities":
        return <Amenities data={amenities} setData={setAmenities} />;

      case "Documents":
        return <PropertyDocument setFiles={setDocuments} />;

      case "Gallery":
        return <PropertyGallery setImages={setGallery} />;

      case "Videos":
        return <PropertyVedio data={video} setData={setVideo} />;

      case "Description":
        return <Description data={description} setData={setDescription} />;

      case "Floor Plans":
        return <FloorPlanes data={floorPlans} setData={setFloorPlans} />;

      case "Location":
        return <Location data={location} setData={setLocation} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <PropertyHero />

      <Switchbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {renderComponent()}

      {/* SUBMIT BUTTON */}
      <div style={{ textAlign: "center", margin: "30px" }}>
        <button onClick={handleSubmit}>
          Submit Property 🚀
        </button>
      </div>
    </div>
  );
};

export default Property;