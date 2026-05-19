import React, { useEffect, useState } from "react";
import "./ColdLead.css";
import API from "../../api/axios";

const ColdLeadForm = () => {
  const base = "coldlead";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    property: "",
    budget: "",
    city: "",
    message: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  /* ================= FETCH DATA ================= */

  const fetchColdLeads = async () => {
    try {
      setTableLoading(true);

      const res = await API.get("/cold-leads");

      setData(res.data.data || []);

    } catch (err) {
      console.log(
        "Fetch Error:",
        err.response?.data || err.message
      );

      alert("Failed to fetch data");

    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchColdLeads();
  }, []);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      property: "",
      budget: "",
      city: "",
      message: "",
    });

    setEditId(null);
  };

  /* ================= SUBMIT / UPDATE ================= */

  const handleSubmit = async () => {
    try {
      if (!form.name.trim()) {
        return alert("Name required");
      }

      if (!form.phone.trim()) {
        return alert("Phone required");
      }

      setLoading(true);

      /* ================= UPDATE ================= */

      if (editId) {
        await API.put(`/cold-leads/${editId}`, form);

        alert("Updated successfully ✅");

      } else {

        /* ================= CREATE ================= */

        await API.post("/cold-leads", form);

        alert("Created successfully ✅");
      }

      resetForm();

      fetchColdLeads();

    } catch (err) {
      console.log(
        "Submit Error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Submit failed ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      phone: item.phone || "",
      email: item.email || "",
      property: item.property || "",
      budget: item.budget || "",
      city: item.city || "",
      message: item.message || "",
    });

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/cold-leads/${id}`);

      alert("Deleted successfully ✅");

      fetchColdLeads();

    } catch (err) {
      console.log(
        "Delete Error:",
        err.response?.data || err.message
      );

      alert("Delete failed ❌");
    }
  };

  return (
    <div className={base}>

      {/* ================= LEFT FORM ================= */}

      <div className={`${base}__left`}>

        <div className={`${base}__card`}>

          <h2>
            {editId
              ? "Update Consultation"
              : "Request a Free Consultation"}
          </h2>

          {/* ================= ROW 1 ================= */}

          <div className={`${base}__row`}>

            <div className={`${base}__field`}>
              <label>Full Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </div>

            <div className={`${base}__field`}>
              <label>Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter Phone"
              />
            </div>

          </div>

          {/* ================= ROW 2 ================= */}

          <div className={`${base}__row`}>

            <div className={`${base}__field`}>
              <label>Email</label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>

            <div className={`${base}__field`}>
              <label>Property</label>

              <select
                name="property"
                value={form.property}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Flat</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>Plot</option>
              </select>
            </div>

          </div>

          {/* ================= ROW 3 ================= */}

          <div className={`${base}__row`}>

            <div className={`${base}__field`}>
              <label>Budget</label>

              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>5L - 10L</option>
                <option>10L - 20L</option>
                <option>20L - 40L</option>
                <option>40L+</option>
              </select>
            </div>

            <div className={`${base}__field`}>
              <label>City</label>

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter City"
              />
            </div>

          </div>

          {/* ================= MESSAGE ================= */}

          <div className={`${base}__field`}>

            <label>Message</label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter Message"
            />

          </div>

          {/* ================= BUTTONS ================= */}

          <div className={`${base}__btnGroup`}>

            <button
              className={`${base}__submit`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editId
                ? "Update"
                : "Submit"}
            </button>

            {editId && (
              <button
                className={`${base}__cancel`}
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </div>
      </div>

      {/* ================= RIGHT TABLE ================= */}

      <div className={`${base}__right`}>

        <div className={`${base}__card`}>

          <h2>Cold Leads</h2>

          <div className="coldlead__tableWrapper">

            <table className="coldlead__table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Property</th>
                  <th>Budget</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {tableLoading ? (
                  <tr>
                    <td colSpan="8">
                      Loading...
                    </td>
                  </tr>

                ) : data.length === 0 ? (

                  <tr>
                    <td colSpan="8">
                      No Data
                    </td>
                  </tr>

                ) : (

                  data.map((item, index) => (
                    <tr key={item._id}>

                      <td>{index + 1}</td>

                      <td>{item.name}</td>

                      <td>{item.phone}</td>

                      <td>{item.email}</td>

                      <td>{item.property}</td>

                      <td>{item.budget}</td>

                      <td>{item.city}</td>

                      <td>

                        <div className="coldlead__action">

                          <button
                            className="editBtn"
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="deleteBtn"
                            onClick={() =>
                              handleDelete(item._id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ColdLeadForm;