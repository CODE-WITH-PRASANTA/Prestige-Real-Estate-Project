import React, { useEffect, useState } from "react";
import "./MainFaq.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import API from "../../api/API"; // ✅ correct path

const MainFaq = () => {
  const base = "mainfaq";

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "",
  });

  const [faqList, setFaqList] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ================= FETCH ================= */
  const fetchFaqs = async () => {
    try {
      const res = await API.get("/faqs");
      setFaqList(res.data.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.question || !form.answer || !form.category) return;

    try {
      if (editId) {
        await API.put(`/faqs/${editId}`, form);
      } else {
        await API.post("/faqs", form);
      }

      fetchFaqs();
      setForm({ question: "", answer: "", category: "" });
      setEditId(null);
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setForm({
      question: item.question,
      answer: item.answer,
      category: item.category,
    });

    setEditId(item._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await API.delete(`/faqs/${id}`);
      fetchFaqs();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  return (
    <div className={base}>
      <div className={`${base}__wrapper`}>

        {/* LEFT FORM */}
        <div className={`${base}__formBox`}>
          <h2 className={`${base}__formTitle`}>
            {editId ? "Update FAQ" : "Add New FAQ"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className={`${base}__field`}>
              <label>Question</label>
              <input
                type="text"
                name="question"
                value={form.question}
                onChange={handleChange}
              />
            </div>

            <div className={`${base}__field`}>
              <label>Answer</label>
              <textarea
                name="answer"
                value={form.answer}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={`${base}__field`}>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="Admission">Admission</option>
                <option value="Course">Course</option>
              </select>
            </div>

            <button type="submit" className={`${base}__submitBtn`}>
              {editId ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT TABLE */}
        <div className={`${base}__tableBox`}>
          <h2 className={`${base}__tableTitle`}>FAQ List</h2>

          <div className={`${base}__tableWrapper`}>
            <table>
              <thead>
                <tr>
                  <th>SL. NO</th>
                  <th>QUESTION</th>
                  <th>ANSWER</th>
                  <th>CATEGORY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {faqList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className={`${base}__empty`}>
                      No FAQ added yet
                    </td>
                  </tr>
                ) : (
                  faqList.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.question}</td>
                      <td>{item.answer}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          className={`${base}__actionBtn edit`}
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className={`${base}__actionBtn delete`}
                          onClick={() => handleDelete(item._id)}
                        >
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
    </div>
  );
};

export default MainFaq;