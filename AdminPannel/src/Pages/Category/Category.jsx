// Category.jsx

import React, {
  useEffect,
  useState,
} from "react";

import "./Category.css";
import Swal from "sweetalert2";

import API from "../../api/axios";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaLayerGroup,
} from "react-icons/fa";

const Category = () => {
  const [categoryName, setCategoryName] =
    useState("");

  const [categories, setCategories] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  /* =========================================
      FETCH ALL CATEGORY
  ========================================= */

  const fetchCategories = async () => {
    try {
      const res = await API.get(
        "/category"
      );

      setCategories(
        res.data.data || []
      );
    } catch (error) {
      console.log(
        "FETCH CATEGORY ERROR :",
        error
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =========================================
      ADD / UPDATE
  ========================================= */

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!categoryName.trim()) return;

  try {
    setLoading(true);

    /* =========================
        UPDATE
    ========================= */

    if (editId) {
      await API.put(
        `/category/update/${editId}`,
        {
          name: categoryName,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Category updated successfully",
        confirmButtonColor: "#4f46e5",
        background: "#fff",
      });

      setEditId(null);
    } else {
      /* =========================
          CREATE
      ========================= */

      await API.post(
        "/category/create",
        {
          name: categoryName,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        text: "Category added successfully",
        confirmButtonColor: "#4f46e5",
        background: "#fff",
      });
    }

    setCategoryName("");

    fetchCategories();
  } catch (error) {
    console.log(
      "CATEGORY ERROR :",
      error
    );

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        error?.response?.data
          ?.message ||
        "Something went wrong",
      confirmButtonColor: "#ef4444",
    });
  } finally {
    setLoading(false);
  }
};

  /* =========================================
      EDIT
  ========================================= */

  const handleEdit = (item) => {
    setCategoryName(item.name);

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
      DELETE
  ========================================= */

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Category?",
    text: "You won't be able to revert this!",
    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",

    confirmButtonText:
      "Yes, Delete",

    cancelButtonText: "Cancel",

    background: "#fff",
  });

  if (!result.isConfirmed) return;

  try {
    await API.delete(
      `/category/delete/${id}`
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text:
        "Category deleted successfully",
      confirmButtonColor: "#4f46e5",
    });

    fetchCategories();
  } catch (error) {
    console.log(
      "DELETE ERROR :",
      error
    );

    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text:
        "Something went wrong",
      confirmButtonColor: "#ef4444",
    });
  }
};

  return (
    <div className="props-cat-page">
      <div className="props-cat-wrapper">
        {/* =========================================
            LEFT FORM
        ========================================= */}

        <div className="props-cat-formCard">
          <div className="props-cat-header">
            <div>
              <h2>
                Property Category
              </h2>

              <p>
                Create and manage
                property categories
              </p>
            </div>

            <div className="props-cat-icon">
              <FaLayerGroup />
            </div>
          </div>

          <form
            className="props-cat-form"
            onSubmit={handleSubmit}
          >
            <div className="props-cat-field">
              <label>
                Category Name
              </label>

              <input
                type="text"
                placeholder="Enter property category"
                value={categoryName}
                onChange={(e) =>
                  setCategoryName(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <button
              type="submit"
              className="props-cat-submitBtn"
              disabled={loading}
            >
              <FaPlus />

              {loading
                ? "Please Wait..."
                : editId
                  ? "Update Category"
                  : "Add Category"}
            </button>
          </form>
        </div>

        {/* =========================================
            RIGHT TABLE
        ========================================= */}

        <div className="props-cat-tableCard">
          <div className="props-cat-header">
            <div>
              <h2>
                Category List
              </h2>

              <p>
                Manage all property
                categories
              </p>
            </div>
          </div>

          <div className="props-cat-tableWrapper">
            <table className="props-cat-table">
              <thead>
                <tr>
                  <th>
                    Sl No
                  </th>

                  <th>
                    Category Name
                  </th>

                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.length >
                0 ? (
                  categories.map(
                    (item, index) => (
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
                          <div className="props-cat-actionBtns">
                            <button
                              type="button"
                              className="props-cat-editBtn"
                              onClick={() =>
                                handleEdit(
                                  item
                                )
                              }
                            >
                              <FaEdit />
                            </button>

                            <button
                              type="button"
                              className="props-cat-deleteBtn"
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
                      colSpan="3"
                      className="props-cat-empty"
                    >
                      No Categories
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

export default Category;