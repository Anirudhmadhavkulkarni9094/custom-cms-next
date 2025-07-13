"use client";
import React, { useState } from "react";
import { testimonials as initialTestimonials } from "../../../public/mock-data";

export default function AllTestimonials() {
  const [testimonialList, setTestimonialList] = useState(initialTestimonials);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonialList(testimonialList.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert("Edit functionality for testimonial id: " + id);
    // Implement edit logic or navigation here
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">All Testimonials</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Content</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonialList.map((testimonial) => (
              <tr key={testimonial.id} className="border-b">
                <td className="px-6 py-4">{testimonial.id}</td>
                <td className="px-6 py-4">{testimonial.name}</td>
                <td className="px-6 py-4">{testimonial.message}</td>
                <td className="px-6 py-4">{testimonial.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                      onClick={() => handleEdit(testimonial.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
