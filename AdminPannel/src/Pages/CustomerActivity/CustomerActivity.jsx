import React, {
  useEffect,
  useState,
} from "react";

import "./CustomerActivity.css";

import Swal from "sweetalert2";

import {
  API,
} from "../../api/axios";

import {
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserTie,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const CustomerActivity = () => {
  const [activities, setActivities] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      designation: "",
      location: "",
      contactedDate: "",
      propertyView: "",
      interest: "",
      feedback: "",
      nextVisitDate: "",
      nextVisitTime: "",
    });

  /* =========================================
      FETCH ACTIVITIES
  ========================================= */

  const fetchActivities =
    async () => {
      try {
        const res =
          await API.get(
            "/customer-activity"
          );

        if (
          res.data.success
        ) {
          setActivities(
            res.data.data
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchActivities();
  }, []);

  /* =========================================
      HANDLE CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================
      RESET FORM
  ========================================= */

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      designation: "",
      location: "",
      contactedDate: "",
      propertyView: "",
      interest: "",
      feedback: "",
      nextVisitDate: "",
      nextVisitTime: "",
    });

    setEditId(null);
  };

  /* =========================================
      SUBMIT
  ========================================= */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        if (editId) {
          await API.put(
            `/customer-activity/update/${editId}`,
            formData
          );

          Swal.fire({
            icon: "success",
            title:
              "Updated Successfully",
            text:
              "Customer activity updated successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          await API.post(
            "/customer-activity/create",
            formData
          );

          Swal.fire({
            icon: "success",
            title:
              "Created Successfully",
            text:
              "Customer activity added successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        }

        fetchActivities();

        resetForm();
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            "Something went wrong!",
        });
      } finally {
        setLoading(false);
      }
    };

  /* =========================================
      EDIT
  ========================================= */

  const handleEdit = (item) => {
    setEditId(item._id);

    setFormData({
      name: item.name || "",
      phone: item.phone || "",
      designation:
        item.designation || "",
      location:
        item.location || "",
      contactedDate:
        item.contactedDate || "",
      propertyView:
        item.propertyView || "",
      interest:
        item.interest || "",
      feedback:
        item.feedback || "",
      nextVisitDate:
        item.nextVisitDate || "",
      nextVisitTime:
        item.nextVisitTime || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
      DELETE
  ========================================= */

  const handleDelete =
    async (id) => {
      const result =
        await Swal.fire({
          title:
            "Are you sure?",
          text:
            "You want to delete this customer activity?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor:
            "#7c3aed",
          cancelButtonColor:
            "#ef4444",
          confirmButtonText:
            "Yes, Delete",
        });

      if (!result.isConfirmed)
        return;

      try {
        await API.delete(
          `/customer-activity/delete/${id}`
        );

        Swal.fire({
          icon: "success",
          title:
            "Deleted Successfully",
          timer: 1800,
          showConfirmButton: false,
        });

        fetchActivities();
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Delete Failed",
        });
      }
    };

  return (
    <div className="Cust-act-page">
      <div className="Cust-act-wrapper">

        {/* =========================================
            FORM SECTION
        ========================================= */}

        <div className="Cust-act-formCard">

          <div className="Cust-act-header">

            <div>

              <h2>
                Customer Activity
              </h2>

              <p>
                Track customer interactions
                and follow-ups
              </p>

            </div>

            <div className="Cust-act-icon">
              <FaUsers />
            </div>

          </div>

          <form
            className="Cust-act-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="Cust-act-field">

              <label>
                Customer Name
              </label>

              <div className="Cust-act-inputWrap">

                <FaUsers />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PHONE */}

            <div className="Cust-act-field">

              <label>
                Phone Number
              </label>

              <div className="Cust-act-inputWrap">

                <FaPhoneAlt />

                <input
                  type="number"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* DESIGNATION */}

            <div className="Cust-act-field">

              <label>
                Designation
              </label>

              <div className="Cust-act-inputWrap">

                <FaUserTie />

                <input
                  type="text"
                  name="designation"
                  placeholder="Customer designation"
                  value={
                    formData.designation
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* LOCATION */}

            <div className="Cust-act-field">

              <label>
                Location
              </label>

              <div className="Cust-act-inputWrap">

                <FaMapMarkerAlt />

                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* CONTACTED DATE */}

            <div className="Cust-act-field">

              <label>
                Contacted Date
              </label>

              <div className="Cust-act-inputWrap">

                <FaCalendarAlt />

                <input
                  type="date"
                  name="contactedDate"
                  value={
                    formData.contactedDate
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* PROPERTY */}

            <div className="Cust-act-field">

              <label>
                About Property
              </label>

              <select
                name="propertyView"
                value={
                  formData.propertyView
                }
                onChange={handleChange}
              >

                <option value="">
                  Select
                </option>

                <option value="Property Viewed">
                  Property Viewed
                </option>

                <option value="Not Viewed">
                  Not Viewed
                </option>

              </select>

            </div>

            {/* INTEREST */}

            <div className="Cust-act-field">

              <label>
                Interested Status
              </label>

              <select
                name="interest"
                value={
                  formData.interest
                }
                onChange={handleChange}
              >

                <option value="">
                  Select
                </option>

                <option value="Interested">
                  Interested
                </option>

                <option value="Not Interested">
                  Not Interested
                </option>

              </select>

            </div>

            {/* FEEDBACK */}

            <div className="Cust-act-field">

              <label>
                Feedback Improvement
              </label>

              <textarea
                rows="5"
                name="feedback"
                placeholder="Write customer feedback..."
                value={
                  formData.feedback
                }
                onChange={handleChange}
              />

            </div>

            {/* NEXT VISIT DATE */}

            <div className="Cust-act-field">

              <label>
                Next Visit Date
              </label>

              <div className="Cust-act-inputWrap">

                <FaCalendarAlt />

                <input
                  type="date"
                  name="nextVisitDate"
                  value={
                    formData.nextVisitDate
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* NEXT VISIT TIME */}

            <div className="Cust-act-field">

              <label>
                Next Visit Time
              </label>

              <div className="Cust-act-inputWrap">

                <FaClock />

                <input
                  type="time"
                  name="nextVisitTime"
                  value={
                    formData.nextVisitTime
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="Cust-act-submitBtn"
              disabled={loading}
            >

              <FaPlus />

              {loading
                ? "Processing..."
                : editId
                ? "Update Activity"
                : "Submit Activity"}

            </button>

          </form>

        </div>

        {/* =========================================
            TABLE SECTION
        ========================================= */}

        <div className="Cust-act-tableCard">

          <div className="Cust-act-header">

            <div>

              <h2>
                Customer Activities
              </h2>

              <p>
                Manage all customer records
              </p>

            </div>

          </div>

          <div className="Cust-act-tableWrapper">

            <table className="Cust-act-table">

              <thead>

                <tr>

                  <th>
                    Sl No
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Designation
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Contacted
                  </th>

                  <th>
                    Property
                  </th>

                  <th>
                    Interest
                  </th>

                  <th>
                    Feedback
                  </th>

                  <th>
                    Next Visit
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {activities.length >
                0 ? (
                  activities.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={item._id}
                      >

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          {item.name}
                        </td>

                        <td>
                          {item.phone}
                        </td>

                        <td>
                          {
                            item.designation
                          }
                        </td>

                        <td>
                          {
                            item.location
                          }
                        </td>

                        <td>
                          {
                            item.contactedDate
                          }
                        </td>

                        <td>

                          <span
                            className={`Cust-act-badge ${
                              item.propertyView ===
                              "Property Viewed"
                                ? "Cust-act-green"
                                : "Cust-act-red"
                            }`}
                          >
                            {
                              item.propertyView
                            }
                          </span>

                        </td>

                        <td>

                          <span
                            className={`Cust-act-badge ${
                              item.interest ===
                              "Interested"
                                ? "Cust-act-green"
                                : "Cust-act-red"
                            }`}
                          >
                            {
                              item.interest
                            }
                          </span>

                        </td>

                        <td className="Cust-act-feedback">
                          {
                            item.feedback
                          }
                        </td>

                        <td>

                          {
                            item.nextVisitDate
                          }

                          <br />

                          <small>
                            {
                              item.nextVisitTime
                            }
                          </small>

                        </td>

                        <td>

                          <div className="Cust-act-actionBtns">

                            <button
                              className="Cust-act-editBtn"
                              onClick={() =>
                                handleEdit(
                                  item
                                )
                              }
                            >

                              <FaEdit />

                            </button>

                            <button
                              className="Cust-act-deleteBtn"
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                            >

                              <FaTrash />

                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )
                ) : (
                  <tr>

                    <td
                      colSpan="11"
                      className="Cust-act-empty"
                    >
                      No Customer Activities
                      Found
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

export default CustomerActivity;