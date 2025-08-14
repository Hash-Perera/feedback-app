interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  thumbnail: string;
  media: ProjectMedia[];
}
