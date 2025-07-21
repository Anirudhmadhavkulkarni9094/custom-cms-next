import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export default function WordPressEditor({
  setContent,
}: {
  setContent: (content: string) => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const [htmlOutput, setHtmlOutput] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link.configure({ openOnClick: false }),
        Image,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content:
        "<h1>Your blog starts here...</h1><p>Start writing your story.</p>",
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        setHtmlOutput(html);
        setContent(html); // Always update parent
      },
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class:
            "prose lg:prose-xl max-w-none focus:outline-none dark:prose-invert",
        },
      },
    },
    [isClient]
  );

  if (!editor || !isClient) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = prompt("Enter link URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const btnBase =
    "px-3 py-1.5 rounded border text-sm font-medium transition shadow-sm";
  const btnDefault =
    "bg-gray-100 dark:bg-zinc-800 dark:text-white border-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700";
  const btnActive = "bg-blue-600 text-white border-blue-700";

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 rounded-md bg-white border border-gray-200 shadow-sm">
        {/* Basic Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btnBase} ${
            editor.isActive("bold") ? btnActive : btnDefault
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btnBase} ${
            editor.isActive("italic") ? btnActive : btnDefault
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${btnBase} ${
            editor.isActive("underline") ? btnActive : btnDefault
          }`}
        >
          U
        </button>

        {/* Headings */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${btnBase} ${
            editor.isActive("heading", { level: 1 }) ? btnActive : btnDefault
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${btnBase} ${
            editor.isActive("heading", { level: 2 }) ? btnActive : btnDefault
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${btnBase} ${
            editor.isActive("heading", { level: 3 }) ? btnActive : btnDefault
          }`}
        >
          H3
        </button>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btnBase} ${
            editor.isActive("bulletList") ? btnActive : btnDefault
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btnBase} ${
            editor.isActive("orderedList") ? btnActive : btnDefault
          }`}
        >
          1. List
        </button>

        {/* Link & Image */}
        <button
          type="button"
          onClick={addLink}
          className={`${btnBase} ${btnDefault}`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={addImage}
          className={`${btnBase} ${btnDefault}`}
        >
          Image
        </button>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${btnBase} ${
            editor.isActive({ textAlign: "left" }) ? btnActive : btnDefault
          }`}
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${btnBase} ${
            editor.isActive({ textAlign: "center" }) ? btnActive : btnDefault
          }`}
        >
          Center
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${btnBase} ${
            editor.isActive({ textAlign: "right" }) ? btnActive : btnDefault
          }`}
        >
          Right
        </button>

        {/* Copy HTML */}
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(htmlOutput)}
          className={`${btnBase} bg-green-500 text-white border-green-600 hover:bg-green-600`}
        >
          Copy HTML
        </button>
      </div>

      {/* Editor */}
      <div className="border rounded-lg shadow-md p-6 bg-white min-h-[400px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
