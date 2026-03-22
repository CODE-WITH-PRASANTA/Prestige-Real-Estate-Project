import React, { useState } from "react";
import "./ContactUs.css";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    formTitle: "",
    buttonText: "",
  });

  const [contactData, setContactData] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField) {
      alert("Please fill all input fields");
      return;
    }

    if (editId !== null) {
      setContactData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...formData, id: editId } : item
        )
      );
      setEditId(null);
    } else {
      const newData = {
        ...formData,
        id: Date.now(),
      };
      setContactData((prev) => [newData, ...prev]);
    }

    setFormData({
      email: "",
      phone: "",
      address: "",
      formTitle: "",
      buttonText: "",
    });

    setMenuOpenId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      email: item.email,
      phone: item.phone,
      address: item.address,
      formTitle: item.formTitle,
      buttonText: item.buttonText,
    });
    setEditId(item.id);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    setContactData((prev) => prev.filter((item) => item.id !== id));
    setMenuOpenId(null);
  };

  return (
    <div className="ContactUs">
      <div className="ContactUs__grid">
        {/* Left Side Form */}
        <div className="ContactUs__formCard">
          <div className="ContactUs__header">
            <h2 className="ContactUs__title">Contact Form</h2>
            <p className="ContactUs__subtitle">Add contact page details</p>
          </div>

          <form className="ContactUs__form" onSubmit={handleSubmit}>
            <div className="ContactUs__formGroup">
              <label className="ContactUs__label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="ContactUs__input"
                placeholder="Enter email"
              />
            </div>

            <div className="ContactUs__formGroup">
              <label className="ContactUs__label">Contact Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="ContactUs__input"
                placeholder="Enter contact number"
              />
            </div>

            <div className="ContactUs__formGroup">
              <label className="ContactUs__label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="ContactUs__textarea"
                placeholder="Enter address"
                rows="4"
              />
            </div>

            <div className="ContactUs__formGroup">
              <label className="ContactUs__label">Form Title</label>
              <input
                type="text"
                name="formTitle"
                value={formData.formTitle}
                onChange={handleChange}
                className="ContactUs__input"
                placeholder="Enter form title"
              />
            </div>

            <div className="ContactUs__formGroup">
              <label className="ContactUs__label">Destination</label>
              <input
                type="text"
                name="Destination"
                value={formData.buttonText}
                onChange={handleChange}
                className="ContactUs__input"
                placeholder="Enter button text"
              />
            </div>

            <button type="submit" className="ContactUs__submitBtn">
              {editId !== null ? "Update Contact" : "Submit Contact"}
            </button>
          </form>
        </div>

        {/* Right Side Table */}
        <div className="ContactUs__tableCard">
          <div className="ContactUs__header">
            <h2 className="ContactUs__title">Contact Table</h2>
            <p className="ContactUs__subtitle">Submitted contact details</p>
          </div>

          <div className="ContactUs__tableWrap">
            <table className="ContactUs__table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Form Title</th>
                  <th>Button</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {contactData.length > 0 ? (
                  contactData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.formTitle}</td>
                      <td>{item.buttonText}</td>
                      <td>
                        <div className="ContactUs__actionBox">
                          <button
                            type="button"
                            className="ContactUs__actionBtn"
                            onClick={() =>
                              setMenuOpenId(menuOpenId === item.id ? null : item.id)
                            }
                          >
                            <FiMoreVertical />
                          </button>

                          {menuOpenId === item.id && (
                            <div className="ContactUs__dropdown">
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
                    <td colSpan="7" className="ContactUs__noData">
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

export default ContactUs;