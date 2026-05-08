import React, { useState } from "react";
import "./PropertyDocument.css";

const PropertyDocument = ({ setFiles }) => {
  const base = "property-document";

  const [success, setSuccess] = useState(false);
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("Maximum 5 files allowed");
      return;
    }

    setFiles(selectedFiles); // ✅ send to parent
    setFileNames(selectedFiles.map((file) => file.name));
    setSuccess(true);
  };

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {/* LEFT SIDE */}

        <div className={`${base}__left`}>
          <h2 className={`${base}__title`}>Property Documents</h2>

          <p className={`${base}__desc`}>
            View and Upload all essential legal documents, including title,
            approvals, and receipts, organized for transparency and convenience.
          </p>
        </div>

        {/* RIGHT CARD */}

        <div className={`${base}__card`}>
          <h3 className={`${base}__upload-title`}>Upload Documents</h3>

          <div className={`${base}__upload-area`}>
            <label className={`${base}__button`}>
              Browse Files
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileChange}
              />
            </label>

            <span className={`${base}__filename`}>
              {fileNames.length > 0
                ? fileNames.join(", ")
                : "No Files Selected"}
            </span>
          </div>

          <ul className={`${base}__rules`}>
            <li>The maximum size is 8 MB. Format: PDF.</li>
            <li>Maximum number of files upload will be 5 files.</li>
          </ul>

          {success && (
            <div className={`${base}__success`}>
              ✓ Document Uploaded Successfully
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyDocument;