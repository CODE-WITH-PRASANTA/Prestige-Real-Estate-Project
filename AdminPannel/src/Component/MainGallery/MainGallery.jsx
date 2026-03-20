import React, { useState } from "react";
import "./MainGallery.css";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

const MainGallery = () => {
  const [formData, setFormData] = useState({
    photo: null,
    video: null,
  });

  const [galleryData, setGalleryData] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editId, setEditId] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.photo && !formData.video) {
      alert("Please upload at least one image or video");
      return;
    }

    if (editId !== null) {
      setGalleryData((prev) =>
        prev.map((item) =>
          item.id === editId
            ? {
                ...item,
                photo: formData.photo ? URL.createObjectURL(formData.photo) : item.photo,
                video: formData.video ? formData.video.name : item.video,
              }
            : item
        )
      );
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        photo: formData.photo ? URL.createObjectURL(formData.photo) : "",
        video: formData.video ? formData.video.name : "",
      };
      setGalleryData((prev) => [newItem, ...prev]);
    }

    setFormData({
      photo: null,
      video: null,
    });

    const photoInput = document.getElementById("MainGallery-photo");
    const videoInput = document.getElementById("MainGallery-video");
    if (photoInput) photoInput.value = "";
    if (videoInput) videoInput.value = "";

    setMenuOpenId(null);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setMenuOpenId(null);
    alert("Choose new file(s) and click submit to update");
  };

  const handleDelete = (id) => {
    setGalleryData((prev) => prev.filter((item) => item.id !== id));
    setMenuOpenId(null);
  };

  return (
    <div className="MainGallery">
      <div className="MainGallery__grid">
        {/* Left Side Form */}
        <div className="MainGallery__formCard">
          <div className="MainGallery__header">
            <h2 className="MainGallery__title">Main Gallery Form</h2>
          </div>

          <form className="MainGallery__form" onSubmit={handleSubmit}>
            <div className="MainGallery__formGroup">
              <label className="MainGallery__label" htmlFor="MainGallery-photo">
                Photo Upload / Posting
              </label>
              <input
                id="MainGallery-photo"
                name="photo"
                type="file"
                accept="image/*"
                className="MainGallery__input"
                onChange={handleFileChange}
              />
            </div>

            <div className="MainGallery__formGroup">
              <label className="MainGallery__label" htmlFor="MainGallery-video">
                Video Upload / Posting
              </label>
              <input
                id="MainGallery-video"
                name="video"
                type="file"
                accept="video/*"
                className="MainGallery__input"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="MainGallery__submitBtn">
              {editId !== null ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Right Side Table */}
        <div className="MainGallery__tableCard">
          <div className="MainGallery__header">
            <h2 className="MainGallery__title">Main Gallery Table</h2>
          </div>

          <div className="MainGallery__tableWrap">
            <table className="MainGallery__table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Video</th>
                  <th>Photo</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {galleryData.length > 0 ? (
                  galleryData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>

                      <td>
                        {item.video ? (
                          <span className="MainGallery__videoName">{item.video}</span>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt="gallery"
                            className="MainGallery__photo"
                          />
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        <div className="MainGallery__actionBox">
                          <button
                            type="button"
                            className="MainGallery__actionBtn"
                            onClick={() =>
                              setMenuOpenId(menuOpenId === item.id ? null : item.id)
                            }
                          >
                            <FiMoreVertical />
                          </button>

                          {menuOpenId === item.id && (
                            <div className="MainGallery__dropdown">
                              <button
                                type="button"
                                onClick={() => handleEdit(item)}
                              >
                                <FiEdit2 /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                              >
                                <FiTrash2 /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="MainGallery__noData">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGallery;