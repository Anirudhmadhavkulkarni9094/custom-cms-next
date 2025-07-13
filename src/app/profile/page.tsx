"use client";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Anirudh Madhava",
    bio: "Web Developer & Indie Hacker",
    portfolio: "https://anirudh-kulkarni.com",
    image: "/profile.png",
    links: [
      {
        label: "Fiverr Profile",
        url: "https://www.fiverr.com/s/7YDyaZ4",
      },
      {
        label: "Fiverr Gig – Web App Development",
        url: "https://www.fiverr.com/s/7YDyaZ4",
      },
      {
        label: "Upwork Profile",
        url: "https://www.upwork.com/freelancers/~anirudhdev",
      },
      {
        label: "X (Twitter)",
        url: "https://x.com/anirudh_dev",
      },
      {
        label: "GitHub – @anirudhdev",
        url: "https://github.com/anirudhdev",
      },
    ],
  });

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleLinkChange = (index: number, key: 'label' | 'url', value: string) => {
    const updatedLinks = [...profile.links];
    updatedLinks[index][key] = value;
    setProfile({ ...profile, links: updatedLinks });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.image}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 shadow"
          />
          {isEditing ? (
            <>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-2xl font-bold text-center border-b border-gray-300"
              />
              <input
                type="text"
                value={profile.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="text-gray-600 mt-2 text-center border-b border-gray-200"
              />
              <input
                type="text"
                value={profile.portfolio}
                onChange={(e) => handleChange("portfolio", e.target.value)}
                className="text-blue-600 mt-2 text-center border-b border-blue-200"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <p className="text-gray-600 mt-1">{profile.bio}</p>
              <a
                href={profile.portfolio}
                className="text-blue-600 mt-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.portfolio}
              </a>
            </>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Social Links
          </h2>
          <ul className="space-y-3">
            {profile.links.map((link, index) => (
              <li key={index}>
                {isEditing ? (
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) =>
                        handleLinkChange(index, "label", e.target.value)
                      }
                      className="w-full border rounded p-1"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(index, "url", e.target.value)
                      }
                      className="w-full border rounded p-1"
                    />
                  </div>
                ) : (
                  <a
                    href={link.url}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
