// src/data/formsRepo.ts

import { db } from "./db";
import type { Form, Question } from "../types/form";
import { v4 as uuid } from "uuid";

// CREATE a form
export const createForm = async (formData: { title: string; description?: string }): Promise<Form> => {
  const newForm: Form = {
    id: uuid(),
    title: formData.title,
    description: formData.description || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.forms.add(newForm);
  return newForm;
};

// READ all forms
export const getAllForms = async (): Promise<Form[]> => {
  return db.forms.toArray();
};

// READ by ID
export const getFormById = async (id: string): Promise<Form | undefined> => {
  return db.forms.get(id);
};

// UPDATE
export const updateForm = async (id: string, updatedFields: Partial<Form>): Promise<void> => {
  await db.forms.update(id, updatedFields);
};

// DELETE
export const deleteForm = async (id: string): Promise<void> => {
  await db.forms.delete(id);
};

// Add a question
export const addQuestion = async (question: Question) => {
  await db.questions.add(question);
};

// Delete question
export const deleteQuestion = async (id: string) => {
  await db.questions.delete(id);
};
