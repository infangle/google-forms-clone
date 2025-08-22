export interface Answer {
  questionId: string;
  value: string | string[]; // string for text/paragraph, string[] for checkbox
}

export interface Response {
  id: string;
  formId: string;
  createdAt: Date;
  answers: Record<string, string>;
  submittedAt: string | Date;
}
