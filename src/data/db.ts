import Dexie from "dexie";
import type { Table } from "dexie";   
import type { Form } from "../types/form"; 

export interface Question {
  id: string;
  formId: string;
  type: "short" | "paragraph" | "multipleChoice" | "checkbox" | "dropdown";
  text: string;
  options?: string[];
}

export interface Response {
  id: string;
  formId: string;
  answers: Record<string, string | string[]>; // questionId -> answer(s)
  submittedAt: Date;
}

export class AppDB extends Dexie {
  forms!: Table<Form>;
  questions!: Table<Question>;
  responses!: Table<Response>;

  constructor() {
    super("AppDB");
    this.version(1).stores({
      forms: "id, title, createdAt",
      questions: "id, formId",
      responses: "id, formId, submittedAt"
    });
  }
}

export const db = new AppDB();
