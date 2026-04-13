import React, { useState } from "react";
import "./PropertyPosting.css";

const PropertyPosting = () => {
  const base = "propertyPosting";

  const initialForm = {
    title: "",
    description: "",
    location: "",
    lastUpdate: "",
    rating: 0,
    banner: null,
    listedDate: "",
    category: "",
    reviews: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [properties, setProperties] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "banner") {
      setFormData({ ...formData, banner: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* RATING */
  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  /* SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...properties];
      updated[editIndex] = formData;
      setProperties(updated);
      setEditIndex(null);
    } else {
      setProperties([...properties, formData]);
    }

    setFormData(initialForm);
  };

  /* EDIT */
  const handleEdit = (index) => {
    setFormData(properties[index]);
    setEditIndex(index);
  };

  /* DELETE */
  const handleDelete = (index) => {
    const updated = properties.filter((_, i) => i !== index);
    setProperties(updated);
  };

  /* PAGINATION */
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = properties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(properties.length / rowsPerPage);

  return (
    <div className={base}>
      {/* LEFT FORM */}
      <div className={`${base}__form`}>
        <form onSubmit={handleSubmit}>
          <h2>Property Posting</h2>

          <label>Property Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter property title"
            value={formData.title}
            onChange={handleChange}
          />

          <label>Short Description</label>
          <input
            type="text"
            name="description"
            placeholder="Short description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
          />

          <label>Last Update</label>
          <input
            type="date"
            name="lastUpdate"
            value={formData.lastUpdate}
            onChange={handleChange}
          />

          <label>Rating</label>
          <div className={`${base}__stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={formData.rating >= star ? "active" : ""}
              >
                ★
              </span>
            ))}
          </div>

          <label>Upload Banner</label>
          <input type="file" name="banner" onChange={handleChange} />

          <label>Listed Date</label>
          <input
            type="date"
            name="listedDate"
            value={formData.listedDate}
            onChange={handleChange}
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>Flat</option>
            <option>Apartment</option>
            <option>Villa</option>
          </select>

          <label>Review Reply</label>
          <textarea
            name="reviews"
            placeholder="Write reply..."
            value={formData.reviews}
            onChange={handleChange}
          />

          <button type="submit">
            {editIndex !== null ? "Update Property" : "Submit Property"}
          </button>
        </form>
      </div>

      {/* RIGHT TABLE */}
      <div className={`${base}__table`}>
        <h2>Property List</h2>

        <div className={`${base}__tableWrapper`}>
          <table>
            <thead>
              <tr>
                <th>Banner</th>
                <th>Title</th>
                <th>Location</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.banner && (
                      <img
                        src={URL.createObjectURL(item.banner)}
                        alt=""
                      />
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.location}</td>
                  <td>{item.category}</td>
                  <td>{"⭐".repeat(item.rating)}</td>
                  <td>{item.listedDate}</td>

                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className={`${base}__pagination`}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyPosting;