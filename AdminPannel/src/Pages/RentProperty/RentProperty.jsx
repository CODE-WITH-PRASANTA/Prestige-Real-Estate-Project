import React, {
  useEffect,
  useState,
} from "react";

import "./RentProperty.css";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";

import API, {
  IMG_URL,
} from "../../api/axios";

const RentProperty = () => {

  // ================= ROUTER =================

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const isEditMode =
    !!id;

  // ================= SECTION =================

  const [active, setActive] =
    useState("basic");

  // ================= FORM DATA =================

  const [formData, setFormData] =
    useState({

      title: "",

      location: "",

      shortDesc: "",

      rent: "",

      deposit: "",

      sqft: "",

      bedrooms: "",

      bathrooms: "",

      parking: "",

      balcony: "",

      amenities: [],

      rating: "",
    });

  const [description, setDescription] =
    useState("");

  const [images, setImages] =
    useState([]);

  // ================= FETCH EDIT =================

  useEffect(() => {

    if (!id) return;

    const fetchProperty =
      async () => {

        try {

          const res =
            await API.get(
              `/rent/${id}`
            );

          const data =
            res.data;

          setFormData({

            title:
              data.title || "",

            location:
              data.location || "",

            shortDesc:
              data.shortDesc || "",

            rent:
              data.rent || "",

            deposit:
              data.deposit || "",

            sqft:
              data.sqft || "",

            bedrooms:
              data.bedrooms || "",

            bathrooms:
              data.bathrooms || "",

            parking:
              data.parking || "",

            balcony:
              data.balcony || "",

            amenities:
              data.amenities || [],

            rating:
              data.rating || "",
          });

          setDescription(
            data.description || ""
          );

          // EXISTING IMAGES

          if (
            data.images &&
            data.images.length > 0
          ) {

            const existingImages =
              data.images.map(
                (img) => ({

                  url:
                    img.startsWith(
                      "http"
                    )
                      ? img
                      : `${IMG_URL}/${img.replace(
                          /^\/+/,
                          ""
                        )}`,
                })
              );

            setImages(
              existingImages
            );
          }

        } catch (err) {

          console.error(err);

        }
      };

    fetchProperty();

  }, [id]);

  // ================= TOGGLE =================

  const toggleSection =
    (section) => {

      setActive(
        active === section
          ? ""
          : section
      );
    };

  // ================= INPUT CHANGE =================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // ================= AMENITIES =================

  const handleAmenityChange =
    (e) => {

      const {
        value,
        checked,
      } = e.target;

      if (checked) {

        setFormData({

          ...formData,

          amenities: [
            ...formData.amenities,
            value,
          ],
        });

      } else {

        setFormData({

          ...formData,

          amenities:
            formData.amenities.filter(
              (item) =>
                item !== value
            ),
        });
      }
    };

  // ================= IMAGE =================

  const handleImageUpload =
    (e) => {

      const files =
        Array.from(
          e.target.files
        );

      const preview =
        files.map(
          (file) => ({

            file,

            url:
              URL.createObjectURL(
                file
              ),
          })
        );

      setImages((prev) => [
        ...prev,
        ...preview,
      ]);
    };

  // ================= REMOVE IMAGE =================

  const removeImage =
    (index) => {

      const updated =
        [...images];

      updated.splice(index, 1);

      setImages(updated);
    };

  // ================= HTML =================

  const stripHtml =
    (html) => {

      const div =
        document.createElement(
          "div"
        );

      div.innerHTML = html;

      return (
        div.textContent ||
        div.innerText ||
        ""
      );
    };

  // ================= SUBMIT =================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !stripHtml(
          description
        ).trim()
      ) {

        alert(
          "Please add property description"
        );

        return;
      }

      try {

        const form =
          new FormData();

        // FIELDS

        Object.keys(
          formData
        ).forEach((key) => {

          if (
            key ===
            "amenities"
          ) {

            form.append(

              "amenities",

              JSON.stringify(
                formData.amenities
              )
            );

          } else {

            form.append(
              key,
              formData[key]
            );
          }
        });

        form.append(
          "description",
          description
        );

        // IMAGES

        images.forEach(
          (img) => {

            if (img.file) {

              form.append(
                "images",
                img.file
              );
            }
          }
        );

        // EDIT

        if (isEditMode) {

          await API.put(
            `/rent/${id}`,
            form,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

          alert(
            "Property Updated Successfully ✅"
          );

        } else {

          // CREATE

          await API.post(
            "/rent",
            form,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

          alert(
            "Property Published Successfully ✅"
          );
        }

        navigate(
          "/rent/details"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Operation Failed ❌"
        );
      }
    };

  return (

    <form
      className="rent-container"
      onSubmit={handleSubmit}
    >

      <div className="rent-inner">

        <h2 className="rent-title">

          {isEditMode
            ? "Edit Rental Listing"
            : "Create Rental Listing"}

        </h2>

        {/* PROPERTY */}

        <div className="rent-accordion">

          <div
            className="rent-accordion-header"
            onClick={() =>
              toggleSection("basic")
            }
          >

            Property Overview

            <span>

              {active === "basic"
                ? "▲"
                : "▼"}

            </span>

          </div>

          {active === "basic" && (

            <div className="rent-accordion-body">

              <div className="rent-grid">

                <input
                  name="title"
                  placeholder="Property Title"
                  value={formData.title}
                  onChange={handleChange}
                />

                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />

                <textarea
                  name="shortDesc"
                  placeholder="Short Description"
                  value={formData.shortDesc}
                  onChange={handleChange}
                />

                <input
                  name="rent"
                  placeholder="Monthly Rent ₹"
                  value={formData.rent}
                  onChange={handleChange}
                />

                <input
                  name="deposit"
                  placeholder="Security Deposit ₹"
                  value={formData.deposit}
                  onChange={handleChange}
                />

                <input
                  name="sqft"
                  placeholder="Carpet Area (sqft)"
                  value={formData.sqft}
                  onChange={handleChange}
                />

                <input
                  name="rating"
                  placeholder="Rating (1-5)"
                  value={formData.rating}
                  onChange={handleChange}
                />

              </div>

            </div>
          )}

        </div>

       {/* FEATURES */}

<div className="rent-accordion">

  <div
    className="rent-accordion-header"
    onClick={() =>
      toggleSection("features")
    }
  >

    Configuration & Amenities

    <span>

      {active === "features"
        ? "▲"
        : "▼"}

    </span>

  </div>

  {active === "features" && (

    <div className="rent-accordion-body">

      {/* CONFIGURATION */}

      <div className="rent-grid">

        {/* BEDROOMS */}

        <select
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        >

          <option value="">
            BHK
          </option>

          {[1,2,3,4,5].map(
            (n) => (

            <option
              key={n}
              value={n}
            >

              {n} BHK

            </option>
          ))}

        </select>

        {/* BATHROOMS */}

        <select
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        >

          <option value="">
            Bathrooms
          </option>

          {[1,2,3,4].map(
            (n) => (

            <option
              key={n}
              value={n}
            >

              {n}

            </option>
          ))}

        </select>

        {/* PARKING */}

        <select
          name="parking"
          value={formData.parking}
          onChange={handleChange}
        >

          <option value="">
            Parking
          </option>

          <option value="Available">
            Available
          </option>

          <option value="Not Available">
            Not Available
          </option>

        </select>

        {/* BALCONY */}

        <select
          name="balcony"
          value={formData.balcony}
          onChange={handleChange}
        >

          <option value="">
            Balcony
          </option>

          <option value="Yes">
            Yes
          </option>

          <option value="No">
            No
          </option>

        </select>

      </div>

      {/* AMENITIES */}

      <div className="rent-amenities">

        {[
          "Gym",
          "Swimming Pool",
          "Lift",
          "Security",
          "CCTV",
          "Power Backup",
          "Club House",
          "Children Play Area",
          "Garden",
          "Parking",
          "WiFi",
          "Air Conditioning",
          "Modular Kitchen",
          "Fire Safety",
          "Visitor Parking",
          "Intercom",
          "Gated Community",
          "Water Supply",
          "Pet Friendly",
          "Maintenance Staff",
        ].map((item, i) => (

          <label
            key={i}
            className="rent-amenity-item"
          >

            <input
              type="checkbox"
              value={item}
              checked={formData.amenities.includes(item)}
              onChange={handleAmenityChange}
            />

            <span>
              {item}
            </span>

          </label>

        ))}

      </div>

    </div>
  )}

</div>
        {/* MEDIA */}

        <div className="rent-accordion">

          <div
            className="rent-accordion-header"
            onClick={() =>
              toggleSection("upload")
            }
          >

            Media & Description

            <span>

              {active === "upload"
                ? "▲"
                : "▼"}

            </span>

          </div>

          {active === "upload" && (

            <div className="rent-accordion-body">

              <label className="rent-upload-box">

                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  hidden
                />

                <span>
                  ＋
                </span>

                <p>
                  Upload Images
                </p>

              </label>

              {/* PREVIEW */}

              <div className="rent-image-preview">

                {images.map(
                  (img, i) => (

                  <div
                    key={i}
                    className="rent-image-item"
                  >

                    <img
                      src={img.url}
                      alt="preview"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(i)
                      }
                    >

                      ×

                    </button>

                  </div>
                ))}

              </div>

              {/* EDITOR */}

              <Editor
                apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
                value={description}
                onEditorChange={(content) =>
                  setDescription(content)
                }
                init={{
                  height: 300,
                  menubar: false,
                  placeholder:
                    "Write full property details...",
                }}
              />

            </div>
          )}

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="rent-submit-btn"
        >

          {isEditMode
            ? "Update Property"
            : "Publish Property"}

        </button>

      </div>

    </form>
  );
};

export default RentProperty;