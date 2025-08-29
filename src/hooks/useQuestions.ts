import { useReducer } from "react";
import type { Question } from "@/types/question";

// Define the shape of our state
interface QuestionsState {
  questions: Question[];
  questionErrors: Record<string, boolean>;
}

// Define action types to prevent typos
const ACTION_TYPES = {
  ADD_QUESTION: "ADD_QUESTION",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  REMOVE_QUESTION: "REMOVE_QUESTION",
  SET_QUESTIONS: "SET_QUESTIONS", 
};

// Our reducer function
function questionsReducer(state: QuestionsState, action: any): QuestionsState {
  switch (action.type) {
    case ACTION_TYPES.ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload.newQuestion],
      };

    case ACTION_TYPES.UPDATE_QUESTION:
      const { updatedQuestion, isValid } = action.payload;
      const updatedQuestions = state.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      );

      return {
        ...state,
        questions: updatedQuestions,
        questionErrors: {
          ...state.questionErrors,
          [updatedQuestion.id]: !isValid,
        },
      };

    case ACTION_TYPES.REMOVE_QUESTION:
      const questionIdToRemove = action.payload.questionId;
      const filteredQuestions = state.questions.filter(
        (q) => q.id !== questionIdToRemove
      );

      const newErrors = { ...state.questionErrors };
      delete newErrors[questionIdToRemove];

      return {
        ...state,
        questions: filteredQuestions,
        questionErrors: newErrors,
      };

      case ACTION_TYPES.SET_QUESTIONS:
    const initialQuestions = action.payload.questions;
    const initialErrors: Record<string, boolean> = {};
    initialQuestions.forEach((q: Question) => initialErrors[q.id] = false);

    return {
      questions: initialQuestions,
      questionErrors: initialErrors,
    };

    default:
      return state;
  }
}

export function useQuestions(initialQuestions: Question[] = []) {
  const initialQuestionErrors: Record<string, boolean> = {};
  initialQuestions.forEach((q) => {
    initialQuestionErrors[q.id] = false;
  });

  const [state, dispatch] = useReducer(questionsReducer, {
    questions: initialQuestions,
    questionErrors: initialQuestionErrors,
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      formId: "",
      text: "",
      type: "text",
      options: [],
      required: false,
    };
    dispatch({
      type: ACTION_TYPES.ADD_QUESTION,
      payload: { newQuestion },
    });
  };

  const removeQuestionAt = (index: number) => {
    const questionIdToRemove = state.questions[index].id;
    dispatch({
      type: ACTION_TYPES.REMOVE_QUESTION,
      payload: { questionId: questionIdToRemove },
    });
  };

  const areQuestionsValid = Object.values(state.questionErrors).every(
    (hasError) => !hasError
  );

  return {
    questions: state.questions,
    addQuestion,
    removeQuestionAt,
    areQuestionsValid,
    dispatch, // Return the dispatch function for a new component to use
    ACTION_TYPES, // Return the action types for convenience
  };
}