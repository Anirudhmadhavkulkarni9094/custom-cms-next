"use client"
import React, { useState } from 'react'
import { categories as initialCategories } from '../../../public/mock-data'

function Page() {
  const [categoryList, setCategoryList] = useState(initialCategories);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategoryList(categoryList.filter((cat) => cat.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert('Edit functionality for category id: ' + id);
    // Implement edit logic or navigation here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-5 py-3 border-b font-semibold">Name</th>
              <th className="px-5 py-3 border-b font-semibold">Description</th>
              <th className="px-5 py-3 border-b font-semibold">Created</th>
              <th className="px-5 py-3 border-b font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category, idx) => (
              <tr key={category.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-5 py-4 border-b font-medium text-gray-900 whitespace-nowrap">{category.name}</td>
                <td className="px-5 py-4 border-b text-gray-700">{category.description}</td>
                <td className="px-5 py-4 border-b text-gray-500 whitespace-nowrap">{category.created}</td>
                <td className="px-5 py-4 border-b text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                      onClick={() => handleEdit(category.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                      onClick={() => handleDelete(category.id)}
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
  )
}

export default Page