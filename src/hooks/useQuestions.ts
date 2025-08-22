import { useState } from "react";
import type { Question } from "@/types/question";

export function useQuestions(initialQuestions: Question[] = []) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      formId: "", // Will be set by parent
      text: "",
      type: "text",
      options: [],
      required: false,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuestionAt = (index: number, updatedQuestion: Question) => {
    const updated = [...questions];
    updated[index] = updatedQuestion;
    setQuestions(updated);
  };

  const removeQuestionAt = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    questions,
    setQuestions,
    addQuestion,
    updateQuestionAt,
    removeQuestionAt,
  };
}
