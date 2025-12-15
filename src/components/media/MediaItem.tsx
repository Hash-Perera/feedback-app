"use client";

import { X, Star } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: any;
  onRemove: () => void;
  thumbnail?: string | null;
  onSetThumbnail?: (src: string) => void;
  usePreview?: boolean;
}

export default function MediaItem({
  item,
  onRemove,
  thumbnail,
  onSetThumbnail,
  usePreview,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // ✅ THIS IS THE FIX
  const displaySrc = usePreview ? item.preview : item.src;
  const isThumbnail = thumbnail === displaySrc;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative rounded-xl overflow-hidden border cursor-grab"
    >
      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-1"
      >
        <X size={14} />
      </button>

      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onSetThumbnail?.(displaySrc)}
        className={`absolute top-2 left-2 z-10 rounded-full p-1 ${
          isThumbnail ? "bg-yellow-400 text-black" : "bg-black/60 text-white"
        }`}
      >
        <Star size={14} />
      </button>

      {/* Media preview */}
      {item.type === "image" ? (
        <img
          src={displaySrc}
          alt="Preview"
          className="h-32 w-full object-cover"
        />
      ) : (
        <video
          src={displaySrc}
          className="h-32 w-full object-cover"
          muted
          autoPlay
          loop
          playsInline
        />
      )}
    </div>
  );
}
