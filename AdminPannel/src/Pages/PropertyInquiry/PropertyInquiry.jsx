import React, { useEffect, useState } from "react";
import "./PropertyInquiry.css";

import {
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";

import API from "../../api/axios";

const PropertyInquiry = () => {
  const base = "PropertyInquiry";

  /* ================= STATES ================= */
  const [inquiries, setInquiries] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ================= FETCH ================= */
  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const res = await API.get("/property-inquiries");

      setInquiries(res.data.data || []);
    } catch (error) {
      console.error("Fetch Inquiry Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this inquiry?"
      );

      if (!confirmDelete) return;

      await API.delete(`/property-inquiries/${id}`);

      setInquiries((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  /* ================= TOGGLE ================= */
  const handleToggle = async (id) => {
    try {
      const res = await API.patch(
        `/property-inquiries/${id}/toggle`
      );

      const updatedItem = res.data.data;

      setInquiries((prev) =>
        prev.map((item) =>
          item._id === id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Toggle Error:", error);
    }
  };

  /* ================= OPEN MODAL ================= */
  const handleEditOpen = (item) => {
    setEditId(item._id);

    setEditData({
      name: item.name || "",
      email: item.email || "",
      phone: item.phone || "",
      message: item.message || "",
    });

    setShowModal(true);
  };

  /* ================= CHANGE ================= */
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SAVE ================= */
  const handleEditSave = async () => {
    try {
      const res = await API.put(
        `/property-inquiries/${editId}`,
        editData
      );

      const updatedInquiry = res.data.data;

      setInquiries((prev) =>
        prev.map((item) =>
          item._id === editId
            ? updatedInquiry
            : item
        )
      );

      setShowModal(false);

      setEditId(null);

    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  /* ================= SEARCH ================= */
  const filteredData = inquiries.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={base}>

      {/* ================= HEADER ================= */}
      <div className={`${base}__top`}>

        <div>
          <h1 className={`${base}__title`}>
            Property Inquiry Management
          </h1>

          <p className={`${base}__subtitle`}>
            Manage all customer enquiries from property pages.
          </p>
        </div>

        {/* SEARCH */}
        <div className={`${base}__searchBox`}>

          <FaSearch />

          <input
            type="text"
            placeholder="Search inquiry..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className={`${base}__tableCard`}>

        <div className={`${base}__tableWrap`}>

          <table className={`${base}__table`}>

            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Submission Details</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="5">
                    <div className={`${base}__empty`}>
                      Loading inquiries...
                    </div>
                  </td>
                </tr>

              ) : filteredData.length > 0 ? (

                filteredData.map((item, index) => (

                  <tr key={item._id}>

                    {/* SL */}
                    <td>
                      <span className={`${base}__sl`}>
                        {index + 1}
                      </span>
                    </td>

                    {/* DETAILS */}
                    <td>

                      <div className={`${base}__userInfo`}>

                        <h3>{item.name}</h3>

                        <p>{item.email}</p>

                        <span>{item.phone}</span>

                        <div className={`${base}__message`}>
                          {item.message}
                        </div>

                      </div>

                    </td>

                    {/* DATE */}
                    <td>
                      <span className={`${base}__date`}>
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>

                      {item.connected ? (

                        <span
                          className={`${base}__status} ${base}__status--connected`}
                        >
                          Connected
                        </span>

                      ) : (

                        <span
                          className={`${base}__status} ${base}__status--disconnected`}
                        >
                          Disconnected
                        </span>

                      )}

                    </td>

                    {/* ACTIONS */}
                    <td>

                      <div className={`${base}__actions`}>

                        {/* EDIT */}
                        <button
                          className={`${base}__actionBtn} ${base}__editBtn`}
                          onClick={() =>
                            handleEditOpen(item)
                          }
                        >
                          <FaEdit />
                        </button>

                        {/* DELETE */}
                        <button
                          className={`${base}__actionBtn} ${base}__deleteBtn`}
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >
                          <FaTrash />
                        </button>

                        {/* TOGGLE */}
                        <button
                          className={`${base}__actionBtn} ${
                            item.connected
                              ? `${base}__disconnectBtn`
                              : `${base}__connectBtn`
                          }`}
                          onClick={() =>
                            handleToggle(item._id)
                          }
                        >

                          {item.connected ? (
                            <>
                              <FaTimesCircle />
                              Disconnect
                            </>
                          ) : (
                            <>
                              <FaCheckCircle />
                              Connect
                            </>
                          )}

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="5">
                    <div className={`${base}__empty`}>
                      No inquiries found
                    </div>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= MODAL ================= */}
      {showModal && (

        <div className={`${base}__modalOverlay`}>

          <div className={`${base}__modal`}>

            {/* HEADER */}
            <div className={`${base}__modalHeader`}>

              <h2>Edit Inquiry</h2>

              <button
                type="button"
                className={`${base}__closeBtn`}
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                }}
              >
                ×
              </button>

            </div>

            {/* BODY */}
            <div className={`${base}__modalBody`}>

              {/* NAME */}
              <div className={`${base}__modalField`}>

                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                />

              </div>

              {/* EMAIL */}
              <div className={`${base}__modalField`}>

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                />

              </div>

              {/* PHONE */}
              <div className={`${base}__modalField`}>

                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                />

              </div>

              {/* MESSAGE */}
              <div className={`${base}__modalField`}>

                <label>Message</label>

                <textarea
                  rows="5"
                  name="message"
                  value={editData.message}
                  onChange={handleEditChange}
                />

              </div>

            </div>

            {/* FOOTER */}
            <div className={`${base}__modalFooter`}>

              <button
                type="button"
                className={`${base}__cancelBtn`}
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className={`${base}__updateBtn`}
                onClick={handleEditSave}
              >
                Update Inquiry
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default PropertyInquiry;