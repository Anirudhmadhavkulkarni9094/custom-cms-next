import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export default function WordPressEditor() {
  const [htmlOutput, setHtmlOutput] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] })
    ],
    content: "<h1>Your blog starts here...</h1><p>Start writing your story with rich formatting, images, and links.</p>",
    onUpdate: ({ editor }) => {
      setHtmlOutput(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose lg:prose-xl max-w-none focus:outline-none dark:prose-invert"
      }
    }
  }, [isClient]);

  if (!editor || !isClient) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn">Underline</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn">H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn">H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="btn">H3</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn">1. List</button>
        <button onClick={() => {
          const url = prompt("Enter link URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }} className="btn">Link</button>
        <button onClick={addImage} className="btn">Image</button>
        <button onClick={() => navigator.clipboard.writeText(htmlOutput)} className="btn bg-green-500 text-white">Copy HTML</button>
      </div>

      <div className="border rounded-lg shadow-md p-6 bg-white dark:bg-zinc-900 min-h-[400px]">
        <EditorContent editor={editor} />
      </div>
      <button onClick={()=>{console.log(htmlOutput)}} className="bg-blue-400 rounded-2xl p-2">Publish</button>
    </div>
  );
}

// Tailwind style suggestion (in global CSS or JSX):
// .btn {
//   @apply px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 dark:text-white rounded border border-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 text-sm font-medium transition;
// }
