import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./EnquiryAdmin.css";

const EnquiryAdmin = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔄 FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await API.get("/enquiries");

      console.log("API:", res.data);

      setData(res?.data?.data || []);
    } catch (err) {
      console.log("Fetch Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/enquiries/${id}`);
      fetchData();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // 👁 VIEW
  const handleView = (item) => {
    setSelected(item);
    setFormData(item);
    setSelectedId(item._id);
    setEditMode(false);
    setShowModal(true);
  };

  // ❌ CLOSE MODAL
  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => setSelected(null), 300);
  };

  // ✏️ INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔄 UPDATE
  const handleUpdate = async () => {
    try {
      await API.put(`/enquiries/${selectedId}`, formData);
      fetchData();
      handleClose();
    } catch (err) {
      console.log("Update Error:", err);
    }
  };

  return (
    <div className="ea-container">
      <div className="ea-card">
        <h2>Enquiry Management</h2>

        {loading ? (
          <div className="ea-empty">Loading enquiries...</div>
        ) : !data || data.length === 0 ? (
          <div className="ea-empty">No enquiries found</div>
        ) : (
          <div className="ea-tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Property</th>
                  <th>Budget</th>
                  <th>City</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.type}</td>
                    <td>{item.budget}</td>
                    <td>{item.city}</td>
                    <td className="ea-msg">{item.message}</td>

                    <td>
                      <button
                        className="ea-view"
                        onClick={() => handleView(item)}
                      >
                        View
                      </button>

                      <button
                        className="ea-delete"
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
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div className={`ea-modal ${showModal ? "open" : "close"}`}>
          <div className="ea-modal-content">
            <h3>Enquiry Details</h3>

            <div className="ea-form">
              {[
                "name",
                "phone",
                "email",
                "type",
                "budget",
                "city",
                "message",
              ].map((field) => (
                <div key={field} className="ea-field">
                  <label>{field.toUpperCase()}</label>

                  {field === "message" ? (
                    <textarea
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  ) : (
                    <input
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="ea-modal-actions">
              {!editMode ? (
                <button
                  className="ea-edit"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              ) : (
                <button className="ea-update" onClick={handleUpdate}>
                  Update
                </button>
              )}

              <button className="ea-close" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryAdmin;