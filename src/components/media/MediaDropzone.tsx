"use client";

import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { nanoid } from "nanoid";
import { MediaDropzoneProps } from "@/types/mediatypes";

export default function MediaDropzone({ onAdded }: MediaDropzoneProps) {
  const onDrop = (files: File[]) => {
    files.forEach((file) => {
      onAdded({
        id: nanoid(),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      onDrop(Array.from(e.clipboardData.files));
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
      hover:border-primary transition-colors"
    >
      <input {...getInputProps()} />
      <p className="text-sm text-muted-foreground">
        Drag, click, or paste media
      </p>
    </div>
  );
}
