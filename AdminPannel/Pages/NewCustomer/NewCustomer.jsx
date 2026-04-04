import React from "react";
import { X, Upload } from "lucide-react";

export default function NewCustomer({ open, onClose }) {

  return (
    <div
      className={`
      fixed inset-0 z-50 flex items-center justify-center
      transition-all duration-300
      ${open ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >

      {/* Blur background */}
      <div
        onClick={onClose}
        className={`
        absolute inset-0
        bg-black/40
        backdrop-blur-sm
        transition-all duration-300
        ${open ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Modal */}
      <div
        className={`
        relative
        w-[95%]
        sm:w-[500px]
        md:w-[600px]
        bg-white
        rounded-2xl
        shadow-xl
        overflow-hidden

        transform
        transition-all
        duration-300

        ${open ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >

        {/* Top gradient */}
        <div className="h-24 bg-gradient-to-r from-blue-200 via-pink-200 to-green-200"></div>

        {/* Avatar Upload */}
        <div className="flex justify-center -mt-12">
          <div className="
            w-24 h-24
            rounded-full
            bg-gray-100
            flex items-center justify-center
            shadow
            cursor-pointer
          ">
            <Upload size={26} className="text-gray-500" />
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>


          {/* Property */}
          <div>
            <label className="text-sm font-medium">
              Property Type
            </label>
            <select className="w-full border rounded-lg p-2 mt-1">
              <option>Select</option>
              <option>Villa</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Land</option>
            </select>
          </div>


          {/* Status */}
          <div>
            <label className="text-sm font-medium">
              Status
            </label>
            <select className="w-full border rounded-lg p-2 mt-1">
              <option>Select</option>
              <option>Negotiation</option>
              <option>Site Visit</option>
              <option>Inquiry</option>
              <option>Closed</option>
              <option>Lost</option>
            </select>
          </div>


          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+000 0000 0000"
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Budget
              </label>
              <input
                type="text"
                placeholder="Enter budget amount"
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Registration Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

          </div>


          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-2">

            <button
              onClick={onClose}
              className="text-red-500 flex items-center gap-1"
            >
              <X size={16} /> Close
            </button>

            <button
              className="
              bg-green-500
              hover:bg-green-600
              text-white
              px-4 py-2
              rounded-lg
              transition
              "
            >
              Add Customer
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}