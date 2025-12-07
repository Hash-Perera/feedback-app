import { CreateProjectData, Project } from "@/interfaces/project";

class ProjectService {
  async addProject(
    data: CreateProjectData
  ): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        return { success: false, message: result?.message || "Submit failed." };
      }
      return { success: true, message: result?.message || "Submitted." };
    } catch {
      return {
        success: false,
        message: "Failed to submit feedback. Please try again.",
      };
    }
  }

  // Optional if you need to list projects
  async getProjects(): Promise<Project[]> {
    try {
      const res = await fetch("/api/projects", { method: "GET" });
      if (!res.ok) throw new Error("Network error");

      const data = await res.json();

      // 🔥 Add this transform to ensure each item has an `id`
      return data.map((item: any) => ({
        ...item,
        id: item.id || item._id || crypto.randomUUID(), // fallback if needed
      }));
    } catch (e) {
      console.error("Failed to fetch projects:", e);
      return [];
    }
  }
}

export const projectService = new ProjectService();
