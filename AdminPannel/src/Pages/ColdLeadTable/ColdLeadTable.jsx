import React from "react";
import "./ColdLeadTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const ColdLeadTable = () => {
  const base = "coldLeadTable";

  const data = []; // Empty state like your design

  return (
    <div className={`${base}`}>
      <div className={`${base}__container`}>
        
        {/* Header */}
        <div className={`${base}__header`}>
          <h2 className={`${base}__title`}>Cold Lead Table</h2>
          <p className={`${base}__subtitle`}>
            Manage all parents and student cold lead records here.
          </p>
        </div>

        {/* Table */}
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className={`${base}__empty`}>
                    No cold lead records found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.feedback}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button className={`${base}__btn edit`}>
                        <FaEdit />
                      </button>
                      <button className={`${base}__btn delete`}>
                        <FaTrash />
                      </button>
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