"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, CheckCircle } from "lucide-react";
import clsx from "clsx";
import Select from "react-select";

type Category = {
  id: number;
  label: string;
};

type Tag = {
  id: number;
  label: string;
};

type Post = {
  id: string;
  created_at: string;
  title: string;
  slug: string | null;
  content: string;
  featured_image: string | null;
  publish: boolean;
  category: Category | null;
  tags: Tag[];
};

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Post>>({});
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [postsRes, catRes, tagRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/posts/category"),
        fetch("/api/posts/tag"),
      ]);
      const [postsData, catData, tagData] = await Promise.all([
        postsRes.json(),
        catRes.json(),
        tagRes.json(),
      ]);

      setPosts(postsData);
      setCategoryOptions(catData.data);
      setTagOptions(tagData.data);
    };

    fetchInitialData();
   
  }, []);

   console.log("Initial data fetched");
    console.log("Category options:", categoryOptions);
    console.log("Tag options:", tagOptions);
    
  const handleEdit = (post: Post) => {
    setEditPostId(post.id);
    setEditData({ ...post });
  };

  const handleSave = async () => {
    if (!editPostId) return;

    const payload = {
      title: editData.title,
      content: editData.content,
      featured_image: editData.featured_image,
      publish: editData.publish,
      category_object: editData.category,
      tags_array: editData.tags,
    };

    console.log("Saving post with payload:", payload);
    try {
      const res = await fetch(`/api/posts/${editPostId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update post");

      const updatedPosts = posts.map((post) =>
        post.id === editPostId ? { ...post, ...editData } as Post : post
      );

      setPosts(updatedPosts);
      setEditPostId(null);
      setEditData({});
    } catch (err) {
      console.error(err);
      alert("Failed to update the post.");
    }
  };

  const handleInputChange = (key: keyof Post, value: any) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">📚 All Blog Posts</h1>
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-50 text-left text-gray-600 uppercase tracking-wider border-b">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4">Published</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {editPostId === post.id ? (
                    <input
                      value={editData.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="border px-2 py-1 rounded w-full text-sm"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      {post.title}
                      <Link href={`/all-post/${post.slug}`}>
                        <Eye size={16} className="text-blue-500 hover:scale-110 transition" />
                      </Link>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-600 min-w-[200px]">
                  {editPostId === post.id ? (
                    <Select
                      value={editData.category}
                      onChange={(selected) => handleInputChange("category", selected)}
                      options={categoryOptions}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => String(option.id)}
                    />
                  ) : (
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                      {post.category?.label || "Uncategorized"}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-700 min-w-[250px]">
                  {editPostId === post.id ? (
                    <Select
                      isMulti
                      value={editData.tags || []}
                      onChange={(selected) => handleInputChange("tags", selected)}
                      options={tagOptions}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => String(option.id)}
                    />
                  ) : post.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="italic text-gray-400 text-sm">No tags</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {editPostId === post.id ? (
                    <select
                      value={editData.publish ? "true" : "false"}
                      onChange={(e) =>
                        handleInputChange("publish", e.target.value === "true")
                      }
                      className="border px-2 py-1 rounded text-sm"
                    >
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  ) : (
                    <span
                      className={clsx(
                        "inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded",
                        post.publish
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      )}
                    >
                      {post.publish ? (
                        <>
                          <CheckCircle size={12} /> Published
                        </>
                      ) : (
                        <>Draft</>
                      )}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  {editPostId === post.id ? (
                    <button
                      onClick={handleSave}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-sm text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
