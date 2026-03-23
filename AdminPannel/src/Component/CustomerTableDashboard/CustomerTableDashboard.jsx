import React, { useState } from "react";
import "./CustomerTableDashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const CustomerTableDashboard = () => {
  const data = [
    {
      id: "CUS-2009",
      name: "Christopher Moore",
      type: "House",
      email: "chris.moore@example.com",
      phone: "+91 22 2345 6789",
      status: "Lost",
      budget: "$390,000",
      date: "Aug 8, 2024",
      img: "",
      initials: "CM",
    },
    {
      id: "CUS-2016",
      name: "Nancy Harris",
      type: "Office Space",
      email: "nancy.harris@example.com",
      phone: "+86 10 2345 6789",
      status: "Negotiation",
      budget: "$740,000",
      date: "Sep 16, 2024",
      img: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: "CUS-2008",
      name: "Lisa Taylor",
      type: "Villa",
      email: "lisa.taylor@example.com",
      phone: "+81 3 2345 6789",
      status: "Closed",
      budget: "$720,000",
      date: "Jun 14, 2024",
      img: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: "CUS-2011",
      name: "Daniel Rodriguez",
      type: "Commercial",
      email: "daniel.rodriguez@example.com",
      phone: "+7 495 234-56-78",
      status: "Site Visit",
      budget: "$950,000",
      date: "Sep 3, 2024",
      img: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: "CUS-2013",
      name: "Thomas White",
      type: "Land",
      email: "thomas.white@example.com",
      phone: "+65 6 2345 678",
      status: "Inquiry",
      budget: "$220,000",
      date: "Sep 28, 2024",
      initials: "TW",
    },
    {
      id: "CUS-2014",
      name: "Lisa Taylor",
      type: "Villa",
      email: "lisa.taylor@example.com",
      phone: "+81 3 2345 6789",
      status: "Closed",
      budget: "$720,000",
      date: "Jun 14, 2024",
      img: "https://i.pravatar.cc/100?img=4",
    },
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const statusClass = (status) => {
    switch (status) {
      case "Lost": return "lost";
      case "Negotiation": return "negotiation";
      case "Closed": return "closed";
      case "Site Visit": return "visit";
      case "Inquiry": return "inquiry";
      default: return "";
    }
  };

  return (
    <div className="CustomerTableDashboard">

      <div className="CustomerTableDashboard-header">
        <h3>Customers List</h3>
        <span>View All</span>
      </div>

      <div className="CustomerTableDashboard-tableWrap">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>ID</th>
              <th>Customer</th>
              <th>Property Type</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Registration Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, i) => (
              <tr key={i}>
                <td><input type="checkbox" /></td>
                <td>{item.id}</td>

                <td className="customerCell">
                  {item.img ? (
                    <img src={item.img} alt="" />
                  ) : (
                    <div className="initials">{item.initials}</div>
                  )}
                  {item.name}
                </td>

                <td>{item.type}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>

                <td>
                  <span className={`status ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                <td>{item.budget}</td>
                <td>{item.date}</td>

                <td className="actions">
                  <button className="edit"><FaEdit /></button>
                  <button className="delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="CustomerTableDashboard-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          &lt; Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next &gt;
        </button>
      </div>

    </div>
  );
};

export default CustomerTableDashboard;