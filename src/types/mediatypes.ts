export type LocalMediaItem = {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
};

export interface MediaDropzoneProps {
  onAdded: (item: LocalMediaItem) => void;
}
