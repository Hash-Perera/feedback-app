"use client";
import type { Dispatch, SetStateAction } from "react";
import { LocalMediaItem } from "@/types/mediatypes";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import MediaItem from "./MediaItem";

interface Props {
  media: LocalMediaItem[];
  setMedia: Dispatch<SetStateAction<LocalMediaItem[]>>;
  thumbnail?: string | null;
  onSetThumbnail?: (src: string) => void;
  usePreview?: boolean;
}

export default function SortableMediaList({
  media,
  setMedia,
  thumbnail,
  onSetThumbnail,
  usePreview,
}: Props) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        if (!e.over) return;
        const oldIndex = media.findIndex((m) => m.id === e.active.id);
        const newIndex = media.findIndex((m) => m.id === e.over?.id);
        setMedia(arrayMove(media, oldIndex, newIndex));
      }}
    >
      <SortableContext
        items={media.map((m) => m.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-3">
          {media.map((item) => (
            <MediaItem
              key={item.id}
              item={item}
              thumbnail={thumbnail}
              onSetThumbnail={onSetThumbnail}
              usePreview={usePreview}
              onRemove={() =>
                setMedia((prev) => prev.filter((m) => m.id !== item.id))
              }
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
