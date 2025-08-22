// src/data/db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { Form } from '@/types/form';
import type { Question } from '@/types/question';
import type { Response } from '@/types/response';

export class AppDB extends Dexie {
  // Tables
  forms!: Table<Form, string>;
  questions!: Table<Question, string>;
  responses!: Table<Response, string>;

  constructor() {
    super('FormsAppDB');

    // Define tables and indexes
    this.version(1).stores({
      forms: 'id, title, createdAt, updatedAt',
      questions: 'id, formId, text, type',
      responses: 'id, formId, createdAt',
    });
  }
}

// Singleton DB instance
export const db = new AppDB();
