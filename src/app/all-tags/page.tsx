"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Category = {
  id: string;
  label: string;
  slug: string;
  description: string;
  created_at: string;
};

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios('/api/posts/tag');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📂 All Categories</h1>

      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full text-sm text-left bg-white border">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Slug</th>
              <th className="px-4 py-3 border">Description</th>
              <th className="px-4 py-3 border">Created At</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-gray-50 transition-all"
              >
                <td className="px-4 py-3 border">{category.label}</td>
                <td className="px-4 py-3 border text-gray-600">{category.slug}</td>
                <td className="px-4 py-3 border text-gray-700">{category.description || '—'}</td>
                <td className="px-4 py-3 border text-gray-500">
                  {new Date(category.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border">
                  <button
                    onClick={() => alert(`Delete category ${category.id}`)}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
