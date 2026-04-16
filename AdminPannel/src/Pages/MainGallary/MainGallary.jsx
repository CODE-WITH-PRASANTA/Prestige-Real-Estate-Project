import React, { useMemo, useState } from "react";
import "./MainGallary.css";
import { FiEdit2, FiTrash2, FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MainGallary = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [galleryData, setGalleryData] = useState([
    {
      id: 1,
      photo:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      photo:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      photo:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      photo:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      photo:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      photo:
        "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 7,
      photo:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=500&q=80",
    },
  ]);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(galleryData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return galleryData.slice(startIndex, endIndex);
  }, [galleryData, currentPage]);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      setPhoto(selectedPhoto);
      setPreview(URL.createObjectURL(selectedPhoto));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please choose a photo.");
      return;
    }

    const newItem = {
      id: Date.now(),
      photo: preview,
    };

    const updatedData = [newItem, ...galleryData];
    setGalleryData(updatedData);
    setCurrentPage(1);
    setPhoto(null);
    setPreview("");
    e.target.reset();
  };

  const handleDelete = (id) => {
    const updatedData = galleryData.filter((item) => item.id !== id);
    const newTotalPages = Math.ceil(updatedData.length / itemsPerPage) || 1;

    setGalleryData(updatedData);

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit action for item ID: ${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section className="MainGallary">
      <div className="MainGallary__wrapper">
        {/* LEFT SIDE FORM */}
        <div className="MainGallary__form-card">
          <div className="MainGallary__card-top">
            <h2 className="MainGallary__title">Gallery Post Form</h2>
            <p className="MainGallary__subtitle">
              Upload a new gallery image for the admin panel.
            </p>
          </div>

          <form className="MainGallary__form" onSubmit={handleSubmit}>
            <div className="MainGallary__form-group">
              <label htmlFor="galleryPhoto" className="MainGallary__label">
                Choose Photo
              </label>

              <div className="MainGallary__upload-box">
                <input
                  type="file"
                  id="galleryPhoto"
                  accept="image/*"
                  className="MainGallary__input-file"
                  onChange={handlePhotoChange}
                />

                <label
                  htmlFor="galleryPhoto"
                  className="MainGallary__custom-upload"
                >
                  <FiImage className="MainGallary__upload-icon" />
                  <span className="MainGallary__upload-text">
                    Click to choose photo
                  </span>
                </label>
              </div>
            </div>

            {preview && (
              <div className="MainGallary__preview-wrap">
                <p className="MainGallary__preview-title">Photo Preview</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="MainGallary__preview-img"
                />
              </div>
            )}

            <button type="submit" className="MainGallary__submit-btn">
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE TABLE */}
        <div className="MainGallary__table-card">
          <div className="MainGallary__card-top">
            <h2 className="MainGallary__title">Gallery Table</h2>
            <p className="MainGallary__subtitle">
              Manage uploaded gallery images here.
            </p>
          </div>

          <div className="MainGallary__table-wrap">
            <table className="MainGallary__table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Photo</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>
                        <img
                          src={item.photo}
                          alt={`Gallery ${(currentPage - 1) * itemsPerPage + index + 1}`}
                          className="MainGallary__table-img"
                        />
                      </td>
                      <td>
                        <div className="MainGallary__action-wrap">
                          <button
                            type="button"
                            className="MainGallary__action-btn MainGallary__action-btn--edit"
                            onClick={() => handleEdit(item.id)}
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            type="button"
                            className="MainGallary__action-btn MainGallary__action-btn--delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="MainGallary__empty">
                      No gallery images found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {galleryData.length > 0 && (
            <div className="MainGallary__pagination">
              <button
                type="button"
                className={`MainGallary__page-btn MainGallary__page-btn--nav ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
                <span>Previous</span>
              </button>

              <div className="MainGallary__page-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      className={`MainGallary__page-btn ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className={`MainGallary__page-btn MainGallary__page-btn--nav ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainGallary;