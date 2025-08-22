// src/types/form.ts

export interface Form {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  formId: string;  // link question → form
  text: string;
  type: "text" | "checkbox" | "multiple-choice";
  options?: string[];
  required?: boolean;
}

export interface Response {
  id: string;
  formId: string;
  answers: Record<string, string | string[]>; // key = questionId
  submittedAt: Date;
}
