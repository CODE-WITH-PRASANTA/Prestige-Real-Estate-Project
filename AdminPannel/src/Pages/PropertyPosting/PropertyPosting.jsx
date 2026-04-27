import React, { useEffect, useState } from "react";
import "./PropertyPosting.css";
import { FaEllipsisV } from "react-icons/fa";
import API, { IMG_URL } from "../../api/axios"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function PropertyPost() {

  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  // ✅ IMAGE HELPER (CLEAN)
  const getImageUrl = (path) => {
    if (!path) return "/no-image.png"; // fallback
    return path.startsWith("http") ? path : `${IMG_URL}${path}`;
  };

  // ✅ FETCH DATA
  const fetchProperties = async () => {
    try {
      const res = await API.get("/property");
      setProperties(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ DELETE
 const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await API.delete(`/property/${id}`);

      Swal.fire({
        title: "Deleted!",
        text: "Property has been deleted successfully.",
        icon: "success",
      });

      fetchProperties(); // refresh list
    } catch (err) {
      console.log(err);

      Swal.fire({
        title: "Error ❌",
        text: "Failed to delete property",
        icon: "error",
      });
    }
  }
};



  return (
    <div className="pp-container">
      {properties.map((item) => (
        <div className="pp-card" key={item._id}>
          
          {/* IMAGE */}
          <div className="pp-imgBox">
            <img
              src={getImageUrl(item.banner)} 
              alt="property"
            />

            <span className="pp-price">₹ {item.price}</span>

            <div className="pp-menu">
              <FaEllipsisV onClick={() => toggleMenu(item._id)} />

              {activeMenu === item._id && (
                <div className="pp-dropdown">
                  <p onClick={() => navigate(`/flat/post/${item._id}`)}>
                    Edit
                  </p>
                  <p
                    className="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="pp-content">
            <h3>{item.title}</h3>

            <p className="pp-location">📍 {item.location}</p>

            <div className="pp-features">
              <span>🛏 {item.features?.bedroom || 0} Bedroom</span>
              <span>🛁 {item.features?.bathroom || 0} Bath</span>
              <span>📐 {item.sqft || 0} Sqft</span>
            </div>

            <div className="pp-footer">
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Updated:</strong> {item.lastUpdate}</p>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}