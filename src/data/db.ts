import Dexie from 'dexie';
import type { Table } from "dexie";
import type { Form, Question, Response } from "../types/form";

export class AppDB extends Dexie {
  forms!: Table<Form, string>;
  questions!: Table<Question, string>;
  responses!: Table<Response, string>;

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
