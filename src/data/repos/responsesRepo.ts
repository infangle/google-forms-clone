import { db } from "../db";
import type { Response } from "../../types/response";
import { v4 as uuid } from "uuid";

// Submit a response
export const submitResponse = async (formId: string, answers: Response["answers"]): Promise<Response> => {
  const newResponse: Response = {
    id: uuid(),
    formId,
    createdAt: new Date(),
    answers,
    submittedAt: new Date()
  };
  await db.responses.add(newResponse);
  return newResponse;
};

// Get all responses for a form
export const getResponsesByFormId = async (formId: string): Promise<Response[]> => {
  return db.responses.where("formId").equals(formId).toArray();
};

// Get a specific response
export const getResponseById = async (id: string): Promise<Response | undefined> => {
  return db.responses.get(id);
};

// Delete a response
export const deleteResponse = async (id: string): Promise<void> => {
  await db.responses.delete(id);
};
