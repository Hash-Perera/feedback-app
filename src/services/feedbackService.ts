import { CreateFeedbackData, Feedback } from "@/interfaces/feedback";

// Anti-spam configuration
const SUBMIT_COOLDOWN_MS = 30000; // 30 seconds
const LAST_SUBMIT_KEY = "feedback_last_submit";

class FeedbackService {
  private storage: Storage;
  private readonly STORAGE_KEY = "customer_feedback";

  constructor() {
    this.storage =
      typeof window !== "undefined" ? localStorage : ({} as Storage);
    this.initializeSeedData();
  }

  private initializeSeedData(): void {
    if (!this.storage.getItem || this.getFeedbacks().length > 0) return;

    const seedData: Feedback[] = [
      {
        id: "1",
        name: "Sarah Chen",
        mobile: "+94771234567",
        email: "sarah.chen@gmail.com",
        projectName: "MBA Dissertation Research",
        feedback:
          "Exceptional support throughout my MBA dissertation. The research guidance was thorough and helped me achieve distinction. Highly professional team with great attention to detail.",
        rating: 5,
        showNamePublic: true,
        createdAt: new Date("2024-01-15T10:30:00Z"),
      },
      {
        id: "2",
        name: "Anonymous",
        mobile: "+94772345678",
        email: "michael.j@company.com",
        projectName: "Statistical Analysis Project",
        feedback:
          "Outstanding statistical analysis work. Complex data sets were handled with expertise and delivered on time. The insights provided were invaluable for our business decisions.",
        rating: 5,
        showNamePublic: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
      },
      {
        id: "3",
        name: "Priya Sharma",
        mobile: "+94773456789",
        email: "priya.sharma@uni.lk",
        projectName: "Undergraduate Thesis",
        feedback:
          "Amazing guidance for my final year project. The team helped me structure my research methodology perfectly. Great communication and very responsive to questions.",
        rating: 5,
        showNamePublic: true,
        createdAt: new Date("2024-02-05T09:45:00Z"),
      },
      {
        id: "4",
        name: "David Wilson",
        mobile: "+94774567890",
        email: "d.wilson@research.org",
        projectName: "Market Research Analysis",
        feedback:
          "Professional and thorough market research analysis. The recommendations provided were actionable and helped shape our product strategy. Excellent value for money.",
        rating: 4,
        showNamePublic: true,
        createdAt: new Date("2024-02-12T16:20:00Z"),
      },
      {
        id: "5",
        name: "Anonymous",
        mobile: "+94775678901",
        email: "lisa.k@business.com",
        projectName: "Financial Modeling",
        feedback:
          "Sophisticated financial modeling work that exceeded expectations. The team understood our requirements perfectly and delivered comprehensive analysis.",
        rating: 5,
        showNamePublic: false,
        createdAt: new Date("2024-02-18T11:30:00Z"),
      },
      {
        id: "6",
        name: "Rajesh Patel",
        mobile: "+94776789012",
        email: "r.patel@startup.lk",
        projectName: "Business Plan Development",
        feedback:
          "Comprehensive business plan that helped secure funding. Professional presentation and thorough market analysis. Highly recommend their consulting services.",
        rating: 5,
        showNamePublic: true,
        createdAt: new Date("2024-02-25T13:00:00Z"),
      },
      {
        id: "7",
        name: "Emma Thompson",
        mobile: "+94777890123",
        email: "emma.t@academic.edu",
        projectName: "Literature Review",
        feedback:
          "Excellent literature review assistance. Helped identify key sources and structure the review logically. Academic writing standards were maintained throughout.",
        rating: 4,
        showNamePublic: true,
        createdAt: new Date("2024-03-02T15:45:00Z"),
      },
      {
        id: "8",
        name: "Kumar Fernando",
        mobile: "+94778901234",
        email: "k.fernando@consulting.lk",
        projectName: "Data Visualization",
        feedback:
          "Creative and insightful data visualization project. Complex datasets were transformed into clear, compelling visual stories. Great collaboration experience.",
        rating: 5,
        showNamePublic: true,
        createdAt: new Date("2024-03-08T08:30:00Z"),
      },
      {
        id: "9",
        name: "Anonymous",
        mobile: "+94779012345",
        email: "alex.r@tech.com",
        projectName: "Feasibility Study",
        feedback:
          "Thorough feasibility study that provided clear recommendations. Professional approach and detailed analysis helped make informed business decisions.",
        rating: 4,
        showNamePublic: false,
        createdAt: new Date("2024-03-15T12:15:00Z"),
      },
      {
        id: "10",
        name: "Nisha Gupta",
        mobile: "+94770123456",
        email: "nisha.g@research.net",
        projectName: "Academic Editing",
        feedback:
          "Outstanding academic editing services. Improved the clarity and flow of my research paper significantly. Attention to detail was exceptional.",
        rating: 5,
        showNamePublic: true,
        createdAt: new Date("2024-03-20T10:00:00Z"),
      },
    ];

    this.storage.setItem(this.STORAGE_KEY, JSON.stringify(seedData));
  }

  getFeedbacks(): Feedback[] {
    try {
      const data = this.storage.getItem?.(this.STORAGE_KEY);
      if (!data) return [];

      const feedbacks = JSON.parse(data);
      return feedbacks.map((f: any) => ({
        ...f,
        createdAt: new Date(f.createdAt),
      }));
    } catch {
      return [];
    }
  }

  async addFeedback(
    data: CreateFeedbackData
  ): Promise<{ success: boolean; message: string }> {
    // Anti-spam check
    const lastSubmit = this.storage.getItem?.(LAST_SUBMIT_KEY);
    if (lastSubmit) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
      if (timeSinceLastSubmit < SUBMIT_COOLDOWN_MS) {
        const remainingTime = Math.ceil(
          (SUBMIT_COOLDOWN_MS - timeSinceLastSubmit) / 1000
        );
        return {
          success: false,
          message: `Please wait ${remainingTime} seconds before submitting again.`,
        };
      }
    }

    try {
      const feedbacks = this.getFeedbacks();
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
      };

      feedbacks.unshift(newFeedback); // Add to beginning for newest first
      this.storage.setItem?.(this.STORAGE_KEY, JSON.stringify(feedbacks));
      this.storage.setItem?.(LAST_SUBMIT_KEY, Date.now().toString());

      return { success: true, message: "Feedback submitted successfully!" };
    } catch (error) {
      return {
        success: false,
        message: "Failed to submit feedback. Please try again.",
      };
    }
  }

  // TODO: Replace with REST API calls when backend is ready
  // async addFeedback(data: CreateFeedbackData): Promise<{ success: boolean; message: string }> {
  //   try {
  //     const response = await fetch('/api/feedback', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //     });
  //
  //     if (!response.ok) throw new Error('Network error');
  //     const result = await response.json();
  //     return { success: true, message: result.message };
  //   } catch (error) {
  //     return { success: false, message: 'Failed to submit feedback. Please try again.' };
  //   }
  // }

  // async getFeedbacks(): Promise<Feedback[]> {
  //   try {
  //     const response = await fetch('/api/feedback');
  //     if (!response.ok) throw new Error('Network error');
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Failed to fetch feedbacks:', error);
  //     return [];
  //   }
  // }
}

export const feedbackService = new FeedbackService();
