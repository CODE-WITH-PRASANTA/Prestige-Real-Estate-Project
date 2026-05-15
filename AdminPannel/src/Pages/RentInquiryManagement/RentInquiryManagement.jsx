import React, {
  useEffect,
  useState,
} from "react";

import "./RentInquiryManagement.css";

import API from "../../api/axios";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

const RentInquiryManagement = () => {

  const [search, setSearch] =
    useState("");

  const [inquiries, setInquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH =================

  useEffect(() => {

    const fetchInquiries =
      async () => {

        try {

          const res =
            await API.get(
              "/rent-inquiries"
            );

          setInquiries(
            res.data
          );

        } catch (err) {

          console.error(err);

        } finally {

          setLoading(false);

        }
      };

    fetchInquiries();

  }, []);

  // ================= DELETE =================

  const deleteInquiry =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this inquiry?"
        );

      if (!confirmDelete) return;

      try {

        await API.delete(
          `/rent-inquiries/${id}`
        );

        setInquiries((prev) =>
          prev.filter(
            (item) =>
              item._id !== id
          )
        );

      } catch (err) {

        console.error(err);

      }
    };

  // ================= STATUS UPDATE =================

  const updateStatus =
    async (id, status) => {

      try {

        const res =
          await API.put(
            `/rent-inquiries/${id}`,
            { status }
          );

        setInquiries((prev) =>
          prev.map((item) =>
            item._id === id
              ? res.data
              : item
          )
        );

      } catch (err) {

        console.error(err);

      }
    };

  // ================= SEARCH FILTER =================

  const filtered =
    inquiries.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ================= LOADING =================

  if (loading) {

    return (
      <div className="rent-loading">

        <h2>
          Loading Inquiries...
        </h2>

      </div>
    );
  }

  return (
    <div className="rent-inquiry-page">

      {/* TOPBAR */}

      <div className="rent-inquiry-topbar">

        <div>

          <h2>
            Rent Inquiry Management
          </h2>

          <p>
            Manage all rental
            inquiries from frontend users
          </p>

        </div>

        {/* SEARCH */}

        <div className="rent-inquiry-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* STATS */}

      <div className="rent-inquiry-stats">

        <div className="rent-stat-card">

          <h3>
            {inquiries.length}
          </h3>

          <p>
            Total Inquiries
          </p>

        </div>

        <div className="rent-stat-card">

          <h3>

            {
              inquiries.filter(
                (i) =>
                  i.status === "New"
              ).length
            }

          </h3>

          <p>
            New Leads
          </p>

        </div>

        <div className="rent-stat-card">

          <h3>

            {
              inquiries.filter(
                (i) =>
                  i.status ===
                  "Contacted"
              ).length
            }

          </h3>

          <p>
            Contacted
          </p>

        </div>

        <div className="rent-stat-card">

          <h3>

            {
              inquiries.filter(
                (i) =>
                  i.status ===
                  "Closed"
              ).length
            }

          </h3>

          <p>
            Closed
          </p>

        </div>

      </div>

      {/* TABLE */}

      <div className="rent-table-wrapper">

        <table className="rent-table">

          <thead>

            <tr>

              <th>User</th>

              <th>Property</th>

              <th>Contact</th>

              <th>Status</th>

              <th>Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((item) => (

                <tr key={item._id}>

                  {/* USER */}

                  <td>

                    <div className="rent-user-info">

                      <div className="rent-user-avatar">

                        <FaUser />

                      </div>

                      <div>

                        <h4>
                          {item.name}
                        </h4>

                        <p>
                          {item.location}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* PROPERTY */}

                  <td>

                    <div className="rent-property-info">

                      <h5>
                        {
                          item.propertyTitle
                        }
                      </h5>

                      <span>

                        <FaMapMarkerAlt />

                        {item.location}

                      </span>

                    </div>

                  </td>

                  {/* CONTACT */}

                  <td>

                    <div className="rent-contact-info">

                      <a
                        href={`tel:${item.phone}`}
                      >

                        <FaPhoneAlt />

                        {item.phone}

                      </a>

                      <a
                        href={`mailto:${item.email}`}
                      >

                        <FaEnvelope />

                        {item.email}

                      </a>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className={`rent-status ${item.status?.toLowerCase()}`}
                    >

                      {item.status}

                    </span>

                  </td>

                  {/* DATE */}

                  <td>

                    <span className="rent-date">

                      {
                        new Date(
                          item.createdAt
                        ).toLocaleDateString()
                      }

                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="rent-action-btns">

                      {/* VIEW */}

                      <button
                        className="view-btn"
                        title="View"
                      >

                        <FaEye />

                      </button>

                      {/* STATUS */}

                      <button
                        className="done-btn"
                        title="Mark Closed"
                        onClick={() =>
                          updateStatus(
                            item._id,
                            "Closed"
                          )
                        }
                      >

                        <FaCheckCircle />

                      </button>

                      {/* DELETE */}

                      <button
                        className="delete-btn"
                        title="Delete"
                        onClick={() =>
                          deleteInquiry(
                            item._id
                          )
                        }
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="rent-no-data"
                >

                  No inquiries found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RentInquiryManagement;