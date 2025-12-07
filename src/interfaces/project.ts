interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  thumbnail: string;
  media: ProjectMedia[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  thumbnail: string;
  media: ProjectMedia[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectData {
  title: string;
  summary: string;
  description: string;
  tags?: string[];
  thumbnail?: string;
  media?: ProjectMedia[];
}
