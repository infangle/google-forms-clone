// src/data/db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { Form, Question, Response } from '@/types/form';

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
