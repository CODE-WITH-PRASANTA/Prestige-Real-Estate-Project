import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../Auth/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(form.email, form.password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl
        shadow-xl border border-indigo-100"
      >
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Admin Login
        </h1>

        {error && (
          <p className="text-sm text-rose-600 mb-4 text-center">{error}</p>
        )}

        <label className="label">Email</label>

        <div className="relative mb-4">
          <FiMail className="icon" />

          <input
            type="email"
            required
            className="input pl-14"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <label className="label">Password</label>

        <div className="relative mb-6">
          <FiLock className="icon" />

          <input
            type="password"
            required
            className="input pl-14"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          className="w-full py-3 rounded-xl text-white
          bg-gradient-to-r from-indigo-600 to-violet-600"
        >
          Login
        </button>

        <p className="text-xs text-center text-slate-400 mt-4">
          admin@gmail.com | 123456
        </p>
      </form>

      <style>{`
        .label {
          font-size: 13px;
          font-weight: 600;
          color: #4f46e5;
        }
        .input {
  width: 100%;
  padding: 12px 14px;
  padding-left: 52px;
  border-radius: 14px;
  border: 2px solid #000;
  outline: none;
  font-size: 15px;
  position: relative;
  z-index: 1;
}
        .icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #4f46e5;
  font-size: 18px;
  pointer-events: none;
  z-index: 2;
}
      `}</style>
    </div>
  );
}
