"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [, forceRender] = useState(0);
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false, // avoids Next.js SSR hydration mismatch warnings
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onTransaction: () => {
      forceRender((n) => n + 1);
    },
    editorProps: {
      attributes: {
        class:
          "bg-white border border-gray-500 border-t-0 rounded-b-lg text-[1.19rem] py-1.5 px-3.5 text-header/90 min-h-100 focus:outline-none prose max-w-none",
      },
    },
  });

  // keep editor content in sync if `content` prop changes externally (e.g. fetched article loads after mount)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div>
      <div className="flex gap-1 bg-white border border-gray-500 rounded-t-lg px-2 py-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded font-bold ${
            editor.isActive("bold")
              ? "bg-header text-white"
              : "bg-gray-100 text-header"
          }`}
        >
          B
        </button>
        <button
          type="button"
          style={{ fontFamily: "Georgia, serif" }}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded italic ${
            editor.isActive("italic")
              ? "bg-header text-white"
              : "bg-gray-100 text-header"
          }`}
        >
          I
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
