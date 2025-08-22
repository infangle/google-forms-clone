export type QuestionType = "text" | "paragraph" | "multiple-choice" | "checkbox";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  formId: string;
  text: string;
  type: QuestionType;
  options?: Option[]; // optional for text/paragraph
  required?: boolean;
}
