import "./FlatPosting.css";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import { API } from "../../api/axios";
import React, { useState, useEffect, useRef } from "react";
const FlatPosting = () => {
  const fileRef = useRef();
  const [activeSection, setActiveSection] = useState("basic");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [bannerFile, setBannerFile] = useState(null);
  const [ownerFile, setOwnerFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const [features, setFeatures] = useState({});
  const [amenities, setAmenities] = useState([]);

  const [editorData, setEditorData] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [rating, setRating] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerms, setLoanTerms] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [sqft, setSqft] = useState("");
  const [category, setCategory] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleFeatureChange = (key, value) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setImageFiles(files); // for backend

    const previews = files.map((file) => URL.createObjectURL(file));
    setImages(previews); // for UI preview
  };

  const renderOptions = (max) => {
    return [
      <option key="0" value="">
        Select
      </option>,
      ...[...Array(max)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      )),
    ];
  };

  const [ownerPreview, setOwnerPreview] = useState(null);

  const handleOwnerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOwnerFile(file); // ❗ VERY IMPORTANT
      setOwnerPreview(URL.createObjectURL(file));
    }
  };

  const [bannerPreview, setBannerPreview] = useState(null);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [images]);

  const handleSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);

          // ✅ VALIDATION
          if (!title || !price || !location) {
            setLoading(false);
            return Swal.fire(
              "Error ❌",
              "Please fill required fields",
              "error",
            );
          }

          if (Number(price) <= 0) {
            setLoading(false);
            return Swal.fire(
              "Error ❌",
              "Price must be greater than 0",
              "error",
            );
          }

          if (rating && (rating < 1 || rating > 5)) {
            setLoading(false);
            return Swal.fire("Error ❌", "Rating must be between 1–5", "error");
          }

          const formData = new FormData();

          // ===== TEXT DATA =====
          formData.append("title", title);
          formData.append("description", description);
          formData.append("location", location);

          formData.append("price", Number(price));
          formData.append("rating", Number(rating || 0));
          formData.append("sqft", Number(sqft || 0));

          formData.append("downPayment", downPayment || "");
          formData.append("loanTerms", loanTerms || "");
          formData.append("interestRate", interestRate || "");

          formData.append("lastUpdate", lastUpdate || "");
          formData.append("createdDate", createdDate || "");
          formData.append("category", category || "");

          // ===== FILES =====
          if (bannerFile) formData.append("banner", bannerFile);
          if (ownerFile) formData.append("ownerImage", ownerFile);

          imageFiles.forEach((file) => {
            formData.append("images", file);
          });

          // ===== CLEAN FEATURES (REMOVE EMPTY) =====
          const cleanFeatures = Object.fromEntries(
            Object.entries(features).filter(([_, v]) => v),
          );

          // ===== JSON =====
          formData.append("features", JSON.stringify(cleanFeatures));
          formData.append("amenities", JSON.stringify(amenities || []));
          formData.append("fullDescription", editorData || "");

          // ===== API CALL =====
          const res = await API.post("/property/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log(res.data);

          Swal.fire("Success 🎉", "Property Added Successfully", "success");

          // ===== RESET FORM =====
          setTitle("");
          setDescription("");
          setLocation("");
          setPrice("");
          setRating("");
          setSqft("");
          setDownPayment("");
          setLoanTerms("");
          setInterestRate("");
          setLastUpdate("");
          setCreatedDate("");
          setCategory("");

          setImages([]);
          setImageFiles([]);
          setBannerFile(null);
          setOwnerFile(null);
          setBannerPreview(null); // ✅ FIXED
          setOwnerPreview(null); // ✅ FIXED
          setFeatures({});
          setAmenities([]);
          setEditorData("");

          // ✅ RESET FILE INPUT
          if (fileRef?.current) fileRef.current.value = "";
        } catch (err) {
          console.log(err);

          Swal.fire(
            "Error ❌",
            err?.response?.data?.message || "Something went wrong",
            "error",
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };
  return (
    <div className="FlatPost">
      <h2 className="FlatPost__title">Flat Posting</h2>

      {/* ================= SECTION 1 ================= */}
      <div className="FlatPost__section">
        <div
          className="FlatPost__header"
          onClick={() => toggleSection("basic")}
        >
          <span>Basic Details</span>
          <FaChevronDown
            className={`FlatPost__icon ${
              activeSection === "basic" ? "rotate" : ""
            }`}
          />
        </div>

        <div
          className={`FlatPost__content ${
            activeSection === "basic" ? "open" : ""
          }`}
        >
          <div className="FlatPost__grid">
            <div className="FlatPost__field full">
              <label>Property Title</label>
              <input
                className="FlatPost__input"
                placeholder="Enter property title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="FlatPost__field full">
              <label>Short Description</label>
              <textarea
                className="FlatPost__textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Location</label>
              <input
                className="FlatPost__input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Last Update Date</label>
              <input
                className="FlatPost__input"
                type="date"
                value={lastUpdate}
                onChange={(e) => setLastUpdate(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Rating (1-5)</label>
              <input
                className="FlatPost__input"
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Total Amount</label>
              <input
                className="FlatPost__input"
                placeholder="₹ Enter total price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Down Payment</label>
              <input
                className="FlatPost__input"
                placeholder="₹ Enter down payment"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Loan Terms</label>
              <input
                className="FlatPost__input"
                placeholder="e.g. 10 years"
                value={loanTerms}
                onChange={(e) => setLoanTerms(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Interest Rate (%)</label>
              <input
                className="FlatPost__input"
                placeholder="e.g. 7.5%"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Min Sqft</label>
              <input
                className="FlatPost__input"
                placeholder="Enter square feet"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
              />
            </div>

            <div className="FlatPost__field">
              <label>Upload Banner</label>
              <input
                type="file"
                onChange={handleBannerUpload}
                className="FlatPost__input"
              />
              {bannerPreview && (
                <div className="FlatPost__bannerPreview">
                  <img src={bannerPreview} alt="banner preview" />
                </div>
              )}
            </div>

            <div className="FlatPost__field">
              <label>Owner Profile Picture</label>
              <input
                type="file"
                onChange={handleOwnerUpload}
                className="FlatPost__input"
              />
              {ownerPreview && (
                <div className="FlatPost__ownerPreview">
                  <img src={ownerPreview} alt="owner" />
                </div>
              )}
            </div>

            <div className="FlatPost__field">
              <label>Property Category</label>
              <select
                className="FlatPost__input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                <option>Flat</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Created Date</label>
              <input
                className="FlatPost__input"
                type="date"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="FlatPost__section">
        <div
          className="FlatPost__header"
          onClick={() => toggleSection("features")}
        >
          <span>Property Features</span>
          <FaChevronDown
            className={`FlatPost__icon ${
              activeSection === "features" ? "rotate" : ""
            }`}
          />
        </div>

        <div
          className={`FlatPost__content ${
            activeSection === "features" ? "open" : ""
          }`}
        >
          {/* ===== FEATURE DROPDOWNS ===== */}
          <div className="FlatPost__grid">
            <div className="FlatPost__field">
              <label>Bedroom</label>
              <select
                className="FlatPost__input"
                onChange={(e) => handleFeatureChange("bedroom", e.target.value)}
              >
                {renderOptions(10)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Bathroom</label>
              <select
                className="FlatPost__input"
                onChange={(e) =>
                  handleFeatureChange("bathroom", e.target.value)
                }
              >
                {renderOptions(5)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Parking</label>
              <select
                className="FlatPost__input"
                onChange={(e) => handleFeatureChange("parking", e.target.value)}
              >
                {renderOptions(10)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Balcony</label>
              <select
                className="FlatPost__input"
                onChange={(e) => handleFeatureChange("balcony", e.target.value)}
              >
                {renderOptions(5)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Floor</label>
              <select
                className="FlatPost__input"
                onChange={(e) => handleFeatureChange("floor", e.target.value)}
              >
                {renderOptions(10)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Wardrobe</label>
              <select
                className="FlatPost__input"
                onChange={(e) =>
                  handleFeatureChange("wardrobe", e.target.value)
                }
              >
                {renderOptions(10)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>TV</label>
              <select
                className="FlatPost__input"
                onChange={(e) => handleFeatureChange("tv", e.target.value)}
              >
                {renderOptions(5)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Water Purifier</label>
              <select
                className="FlatPost__input"
                onChange={(e) =>
                  handleFeatureChange("purifier", e.target.value)
                }
              >
                {renderOptions(10)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Microwave</label>
              <select
                className="FlatPost__input"
                onChange={(e) =>
                  handleFeatureChange("microwave", e.target.value)
                }
              >
                {renderOptions(5)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>AC</label>
              <select
                className="FlatPost__input"
                onChange={(e) => handleFeatureChange("ac", e.target.value)}
              >
                {renderOptions(10)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Fridge</label>
              <select
                className="FlatPost__input"
                onChange={(e) => handleFeatureChange("fridge", e.target.value)}
              >
                {renderOptions(10)}
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Curtains</label>
              <select
                className="FlatPost__input"
                onChange={(e) =>
                  handleFeatureChange("curtains", e.target.value)
                }
              >
                {renderOptions(10)}
              </select>
            </div>
          </div>

          {/* ===== AMENITIES ===== */}
          <div className="FlatPost__amenities">
            <h3 className="FlatPost__subTitle">Amenities</h3>

            <div className="FlatPost__amenitiesGrid">
              {[
                "Gym",
                "Swimming Pool",
                "Power Backup",
                "Lift",
                "Security",
                "Club House",
                "Garden",
                "Children Play Area",
                "Parking Area",
                "CCTV",
                "WiFi",
                "Fire Safety",
              ].map((item, i) => (
                <label key={i} className="FlatPost__amenityItem">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAmenities((prev) => [...new Set([...prev, item])]);
                      } else {
                        setAmenities((prev) => prev.filter((a) => a !== item));
                      }
                    }}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 3 ================= */}
      <div className="FlatPost__section">
        <div
          className="FlatPost__header"
          onClick={() => toggleSection("upload")}
        >
          <span>Uploads & Description</span>
          <FaChevronDown
            className={`FlatPost__icon ${
              activeSection === "upload" ? "rotate" : ""
            }`}
          />
        </div>

        <div
          className={`FlatPost__content ${
            activeSection === "upload" ? "open" : ""
          }`}
        >
          {/* ===== IMAGE UPLOAD ===== */}
          <div className="FlatPost__uploadBox">
            <label className="FlatPost__uploadBtn">
              <FaPlus />
              <input
                type="file"
                multiple
                hidden
                ref={fileRef}
                onChange={handleImageUpload}
              />
            </label>

            <div className="FlatPost__preview">
              {images.map((img, i) => (
                <img key={i} src={img} alt="preview" />
              ))}
            </div>
          </div>

          {/* ===== TINYMCE FULL EDITOR ===== */}
          <div className="FlatPost__editor">
            <Editor
              apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z" // ✅ FIXED
              value={editorData}
              onEditorChange={(content) => setEditorData(content)}
              init={{
                height: 350,
                menubar: true,

                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "wordcount",
                ],

                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic underline strikethrough | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | " +
                  "link image media table | " +
                  "forecolor backcolor | " +
                  "removeformat | code fullscreen preview",

                // ✅ IMAGE UPLOAD SUPPORT (LOCAL)
                file_picker_types: "image",
                file_picker_callback: function (cb) {
                  const input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");

                  input.onchange = function () {
                    const file = this.files[0];
                    const reader = new FileReader();

                    reader.onload = function () {
                      cb(reader.result, { title: file.name });
                    };

                    reader.readAsDataURL(file);
                  };

                  input.click();
                },
              }}
            />
          </div>
        </div>
      </div>

      <button
        className="FlatPost__submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Property"}
      </button>
    </div>
  );
};

export default FlatPosting;
