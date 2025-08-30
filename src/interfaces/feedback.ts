export interface Feedback {
  id: string;
  name: string;
  mobile: string;
  email: string;
  projectName: string;
  feedback: string;
  rating: number;
  createdAt: Date;
}

export interface CreateFeedbackData {
  name: string;
  mobile: string;
  email: string;
  projectName: string;
  feedback: string;
  rating: number;
}
