// src/types/form.ts

export interface Form {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Question[];
}
export interface Question {
  id: string;
  formId: string;
  text: string;
  type: "text" | "paragraph" | "multiple-choice" | "checkbox" | "dropdown";
  options?: string[]; // For multiple-choice, checkboxes, dropdown
  required: boolean; 
}


export interface Response {
  id: string;
  formId: string;
  answers: Record<string, string | string[]>; // key = questionId
  submittedAt: Date;
}
