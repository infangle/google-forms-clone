import type { Question } from "./question";

export interface Form {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Question[]; // reference to associated questions
}
