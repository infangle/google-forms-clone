  export interface Form {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  
}



export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple-choice' | 'checkbox';
  options?: string[];
}
