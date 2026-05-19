import React, { useEffect, useState } from "react";
import API, { IMG_URL } from "../../api/axios";
import "./MainGallary.css";

const MainGallary = () => {
  const [formData, setFormData] = useState({
    topCity: "",
    cityName: "",
    properties: "",
    image: null,
    preview: "",
  });

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await API.get("/gallery");

      setData(res.data.data || []);

    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* ================= IMAGE ================= */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();

      sendData.append("topCity", formData.topCity);
      sendData.append("cityName", formData.cityName);
      sendData.append("properties", formData.properties);

      if (formData.image) {
        sendData.append("image", formData.image);
      }

      /* ================= UPDATE ================= */

      if (editId) {
        await API.put(`/gallery/${editId}`, sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Updated Successfully ✅");

      } else {

        /* ================= CREATE ================= */

        await API.post("/gallery", sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Added Successfully ✅");
      }

      resetForm();

      fetchData();

    } catch (err) {
      console.log(
        "Submit Error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Something went wrong ❌"
      );
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (item) => {
    setEditId(item._id);

    setFormData({
      topCity: item.topCity,
      cityName: item.cityName,
      properties: item.properties,
      image: null,
      preview: `${IMG_URL}${item.image}`,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/gallery/${id}`);

      alert("Deleted Successfully ✅");

      fetchData();

    } catch (err) {
      console.log(
        "Delete Error:",
        err.response?.data || err.message
      );

      alert("Delete Failed ❌");
    }
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setFormData({
      topCity: "",
      cityName: "",
      properties: "",
      image: null,
      preview: "",
    });

    setEditId(null);
  };

  return (
    <div className="galleryAdmin">
      <div className="galleryAdmin__container">

        {/* ================= FORM ================= */}

        <div className="galleryAdmin__form">

          <h2>
            {editId
              ? "Update Gallery"
              : "Add Gallery"}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* TOP CITY */}

            <div className="galleryAdmin__input">
              <label>Top City</label>

              <input
                type="text"
                name="topCity"
                placeholder="Top City"
                value={formData.topCity}
                onChange={handleChange}
                required
              />
            </div>

            {/* CITY NAME */}

            <div className="galleryAdmin__input">
              <label>City Name</label>

              <input
                type="text"
                name="cityName"
                placeholder="City Name"
                value={formData.cityName}
                onChange={handleChange}
                required
              />
            </div>

            {/* PROPERTIES */}

            <div className="galleryAdmin__input">
              <label>Properties</label>

              <input
                type="number"
                name="properties"
                placeholder="Properties"
                value={formData.properties}
                onChange={handleChange}
                required
              />
            </div>

            {/* IMAGE */}

            <div className="galleryAdmin__input">
              <label>Upload Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {/* PREVIEW */}

            {formData.preview && (
              <div className="galleryAdmin__preview">
                <img
                  src={formData.preview}
                  alt="Preview"
                />
              </div>
            )}

            {/* BUTTONS */}

            <div className="galleryAdmin__btnGroup">

              <button
                type="submit"
                className="galleryAdmin__btn"
              >
                {editId ? "Update" : "Add"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="galleryAdmin__cancel"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* ================= TABLE ================= */}

        <div className="galleryAdmin__table">

          <h2>Gallery List</h2>

          <div className="galleryAdmin__tableWrapper">

            <table>

              <thead>
                <tr>
                  <th>Image</th>
                  <th>Top City</th>
                  <th>City Name</th>
                  <th>Properties</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td colSpan="5">
                      Loading...
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item._id}>

                      {/* IMAGE */}

                      <td>
                        <img
                          src={`${IMG_URL}${item.image}`}
                          alt={item.cityName}
                          className="galleryAdmin__tableImg"
                        />
                      </td>

                      {/* TOP CITY */}

                      <td>{item.topCity}</td>

                      {/* CITY */}

                      <td>{item.cityName}</td>

                      {/* PROPERTIES */}

                      <td>{item.properties}</td>

                      {/* ACTION */}

                      <td>

                        <button
                          className="edit"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      No Gallery Data Found
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

export default MainGallary;