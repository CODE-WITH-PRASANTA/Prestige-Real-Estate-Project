import React, { useState } from "react";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@school.com",
    phone: "9876543210",
    role: "Administrator",
    bio: "Managing school operations and academic activities.",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");

        // ✅ here you can call API
        // axios.post(...)
        // or update state
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold text-indigo-700">Admin Profile</h2>

          <p className="text-gray-600 text-sm">
            Manage your personal information
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <img
            src="https://i.pravatar.cc/150"
            alt=""
            className="w-32 h-32 rounded-full border-4 border-indigo-200"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            Admin User
          </h3>

          <span className="mt-2 px-4 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600">
            Administrator
          </span>

          <button className="mt-4 text-indigo-600 hover:underline text-sm">
            Change Avatar
          </button>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-indigo-600">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="text-sm text-indigo-600">Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-indigo-600">Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="text-sm text-indigo-600">Role</label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-indigo-600">Bio</label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={4}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="
                px-6 py-2 rounded-xl
                bg-gradient-to-r from-indigo-500 to-purple-600
                text-white font-semibold
                hover:scale-105
                transition
                shadow-md
                "
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
