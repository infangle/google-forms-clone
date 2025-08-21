import { db } from "./db";
import type { Form } from "../types/form";
import { v4 as uuid } from "uuid";

export async function getAllForms(): Promise<Form[]> {
  return db.forms.toArray();
}

export async function getFormById(id: string): Promise<Form | undefined> {
  return db.forms.get(id);
}

export async function createForm(title: string, description?: string): Promise<Form> {
  const form: Form = {
    id: uuid(),
    title,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.forms.add(form);
  return form;
}

export async function updateForm(id: string, updates: Partial<Form>): Promise<void> {
  await db.forms.update(id, { ...updates, updatedAt: new Date() });
}

export async function deleteForm(id: string): Promise<void> {
  await db.forms.delete(id);
}
