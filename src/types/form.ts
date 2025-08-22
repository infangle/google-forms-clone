export interface Form {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  formId: string;
  type: "text" | "checkbox" | "multiple-choice" | "dropdown" | "paragraph";
  text: string;
  options?: string[];
}

export interface Response {
  id: string;
  formId: string;
  answers: Record<string, string | string[]>; // questionId -> answer(s)
  submittedAt: Date;
}
