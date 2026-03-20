import React, { useState } from "react";
import "./Propertyposting.css";

const Propertyposting = () => {
  const [step, setStep] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    description: "",
    image: null,
    video: null,
  });

  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...list];
      updated[editIndex] = formData;
      setList(updated);
      setEditIndex(null);
    } else {
      setList([...list, formData]);
    }

    setFormData({
      name: "",
      type: "",
      category: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      address: "",
      city: "",
      description: "",
      image: null,
      video: null,
    });

    setStep(1);
  };

  const handleDelete = (i) => {
    setList(list.filter((_, index) => index !== i));
  };

  const handleEdit = (i) => {
    setFormData(list[i]);
    setEditIndex(i);
    setStep(1);
  };

  return (
    <div className="Propertyposting">

      {/* LEFT FORM */}
      <div className="Propertyposting-form">

        {/* PROGRESS */}
        <div className="Propertyposting-progress">
          <div className={`progress-line step-${step}`}></div>

          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`step ${step >= s ? "active" : ""}`}>
              <div className="circle">{s}</div>
            </div>
          ))}
        </div>

        <div className="Propertyposting-scroll">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="form-section">

              <div className="form-group">
                <label>Property Name</label>
                <input name="name" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Type</label>
                <input name="type" value={formData.type} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input name="category" value={formData.category} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input name="price" value={formData.price} onChange={handleChange} />
              </div>

            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="form-section">

              <div className="form-group">
                <label>Bedrooms</label>
                <input name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Bathrooms</label>
                <input name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
              </div>

            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="form-section">

              <div className="form-group">
                <label>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>City</label>
                <input name="city" value={formData.city} onChange={handleChange} />
              </div>

            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="form-section">

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input type="file" name="image" onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Upload Video</label>
                <input type="file" name="video" onChange={handleChange} />
              </div>

            </div>
          )}

        </div>

        {/* BUTTONS */}
        <div className="Propertyposting-buttons">
          {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
          {step < 4 && <button onClick={() => setStep(step + 1)}>Next</button>}
          {step === 4 && (
            <button onClick={handleSubmit}>
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT TABLE */}
      <div className="Propertyposting-table">
        <h3>Property List</h3>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Address</th>
              
                <th>Description</th>
                <th>Image</th>
                <th>Video</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.bedrooms}</td>
                  <td>{item.bathrooms}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.description?.slice(0, 25)}...</td>

                  <td>
                    {item.image && (
                      <img
                        src={URL.createObjectURL(item.image)}
                        alt=""
                        className="table-img"
                      />
                    )}
                  </td>

                  <td>
                    {item.video && (
                      <video className="table-video" controls>
                        <source src={URL.createObjectURL(item.video)} />
                      </video>
                    )}
                  </td>

                  <td className="action-cell">
                    <button
                      className="dots-btn"
                      onClick={() =>
                        setActiveMenu(activeMenu === i ? null : i)
                      }
                    >
                      ⋮
                    </button>

                    {activeMenu === i && (
                      <div className="dropdown">
                        <p onClick={() => handleEdit(i)}>Edit</p>
                        <p onClick={() => handleDelete(i)}>Delete</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Propertyposting;