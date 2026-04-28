import React, { useState } from "react";
import "./RentProperty.css";

const emptyForm = {
  title: "",
  location: "",
  price: "",
  bhk: "",
  area: "",
  baths: "",
  owner: "",
  postedBy: "Owner",
  furnished: "Yes",
  verified: "Yes",
  description: "",
  status: "Active",
  image: "",
};

const RentProperty = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [editIndex, setEditIndex] = useState(null);

  const [propertyList, setPropertyList] = useState([
    {
      title: "Ratna Arcade",
      location: "Bhubaneswar",
      price: "30000",
      bhk: "3 BHK",
      area: "1260 sqft",
      baths: "2 Baths",
      owner: "Anandita Rout",
      postedBy: "Owner",
      furnished: "Yes",
      verified: "Yes",
      description: "Premium residential property.",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...propertyList];
      updated[editIndex] = formData;
      setPropertyList(updated);
      setEditIndex(null);
    } else {
      setPropertyList([formData, ...propertyList]);
    }

    setFormData(emptyForm);
  };

  const handleEdit = (index) => {
    setFormData(propertyList[index]);
    setEditIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Delete this property?");

    if (confirmDelete) {
      const updated = propertyList.filter((_, i) => i !== index);
      setPropertyList(updated);
    }
  };

  return (
    <div className="rentProperty">
      <div className="rentPropertyWrapper">
        <h2 className="rentPropertyHeading">Rent Property Admin Panel</h2>

        <div className="rentPropertyTopGrid">
          {/* LEFT FORM */}
          <div className="rentPropertyFormCard">
            <h3 className="rentPropertyCardTitle">
              {editIndex !== null ? "Edit Property" : "Add Property"}
            </h3>

            <form className="rentPropertyForm" onSubmit={handleSubmit}>
              <div className="rentPropertySectionTitle">Property Details</div>

              <div className="rentPropertyGrid">
                <input
                  type="text"
                  name="title"
                  placeholder="Property Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="bhk"
                  placeholder="BHK Type"
                  value={formData.bhk}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="area"
                  placeholder="Area"
                  value={formData.area}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="baths"
                  placeholder="Baths"
                  value={formData.baths}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="owner"
                  placeholder="Owner Name"
                  value={formData.owner}
                  onChange={handleChange}
                />

                <select
                  name="postedBy"
                  value={formData.postedBy}
                  onChange={handleChange}
                >
                  <option>Owner</option>
                  <option>Dealer</option>
                </select>

                <select
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>

                <select
                  name="verified"
                  value={formData.verified}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Sold</option>
                </select>
              </div>

              <div className="rentPropertySectionTitle">Description</div>

              <textarea
                rows="4"
                name="description"
                placeholder="Property Description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>

              <div className="rentPropertySectionTitle">Upload Image</div>

              <input type="file" accept="image/*" onChange={handleImageUpload} />

              <button type="submit" className="rentPropertyBtn">
                {editIndex !== null ? "Update Property" : "Save Property"}
              </button>
            </form>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="rentPropertyPreviewCard">
            <h3 className="rentPropertyCardTitle">Live Preview</h3>

            <div className="rentPropertyPreviewBox">
              <img
                src={
                  formData.image
                    ? formData.image
                    : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900"
                }
                alt="preview"
                className="rentPropertyPreviewImg"
              />

              <div className="rentPropertyPreviewContent">
                <h3>{formData.title || "Property Title"}</h3>
                <p>{formData.location || "Location"}</p>

                <div className="rentPropertyPrice">
                  ₹{formData.price || "0"}/month
                </div>

                <div className="rentPropertyMeta">
                  <span>{formData.bhk || "BHK"}</span>
                  <span>{formData.area || "Area"}</span>
                  <span>{formData.baths || "Baths"}</span>
                </div>

                <div className="rentPropertyTags">
                  <span>{formData.furnished}</span>
                  <span>{formData.verified}</span>
                </div>

                <p className="rentPropertyDesc">
                  {formData.description || "Property description"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="rentPropertyTableCard">
          <h3 className="rentPropertyCardTitle">Property List</h3>

          <div className="rentPropertyTableWrap">
            <table className="rentPropertyTable">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Price</th>
                  <th>BHK</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {propertyList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.image} alt="" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.location}</td>
                    <td>₹{item.price}</td>
                    <td>{item.bhk}</td>
                    <td>{item.postedBy}</td>

                    <td>
                      <span
                        className={`rentPropertyStatus ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="rentPropertyActionBtns">
                        <button
                          type="button"
                          className="editBtn"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="deleteBtn"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentProperty;