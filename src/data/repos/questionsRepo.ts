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

// Update a question
export const updateQuestion = async (updatedQuestion: Question): Promise<void> => {
  const existingQuestion = await db.questions.get(updatedQuestion.id);
  if (!existingQuestion) return;

  await db.questions.put(updatedQuestion);

  const form = await db.forms.get(updatedQuestion.formId);
  if (form) {
    const updatedQuestions = form.questions.map(q =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    form.questions = updatedQuestions;
    await db.forms.put(form);
  }
};
