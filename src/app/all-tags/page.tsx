
"use client";
import React, { useState } from "react";
import { tags as initialTags } from "../../../public/mock-data";

export default function AllTags() {
  const [tagList, setTagList] = useState(initialTags);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      setTagList(tagList.filter((tag) => tag.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert("Edit functionality for tag id: " + id);
    // Implement edit logic or navigation here
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Tags</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-5 py-3 border-b font-semibold">Name</th>
              <th className="px-5 py-3 border-b font-semibold">Description</th>
              <th className="px-5 py-3 border-b font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tagList.map((tag, idx) => (
              <tr key={tag.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-5 py-4 border-b font-medium text-gray-900 whitespace-nowrap">{tag.name}</td>
                <td className="px-5 py-4 border-b text-gray-700">{tag.description}</td>
                <td className="px-5 py-4 border-b text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                      onClick={() => handleEdit(tag.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                      onClick={() => handleDelete(tag.id)}
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
