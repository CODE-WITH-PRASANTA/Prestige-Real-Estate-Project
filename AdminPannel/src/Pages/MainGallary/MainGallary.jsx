import React, { useState, useEffect } from "react";
import API from "../../api/axios";
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

  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH DATA ================= */
const [totalPages, setTotalPages] = useState(1);

const fetchData = async () => {
  try {
    const res = await API.get(`/gallery?page=${currentPage}`);
    setData(res.data.data);
    setTotalPages(res.data.pages);
  } catch (err) {
    console.error("Fetch Error:", err.message);
  }
};

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("topCity", formData.topCity);
    form.append("cityName", formData.cityName);
    form.append("properties", formData.properties);

    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      if (editId) {
        await API.put(`/gallery/${editId}`, form);
      } else {
        await API.post("/gallery", form);
      }

      alert("Saved Successfully ✅");
      fetchData();
      resetForm();
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setFormData({
      topCity: item.topCity,
      cityName: item.cityName,
      properties: item.properties,
      image: null,
      preview: `http://localhost:5000${item.image}`,
    });
    setEditId(item._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await API.delete(`/gallery/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete Error:", err);
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
        {/* FORM */}
        <div className="galleryAdmin__form">
          <h2>City Gallery Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="galleryAdmin__input">
              <label>Top City Tag</label>
              <input
                type="text"
                name="topCity"
                value={formData.topCity}
                onChange={handleChange}
                placeholder="Top City"
                required
              />
            </div>

            <div className="galleryAdmin__input">
              <label>City Name</label>
              <input
                type="text"
                name="cityName"
                value={formData.cityName}
                onChange={handleChange}
                placeholder="City Name"
                required
              />
            </div>

            <div className="galleryAdmin__input">
              <label>Properties</label>
              <input
                type="number"
                name="properties"
                value={formData.properties}
                onChange={handleChange}
                placeholder="Number of properties"
                required
              />
            </div>

            <div className="galleryAdmin__input">
              <label>Upload Image</label>
              <input type="file" onChange={handleImage} />
            </div>

            {formData.preview && (
              <div className="galleryAdmin__preview">
                <img src={formData.preview} alt="preview" />
              </div>
            )}

            <button className="galleryAdmin__btn">
              {editId ? "Update" : "Add City"}
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="galleryAdmin__table">
          <h2>Gallery List</h2>

          <div className="galleryAdmin__tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Top Tag</th>
                  <th>City</th>
                  <th>Properties</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img src={`http://localhost:5000${item.image}`} alt="" />
                    </td>
                    <td>{item.topCity}</td>
                    <td>{item.cityName}</td>
                    <td>{item.properties}</td>
                    <td>
                      <button className="edit" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="galleryAdmin__pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGallary;
