import React, { useState } from "react";
import "./EnquiryAdmin.css";

export default function EnquiryAdmin() {
  const [data, setData] = useState([
    {
      name: "John Doe",
      phone: "9876543210",
      email: "john@mail.com",
      type: "Apartment",
      budget: "₹50L - ₹80L",
      city: "Mumbai",
      message: "Looking for 2BHK near city center",
    },
    {
      name: "Sarah Smith",
      phone: "9123456780",
      email: "sarah@mail.com",
      type: "Villa",
      budget: "₹1Cr+",
      city: "Bangalore",
      message: "Need luxury villa with garden",
    },
  ]);

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  return (
    <div className="ea-container">
      <div className="ea-card">
        <h2>Enquiry Management</h2>

        {data.length === 0 ? (
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
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.type}</td>
                    <td>{item.budget}</td>
                    <td>{item.city}</td>
                    <td className="ea-msg">{item.message}</td>

                    <td>
                      <button className="ea-view">View</button>
                      <button
                        className="ea-delete"
                        onClick={() => handleDelete(index)}
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
    </div>
  );
}