"use client";
import React, { useEffect, useState } from "react";
import WordPressEditor from "./WordPressEditor";
import Select from "react-select";
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";

type Category = {
  id: string;
  label: string;
  value: string;
  description: string;
  category_slug: string;
};

type Tag = {
  id: string;
  label: string;
  value: string;
};

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔽 Fetch categories and tags on load
  useEffect(() => {
    const fetchData = async () => {
      const [catRes, tagRes] = await Promise.all([
        fetch("/api/posts/category"),
        fetch("/api/posts/tag"),
      ]);

      const categoryData = await catRes.json();
      const tagData = await tagRes.json();
console.log("Category data:", categoryData);
      console.log("Tag data:", tagData);
      setCategories(
        categoryData.data.map((cat: any) => ({
          id: cat.id,
          label: cat.label,
          value: cat.value,
          description: cat.description,
          category_slug: cat.category_slug,
        }))
      );

      setTags(
        tagData.data.map((tag: any) => ({
          id: tag.id,
          label: tag.label,
          value: tag.value,
        }))
      );
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find((c) => c.value === e.target.value);
    setCategory(selected || null);
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("post-images")
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

  try {
    let imageUrl = null;

    // Upload image if selected
    if (image) {
      imageUrl = await uploadImage(image);
      if (!imageUrl) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }
    }

    const slug = slugify(title, { lower: true, strict: true, trim: true });

    // Step 1: Insert into `posts` table
    const { data: postData, error: postError } = await supabase.from("posts").insert([
      {
        title,
        slug,
        content,
        featured_image: imageUrl,
        publish: true, // or use a publish state
        category_id: category?.id,
      },
    ]).select(); // select() to return inserted row(s)

    if (postError || !postData || postData.length === 0) {
      console.error("Insert error:", postError?.message);
      alert("Failed to publish post");
      setLoading(false);
      return;
    }

    const postId = postData[0].id;

    // Step 2: Insert into `post_tags` join table
    const tagInserts = selectedTags.map((tag) => ({
      post_id: postId,
      tag_id: tag.id,
    }));

    if (tagInserts.length > 0) {
      const { error: tagError } = await supabase.from("post_tag").insert(tagInserts);
      if (tagError) {
        console.error("Tag insert error:", tagError.message);
        alert("Post saved but failed to attach tags");
      }
    }

    // ✅ Success
    alert("Blog post created!");
    setTitle("");
    setContent("");
    setCategory(null);
    setSelectedTags([]);
    setImage(null);
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong");
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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.value}>
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
              options={tags}
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
