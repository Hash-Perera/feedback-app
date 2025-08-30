import { CreateFeedbackData, Feedback } from "@/interfaces/feedback";

class FeedbackService {
  async addFeedback(
    data: CreateFeedbackData
  ): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch("/api/feedback", {
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

  // Optional if you need to list feedbacks
  async getFeedbacks(): Promise<Feedback[]> {
    try {
      const res = await fetch("/api/feedback", { method: "GET" });
      if (!res.ok) throw new Error("Network error");
      return await res.json();
    } catch (e) {
      console.error("Failed to fetch feedbacks:", e);
      return [];
    }
  }
}

export const feedbackService = new FeedbackService();
