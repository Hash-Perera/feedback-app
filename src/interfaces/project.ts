interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export type ProjectType = "Mobile" | "Web";

export interface ProjectItem {
  id: string;
  type: ProjectType;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  thumbnail: string;
  media: ProjectMedia[];
}

export interface Project {
  id: string;
  type: ProjectType;
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
  type: ProjectType;
  title: string;
  summary: string;
  description: string;
  tags?: string[];
  thumbnail?: string;
  media?: ProjectMedia[];
}
