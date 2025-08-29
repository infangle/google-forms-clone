import { db } from "../db";
import type { Form } from "../../types/form";
import type { Question } from "../../types/question"; // Make sure to import the Question type
import { v4 as uuid } from "uuid";

// CREATE a form
export const createForm = async (formData: { title: string; description?: string }): Promise<Form> => {
  const newForm: Form = {
    id: uuid(),
    title: formData.title,
    description: formData.description || "",
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [],
  };
  await db.forms.add(newForm);
  return newForm;
};

// READ all forms
export const getAllForms = async (): Promise<Form[]> => db.forms.toArray();

// READ by ID
export const getFormById = async (id: string): Promise<Form | undefined> => db.forms.get(id);

// UPDATE
export const updateForm = async (id: string, updatedFields: Partial<Form>): Promise<void> => {
  const existingForm = await db.forms.get(id);
  if (!existingForm) return;
  const updatedForm = {
    ...existingForm,
    ...updatedFields,
    questions: updatedFields.questions ?? existingForm.questions,
    updatedAt: new Date(),
  };
  await db.forms.put(updatedForm);
};

// NEW: Function to add questions to a specific form
export const addQuestionsToForm = async (formId: string, questions: Question[]): Promise<void> => {
  const form = await getFormById(formId);
  if (!form) {
    console.error(`Form with ID ${formId} not found.`);
    return;
  }
  await updateForm(formId, { questions });
};


// DELETE
export const deleteForm = async (id: string): Promise<void> => db.forms.delete(id);