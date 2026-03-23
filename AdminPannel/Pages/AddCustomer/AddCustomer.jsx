import React, { useState } from "react";
import NewCustomer from "../NewCustomer/NewCustomer";
import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const customersData = [
  {
    id: 2001,
    name: "Robert Johnson",
    type: "Villa",
    email: "robert.johnson@example.com",
    phone: "+1 555 234 5678",
    status: "Negotiation",
    budget: "$450,000",
    date: "Aug 15, 2024",
    img: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2002,
    name: "Sarah Williams",
    type: "Apartment",
    email: "sarah.williams@example.com",
    phone: "+44 20 7946 1234",
    status: "Site Visit",
    budget: "$280,000",
    date: "Sep 1, 2024",
    img: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 2003,
    name: "Michael Brown",
    type: "Commercial",
    email: "michael.brown@example.com",
    phone: "+61 2 9374 5000",
    status: "Inquiry",
    budget: "$850,000",
    date: "Sep 12, 2024",
    img: "",
  },
  {
    id: 2004,
    name: "Emily Davis",
    type: "House",
    email: "emily.davis@example.com",
    phone: "+49 30 234567",
    status: "Closed",
    budget: "$520,000",
    date: "Jul 22, 2024",
    img: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 2005,
    name: "James Wilson",
    type: "Land",
    email: "james.wilson@example.com",
    phone: "+33 1 42 68 54 00",
    status: "Negotiation",
    budget: "$180,000",
    date: "Aug 30, 2024",
    img: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 2006,
    name: "Jennifer Martinez",
    type: "Apartment",
    email: "jennifer.martinez@example.com",
    phone: "+34 91 234 56 78",
    status: "Site Visit",
    budget: "$310,000",
    date: "Sep 5, 2024",
    img: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 2007,
    name: "David Anderson",
    type: "Office Space",
    email: "david.anderson@example.com",
    phone: "+49 40 234567",
    status: "Inquiry",
    budget: "$680,000",
    date: "Sep 18, 2024",
    img: "",
  },
  {
    id: 2008,
    name: "Lisa Taylor",
    type: "Villa",
    email: "lisa.taylor@example.com",
    phone: "+81 3 2345 6789",
    status: "Closed",
    budget: "$720,000",
    date: "Jun 14, 2024",
    img: "https://i.pravatar.cc/40?img=6",
  },
  {
    id: 2009,
    name: "Christopher Moore",
    type: "House",
    email: "chris.moore@example.com",
    phone: "+91 22 2345 6789",
    status: "Lost",
    budget: "$390,000",
    date: "Aug 8, 2024",
    img: "",
  },
  {
    id: 2010,
    name: "Patricia Garcia",
    type: "Apartment",
    email: "patricia@example.com",
    phone: "+55 11 2345-6789",
    status: "Negotiation",
    budget: "$265,000",
    date: "Sep 20, 2024",
    img: "https://i.pravatar.cc/40?img=7",
  },
];

const pageSize = 5;

const statusColor = {
  Negotiation: "bg-green-100 text-green-600",
  "Site Visit": "bg-yellow-100 text-yellow-600",
  Inquiry: "bg-blue-100 text-blue-600",
  Closed: "bg-teal-100 text-teal-600",
  Lost: "bg-red-100 text-red-600",
};

export default function AddCustomer() {
    const [openNew, setOpenNew] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteItem, setDeleteItem] = useState(null);

  const totalPages = Math.ceil(customersData.length / pageSize);

  const start = (page - 1) * pageSize;
  const current = customersData.slice(start, start + pageSize);

return (
  <div className="p-3 sm:p-4 md:p-6">

    {/* Header */}
    <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      
      <h2 className="text-base sm:text-lg font-semibold">
        Customer List
      </h2>

<button
  onClick={() => setOpenNew(true)}
  className="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
>
  + Add Customer
</button>

<NewCustomer
  open={openNew}
  onClose={() => setOpenNew(false)}
/>
    </div>


    {/* Table */}
    <div className="mt-4 bg-white rounded-xl shadow-sm overflow-hidden">

      <div className="w-full overflow-x-auto">

        <table className="w-full min-w-[850px]">

          <thead className="bg-gray-100 text-gray-600 text-xs sm:text-sm">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Property</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Budget</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {current.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">

                <td className="p-3 text-sm">{c.id}</td>

                <td className="p-3">
                  <div className="flex items-center gap-2 sm:gap-3">

                    {c.img ? (
                      <img
                        src={c.img}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        {c.name[0]}
                      </div>
                    )}

                    <span className="font-medium text-sm whitespace-nowrap">
                      {c.name}
                    </span>

                  </div>
                </td>

                <td className="p-3 text-sm">{c.type}</td>
                <td className="p-3 text-sm">{c.email}</td>
                <td className="p-3 text-sm">{c.phone}</td>

                <td className="p-3">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${statusColor[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-3 text-sm">{c.budget}</td>
                <td className="p-3 text-sm">{c.date}</td>

                {/* ACTION */}
                <td className="p-3">
                  <div className="flex gap-2">

                    <button className="bg-green-100 text-green-600 p-2 rounded-md hover:bg-green-200">
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => setDeleteItem(c)}
                      className="bg-red-100 text-red-600 p-2 rounded-md hover:bg-red-200"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>


    {/* Pagination */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center mt-4">

      <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
        Showing {start + 1} - {start + current.length} of {customersData.length}
      </p>

      <div className="flex flex-wrap justify-center gap-2">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-2 sm:px-3 py-1 border rounded-md"
        >
          <ChevronLeft size={16} />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-2 sm:px-3 py-1 rounded-md ${
              page === i + 1
                ? "bg-green-500 text-white"
                : "border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-2 sm:px-3 py-1 border rounded-md"
        >
          <ChevronRight size={16} />
        </button>

      </div>
    </div>


{/* DELETE MODAL */}
{deleteItem && (
  <div
    className="
    fixed inset-0 z-50
    flex items-center justify-center
    px-3
    bg-black/30
    backdrop-blur-sm
    transition-opacity duration-300
    "
  >

    <div
      className="
      bg-white
      rounded-xl
      p-5 sm:p-6
      w-full max-w-sm
      text-center
      shadow-xl

      transform
      transition-all
      duration-300
      scale-100
      opacity-100
      "
    >

      {/* icon */}
      <div className="bg-red-100 w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center">
        <Trash2 className="text-red-500" />
      </div>

      {/* title */}
      <h3 className="mt-4 font-semibold text-base sm:text-lg">
        Delete Customer?
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        Are you sure you want to delete this customer?
      </p>

      {/* buttons */}
      <div className="flex justify-center gap-3 mt-5">

        <button
          className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-4 py-2
          rounded-md
          transition-all
          duration-200
          active:scale-95
          "
          onClick={() => setDeleteItem(null)}
        >
          Delete
        </button>

        <button
          onClick={() => setDeleteItem(null)}
          className="
          px-4 py-2
          rounded-md
          hover:bg-gray-100
          transition-all
          duration-200
          "
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}
  </div>
);
}