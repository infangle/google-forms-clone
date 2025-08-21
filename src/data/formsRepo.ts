import { db } from "./db";
import type { Form } from "../types/form";
import { v4 as uuid } from "uuid";

export const createForm = async (formData: { title: string; description?: string }): Promise<Form> => {
  const newForm: Form = {
    id: uuid(),
    title: formData.title,
    description: formData.description || "",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.forms.add(newForm); // only 1 argument
  return newForm;
};


// READ all forms
export const getAllForms = async (): Promise<Form[]> => {
  return db.forms.toArray();
};

// READ a single form by ID
export const getFormById = async (id: string): Promise<Form | undefined> => {
  return db.forms.get(id);
};

// UPDATE a form
export const updateForm = async (id: string, updatedFields: Partial<Form>): Promise<void> => {
  await db.forms.update(id, updatedFields);
};

// DELETE a form
export const deleteForm = async (id: string): Promise<void> => {
  await db.forms.delete(id);
};
