"use client";
import React, { useState } from "react";
import { projects as initialProjects } from "../../../public/mock-data";

export default function AllProjects() {
  const [projectList, setProjectList] = useState(initialProjects);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjectList(projectList.filter((project) => project.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert("Edit functionality for project id: " + id);
    // Implement edit logic or navigation here
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Project Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Start Date</th>
              <th className="px-6 py-3 text-left">End Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4">{project.name}</td>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{project.status}</td>
                <td className="px-6 py-4">{project.startDate}</td>
                <td className="px-6 py-4">{project.endDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                      onClick={() => handleEdit(project.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                      onClick={() => handleDelete(project.id)}
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
