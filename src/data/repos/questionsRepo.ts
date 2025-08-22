import { db } from "../db";
import type { Question } from "../../types/question";
import { v4 as uuid } from "uuid";

// Add a question to a form
export const addQuestionToForm = async (formId: string, questionData: Omit<Question, "id" | "formId">): Promise<Question> => {
  const newQuestion: Question = {
    id: uuid(),
    formId,
    ...questionData,
  };
  await db.questions.add(newQuestion);

  const form = await db.forms.get(formId);
  if (form) {
    form.questions.push(newQuestion);
    await db.forms.put(form);
  }
  return newQuestion;
};

// Delete a question
export const deleteQuestion = async (questionId: string): Promise<void> => {
  const question = await db.questions.get(questionId);
  if (!question) return;

  const form = await db.forms.get(question.formId);
  if (form) {
    form.questions = form.questions.filter(q => q.id !== questionId);
    await db.forms.put(form);
  }

  await db.questions.delete(questionId);
};

// Get all questions for a form
export const getQuestionsByFormId = async (formId: string): Promise<Question[]> => {
  return db.questions.where("formId").equals(formId).toArray();
};
