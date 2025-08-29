import { useNavigate } from "react-router-dom";
import { createForm } from "@/data/repos/formsRepo";
import QuestionEditor from "@/components/forms/QuestionEditor";
import { useQuestions } from "@/hooks/useQuestions";
import { useState } from "react";
import React from "react";

export default function CreateFormPage() {
  const navigate = useNavigate();

  // 1. Destructure dispatch and ACTION_TYPES from the hook
  const { questions, addQuestion, areQuestionsValid, dispatch, ACTION_TYPES } = useQuestions();

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    errors: {
      title: "",
      description: ""
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: ""
      }
    }));
  };

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors = { title: "", description: "" };

    if (!formState.title.trim()) {
      newErrors.title = "Form title cannot be empty.";
      hasError = true;
    }

    if (!areQuestionsValid) {
        alert("Please correct the errors in your questions before submitting.");
        return;
    }

    if (hasError) {
      setFormState(prevState => ({
        ...prevState,
        errors: newErrors
      }));
      return;
    }

    const form = await createForm({ title: formState.title, description: formState.description });
    navigate(`/forms/${form.id}/edit`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Form</h1>

      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="text-green-500 px-2 py-1 rounded hover:text-green-500 hover:underline focus:outline-none"
        >
          Create Form
        </button>
      </div>

      <label className="block mb-2">
        Title:
        <input
          type="text"
          placeholder="Form title"
          className="border p-2 w-full mt-1"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
        {formState.errors.title && <p className="text-red-500 text-sm mt-1">{formState.errors.title}</p>}
      </label>

      <label className="block mb-4">
        Description:
        <textarea
          placeholder="Form description"
          className="border p-2 w-full mt-1"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
        {formState.errors.description && <p className="text-red-500 text-sm mt-1">{formState.errors.description}</p>}
      </label>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {questions.map((q, index) => (
        <QuestionEditor
          key={q.id}
          question={q}
          index={index}
          // 2. Pass dispatch and ACTION_TYPES down as props
          dispatch={dispatch}
          ACTION_TYPES={ACTION_TYPES}
        />
      ))}

      <button
        type="button"
        onClick={addQuestion} // This function is now just a wrapper for a dispatch call
        className="mt-1 text-blue-400 px-2 py-1 rounded hover:text-blue-500 hover:underline focus:outline-none"
      >
        Add Question
      </button>
    </div>
  );
}