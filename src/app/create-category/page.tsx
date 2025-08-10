"use client";
import { useState } from "react";
import slugify from "slugify";
import axios from "axios";

export default function CreateCategory() {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!label.trim()) {
      setError("Category name is required.");
      return;
    }

    const slug = slugify(label, { lower: true, strict: true });

    try {
      setLoading(true);
      const response = await axios.post("/api/posts/category", {
        label,
        slug,
        description,
      });

      if (response.status === 200) {
        setSuccess("Category created successfully!");
        setLabel("");
        setDescription("");
      }
    } catch (err) {
      setError("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white border rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">➕ Create New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Health, Travel, Tech"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            type="text"
            value={slugify(label || "", { lower: true, strict: true })}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Brief description of this category..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>

        {success && <p className="text-green-600 mt-2">{success}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
