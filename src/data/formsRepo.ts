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
    questions: [], // initialize questions array
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
  const existingForm = await db.forms.get(id);
  if (!existingForm) return;

  // merge questions if provided
  const updatedForm = {
    ...existingForm,
    ...updatedFields,
    questions: updatedFields.questions ?? existingForm.questions,
    updatedAt: new Date(),
  };

  await db.forms.put(updatedForm);
};

// DELETE
export const deleteForm = async (id: string): Promise<void> => {
  await db.forms.delete(id);
};

// Add a question to a form
export const addQuestionToForm = async (formId: string, questionData: Omit<Question, "id">) => {
  const form = await db.forms.get(formId);
  if (!form) throw new Error("Form not found");

  const newQuestion: Question = {
    id: uuid(),
    ...questionData,
    formId,
  };

  form.questions.push(newQuestion);
  await db.forms.put(form);
  await db.questions.add(newQuestion);
};

// Delete question from form
export const deleteQuestionFromForm = async (formId: string, questionId: string) => {
  const form = await db.forms.get(formId);
  if (!form) throw new Error("Form not found");

  form.questions = form.questions.filter((q) => q.id !== questionId);
  await db.forms.put(form);
  await db.questions.delete(questionId);
};
