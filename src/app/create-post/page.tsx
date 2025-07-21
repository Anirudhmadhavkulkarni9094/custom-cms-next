"use client";
import React, { useState } from "react";
import WordPressEditor from "./WordPressEditor";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post created:", { title, content });
    alert(`Post created!\nTitle: ${title}\n\nContent:\n${content}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT SIDE: Title + Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-semibold border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-2"
          />

          {/* WordPress Editor */}
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
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3">
              <option disabled selected>
                Select Category
              </option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
            </select>
          </div>

          {/* Tags Dropdown */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Tags
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3">
              <option disabled selected>
                Select Tag
              </option>
              <option value="react">React</option>
              <option value="nextjs">Next.js</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Featured Image
            </label>
            <input type="file" accept="image/*" className="block w-full" />
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;
