import { v4 as uuid } from "uuid";
import type { Question, Option } from "@/types/question";
import { useState, useEffect, type ChangeEvent } from "react";

interface QuestionEditorProps {
  question: Question;
  index: number;
  // We'll pass the dispatch function and action types as props
  dispatch: React.Dispatch<any>;
  ACTION_TYPES: any;
}

export default function QuestionEditor({
  question,
  index,
  dispatch,
  ACTION_TYPES,
}: QuestionEditorProps) {
  const [errors, setErrors] = useState({
    text: "",
    options: [] as string[],
  });

  useEffect(() => {
    let hasTextError = false;
    let hasOptionsError = false;

    // Validate question text
    if (!question.text.trim()) {
      hasTextError = true;
    }

    // Validate options for specific question types
    if (
      question.type === "multiple-choice" ||
      question.type === "checkbox"
    ) {
      // Check for a minimum of one option
      if (!question.options || question.options.length === 0) {
        hasOptionsError = true;
      } else {
        // Check if any option text is empty
        if (question.options.some((opt) => !opt.text.trim())) {
          hasOptionsError = true;
        }
      }
    }

    // Calculate the overall validity of the question
    const isValid = !hasTextError && !hasOptionsError;

    // Dispatch the UPDATE_QUESTION action to update the state
    dispatch({
      type: ACTION_TYPES.UPDATE_QUESTION,
      payload: { updatedQuestion: question, isValid: isValid },
    });

    // Update the local error state to display messages in the UI
    setErrors({
      text: hasTextError ? "Question text cannot be empty." : "",
      options: hasOptionsError
        ? ["This question requires at least one valid option."]
        : [],
    });
  }, [question, dispatch, ACTION_TYPES]);

  const handleAddOption = () => {
    const newOption: Option = { id: uuid(), text: "" };
    const updatedOptions = question.options
      ? [...question.options, newOption]
      : [newOption];
    dispatch({
      type: ACTION_TYPES.UPDATE_QUESTION,
      payload: { updatedQuestion: { ...question, options: updatedOptions }, isValid: false },
    });
  };

  const handleOptionChange = (
    idx: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!question.options) return;
    const value = e.target.value;
    const updatedOptions = question.options.map((opt, i) =>
      i === idx ? { ...opt, text: value } : opt
    );
    dispatch({
      type: ACTION_TYPES.UPDATE_QUESTION,
      payload: { updatedQuestion: { ...question, options: updatedOptions }, isValid: false },
    });
  };

  const handleRemoveOption = (idx: number) => {
    if (!question.options) return;
    const updatedOptions = question.options.filter((_, i) => i !== idx);
    dispatch({
      type: ACTION_TYPES.UPDATE_QUESTION,
      payload: { updatedQuestion: { ...question, options: updatedOptions }, isValid: false },
    });
  };

  const handleTypeChange = (newType: Question["type"]) => {
    let updatedOptions: Option[] | undefined = undefined;
    if (newType === "multiple-choice" || newType === "checkbox") {
      updatedOptions =
        question.options && question.options.length > 0
          ? question.options
          : [{ id: uuid(), text: "" }];
    }
    dispatch({
      type: ACTION_TYPES.UPDATE_QUESTION,
      payload: { updatedQuestion: { ...question, type: newType, options: updatedOptions }, isValid: false },
    });
  };

  return (
    <div className="border p-4 mb-2 rounded">
      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: ACTION_TYPES.REMOVE_QUESTION,
              payload: { questionId: question.id },
            })
          }
          className="text-red-500 px-2 py-1 rounded hover:text-red-500 hover:underline focus:outline-none"
        >
          Remove Question
        </button>
      </div>

      <label className="block mb-1">
        Question {index + 1}:
        <input
          type="text"
          value={question.text}
          onChange={(e) =>
            dispatch({
              type: ACTION_TYPES.UPDATE_QUESTION,
              payload: {
                updatedQuestion: { ...question, text: e.target.value },
                isValid: false,
              },
            })
          }
          className="border p-1 w-full mt-1"
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">{errors.text}</p>
        )}
      </label>
      <label className="flex justify-end items-center mb-1 gap-2 w-full">
        Required
        <input
          type="checkbox"
          checked={question.required}
          onChange={(e) =>
            dispatch({
              type: ACTION_TYPES.UPDATE_QUESTION,
              payload: {
                updatedQuestion: { ...question, required: e.target.checked },
                isValid: false,
              },
            })
          }
          className=""
        />
      </label>

      <label className="block mb-1">
        Type:
        <select
          value={question.type}
          onChange={(e) =>
            handleTypeChange(e.target.value as Question["type"])
          }
          className="border p-1 w-full mt-1"
        >
          <option value="text">Text</option>
          <option value="paragraph">Paragraph</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </label>

      {(question.type === "multiple-choice" ||
        question.type === "checkbox") && (
        <div className="mt-2">
          <p className="font-semibold mb-1">Options:</p>
          {errors.options.length > 0 && (
            <p className="text-red-500 text-sm mb-1">{errors.options[0]}</p>
          )}
          {question.options?.map((opt, idx) => (
            <div key={opt.id} className="flex flex-col items-start mb-1">
              <div className="flex w-full items-center">
                <input
                  type="text"
                  value={opt.text}
                  onChange={(e) => handleOptionChange(idx, e)}
                  className="border p-1 w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(idx)}
                  className="ml-2 text-red-500 px-2 py-1 rounded hover:text-red-500 hover:underline focus:outline-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="mt-1 text-blue-400 px-2 py-1 rounded hover:text-blue-500 hover:underline focus:outline-none"
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}