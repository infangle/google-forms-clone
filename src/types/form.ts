export interface Form {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple-choice' | 'checkbox';
  options?: string[];
}