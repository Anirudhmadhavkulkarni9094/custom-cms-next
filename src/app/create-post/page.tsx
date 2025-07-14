"use client";
import React, { useState } from "react";
import WordPressEditor from "./WordPressEditor";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Post created!\nTitle: ${title}\nContent: ${content}`);
  };

  return (
    <div>
    <WordPressEditor/>
    </div>
  );
}

export default CreatePostPage;