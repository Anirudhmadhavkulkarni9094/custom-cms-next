export default function AllPost() {
  const posts = [
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
      author: "Admin",
      date: "2025-07-13",
      categories: ["News"],
      tags: ["update", "release"]
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the content of the second post.",
      author: "Editor",
      date: "2025-07-12",
      categories: ["Tutorial"],
      tags: ["how-to"]
    },
    {
      id: 3,
      title: "Third Post",
      content: "This is the content of the third post.",
      author: "Admin",
      date: "2025-07-10",
      categories: ["News"],
      tags: ["cms", "blog"]
    },
    {
      id: 4,
      title: "Fourth Post",
      content: "A new feature has been released.",
      author: "Contributor",
      date: "2025-07-09",
      categories: ["Release"],
      tags: ["feature", "release"]
    },
    {
      id: 5,
      title: "Fifth Post",
      content: "Tips and tricks for using the CMS.",
      author: "Admin",
      date: "2025-07-08",
      categories: ["Tips"],
      tags: ["cms", "tips"]
    },
    {
      id: 6,
      title: "Sixth Post",
      content: "How to manage categories.",
      author: "Editor",
      date: "2025-07-07",
      categories: ["Tutorial"],
      tags: ["categories", "how-to"]
    },
    {
      id: 7,
      title: "Seventh Post",
      content: "Understanding tags in your blog.",
      author: "Admin",
      date: "2025-07-06",
      categories: ["Guide"],
      tags: ["tags", "guide"]
    },
    {
      id: 8,
      title: "Eighth Post",
      content: "CMS security best practices.",
      author: "Security Team",
      date: "2025-07-05",
      categories: ["Security"],
      tags: ["security", "best-practices"]
    },
    {
      id: 9,
      title: "Ninth Post",
      content: "How to backup your content.",
      author: "Admin",
      date: "2025-07-04",
      categories: ["Maintenance"],
      tags: ["backup", "maintenance"]
    },
    {
      id: 10,
      title: "Tenth Post",
      content: "Meet the new team members.",
      author: "HR",
      date: "2025-07-03",
      categories: ["Announcement"],
      tags: ["team", "announcement"]
    },
    {
      id: 11,
      title: "Eleventh Post",
      content: "CMS roadmap for 2025.",
      author: "Admin",
      date: "2025-07-02",
      categories: ["Roadmap"],
      tags: ["roadmap", "future"]
    },
    {
      id: 12,
      title: "Twelfth Post",
      content: "User feedback highlights.",
      author: "Editor",
      date: "2025-07-01",
      categories: ["Feedback"],
      tags: ["feedback", "users"]
    },
    {
      id: 13,
      title: "Thirteenth Post",
      content: "How to migrate your blog.",
      author: "Admin",
      date: "2025-06-30",
      categories: ["Migration"],
      tags: ["migration", "how-to"]
    }
  ];

  return (
    <div className=" mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 tracking-tight">All Posts</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-5 py-3 border-b font-semibold">Title</th>
              <th className="px-5 py-3 border-b font-semibold">Author</th>
              <th className="px-5 py-3 border-b font-semibold">Categories</th>
              <th className="px-5 py-3 border-b font-semibold">Tags</th>
              <th className="px-5 py-3 border-b font-semibold">Date</th>
              <th className="px-5 py-3 border-b text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr
                key={post.id}
                className={
                  (idx % 2 === 0 ? "bg-white" : "bg-gray-50") +
                  " hover:bg-blue-50 transition duration-150"
                }
              >
                <td className="px-5 py-4 border-b font-medium text-gray-900 whitespace-nowrap">
                  {post.title}
                </td>
                <td className="px-5 py-4 border-b text-gray-700 whitespace-nowrap">
                  {post.author}
                </td>
                <td className="px-5 py-4 border-b text-gray-700 whitespace-nowrap">
                  {post.categories.join(", ")}
                </td>
                <td className="px-5 py-4 border-b text-gray-700 whitespace-nowrap">
                  {post.tags.join(", ")}
                </td>
                <td className="px-5 py-4 border-b text-gray-700 whitespace-nowrap">
                  {post.date}
                </td>
                <td className="px-5 py-4 border-b text-right">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
                      Edit
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-green-100 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition">
                      Quick Edit
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition">
                      Delete
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition">
                      View
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
