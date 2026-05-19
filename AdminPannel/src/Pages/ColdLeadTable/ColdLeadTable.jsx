import React, { useEffect, useState } from "react";
import "./ColdLeadTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import API from "../../api/axios";

const ColdLeadTable = () => {
  const base = "coldLeadTable";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */

  const fetchColdLeads = async () => {
    try {
      setLoading(true);

      const res = await API.get("/cold-leads");

      setData(res.data.data || []);

    } catch (error) {
      console.error(
        "Fetch error:",
        error.response?.data || error.message
      );

      alert("Failed to fetch cold leads");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColdLeads();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cold lead?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/cold-leads/${id}`);

      alert("Cold lead deleted successfully ✅");

      fetchColdLeads();

    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.data || error.message
      );

      alert("Failed to delete cold lead ❌");
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = async (item) => {
    const updatedMessage = window.prompt(
      "Update feedback/message",
      item.message || ""
    );

    if (updatedMessage === null) return;

    try {
      await API.put(`/cold-leads/${item._id}`, {
        ...item,
        message: updatedMessage,
      });

      alert("Cold lead updated successfully ✅");

      fetchColdLeads();

    } catch (error) {
      console.error(
        "Update error:",
        error.response?.data || error.message
      );

      alert("Failed to update cold lead ❌");
    }
  };

  return (
    <div className={base}>

      <div className={`${base}__container`}>

        {/* ================= HEADER ================= */}

        <div className={`${base}__header`}>

          <h2 className={`${base}__title`}>
            Cold Lead Table
          </h2>

          <p className={`${base}__subtitle`}>
            Manage all parents and student cold lead
            records here.
          </p>

        </div>

        {/* ================= TABLE ================= */}

        <div className={`${base}__tableWrapper`}>

          <table className={`${base}__table`}>

            <thead>
              <tr>
                <th>Sl No</th>
                <th>Parents / Student Name</th>
                <th>Address</th>
                <th>Feedback</th>
                <th>Phone No</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="6"
                    className={`${base}__empty`}
                  >
                    Loading...
                  </td>
                </tr>

              ) : data.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className={`${base}__empty`}
                  >
                    No cold lead records found.
                  </td>
                </tr>

              ) : (

                data.map((item, index) => (
                  <tr key={item._id}>

                    {/* SERIAL NUMBER */}

                    <td>{index + 1}</td>

                    {/* NAME */}

                    <td>{item.name}</td>

                    {/* ADDRESS */}

                    <td>{item.city || "-"}</td>

                    {/* MESSAGE */}

                    <td>{item.message || "-"}</td>

                    {/* PHONE */}

                    <td>{item.phone}</td>

                    {/* ACTION */}

                    <td>

                      <div className={`${base}__actions`}>

                        {/* EDIT BUTTON */}

                        <button
                          className={`${base}__btn edit`}
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          <FaEdit />
                        </button>

                        {/* DELETE BUTTON */}

                        <button
                          className={`${base}__btn delete`}
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >
                          <FaTrash />
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
  );
};

export default ColdLeadTable;