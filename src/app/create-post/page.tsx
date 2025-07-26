"use client";
import React, { useState } from "react";
import WordPressEditor from "./WordPressEditor";
import Select from "react-select";
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";
// Static category and tag data
const availableCategories = [
  {
    _id: "cat1",
    label: "Technology",
    value: "technology",
    description: "All things tech",
    category_slug: "technology",
  },
  {
    _id: "cat2",
    label: "Lifestyle",
    value: "lifestyle",
    description: "Daily habits and routines",
    category_slug: "lifestyle",
  },
  {
    _id: "cat3",
    label: "Health",
    value: "health",
    description: "Wellness and fitness",
    category_slug: "health",
  },
  {
    _id: "cat4",
    label: "Travel",
    value: "travel",
    description: "Travel tips and guides",
    category_slug: "travel",
  },
];

const availableTags = [
  { _id: "1", label: "React", value: "react" },
  { _id: "2", label: "Next.js", value: "nextjs" },
  { _id: "3", label: "TypeScript", value: "typescript" },
];

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<
    typeof availableCategories[0] | null
  >(null);
  const [selectedTags, setSelectedTags] = useState<
    { label: string; value: string }[]
  >([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = availableCategories.find(
      (c) => c.value === e.target.value
    );
    setCategory(selected || null);
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("post-images") // Make sure this bucket exists!
      .upload(fileName, file);

    if (error) {
      console.error("Upload error", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || null;
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  let imageUrl = null;

  if (image) {
    imageUrl = await uploadImage(image);
    if (!imageUrl) {
      alert("Image upload failed");
      setLoading(false);
      return;
    }
  }

  const slug = slugify(title, {
    lower: true,
    strict: true, // removes special characters
    trim: true,
  });

  const { error } = await supabase.from("posts").insert([
    {
      title,
      slug,
      content,
      category: category?.value,
      tags: selectedTags.map((tag) => tag.value),
      featured_image: imageUrl,
    },
  ]);

  if (error) {
    console.error("Insert error:", error.message);
    alert("Failed to publish post");
  } else {
    alert("Blog post created!");
    setTitle("");
    setContent("");
    setImage(null);
    setCategory(null);
    setSelectedTags([]);
  }

  setLoading(false);
};

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT SIDE: Title + Editor */}
        <div className="lg:col-span-2 space-y-6">
          <input
            type="text"
            placeholder="Enter Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-semibold border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-2"
          />

          <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
            <WordPressEditor setContent={setContent} />
          </div>
        </div>

        {/* RIGHT SIDE: Sidebar */}
        <div className="space-y-6">
          {/* Category Dropdown */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              value={category?.value || ""}
              onChange={handleCategoryChange}
            >
              <option disabled value="">
                Select Category
              </option>
              {availableCategories.map((cat) => (
                <option key={cat._id} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Multi-select */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Tags
            </label>
            <Select
              isMulti
              name="tags"
              options={availableTags}
              value={selectedTags}
              onChange={(selected) =>
                setSelectedTags(
                  (selected || []) as { label: string; value: string }[]
                )
              }
              placeholder="Select tags..."
              classNamePrefix="select"
            />
          </div>

          {/* Image Upload */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Featured Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;
