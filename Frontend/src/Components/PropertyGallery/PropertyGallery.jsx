import React, { useState } from "react";
import "./PropertyGallery.css";

import img1 from "../../assets/Grid1.webp";
import img2 from "../../assets/Grid2.webp";
import img3 from "../../assets/Grid3.webp";

const PropertyGallery = ({ setImages }) => {
  const base = "property-gallery";

  const [previewImages, setPreviewImages] = useState([img1, img2, img3]);
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    const newPreview = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    const updatedFiles = [...files, ...selectedFiles];
    const updatedPreview = [...previewImages, ...newPreview];

    setFiles(updatedFiles);
    setPreviewImages(updatedPreview);

    setImages(updatedFiles); // ✅ send to parent
    setSuccess(true);
  };

  const removeImage = (index) => {
    const updatedPreview = previewImages.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);

    setPreviewImages(updatedPreview);
    setFiles(updatedFiles);

    setImages(updatedFiles); // ✅ update parent
  };

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {/* LEFT */}

        <div className={`${base}__left`}>
          <h2 className={`${base}__title`}>Property Gallery</h2>

          <p className={`${base}__desc`}>
            Browse high-resolution images of interiors and exteriors to get a
            true feel of the design and atmosphere.
          </p>
        </div>

        {/* RIGHT CARD */}

        <div className={`${base}__card`}>
          <div className={`${base}__preview`}>
            {previewImages.map((img, index) => (
              <div key={index} className={`${base}__thumb`}>
                <img src={img} alt="property" />

                <button
                  className={`${base}__delete`}
                  onClick={() => removeImage(index)}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          <label className={`${base}__label`}>Photo</label>

          <div className={`${base}__upload`}>
            <label className={`${base}__button`}>
              Browse Files
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleUpload}
              />
            </label>

            <span className={`${base}__count`}>
              {previewImages.length} Photos Selected
            </span>
          </div>

          <ul className={`${base}__rules`}>
            <li>
              The maximum photo size is 8 MB. Formats: jpeg, jpg. Put the main
              picture first
            </li>

            <li>Maximum number of files upload will be 10 files.</li>
          </ul>

          {success && (
            <div className={`${base}__success`}>
              ✓ Photos Uploaded Successfully
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;