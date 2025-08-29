import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Form } from "@/types/form";
import { getFormById, updateForm } from "@/data/repos";
import QuestionEditor from "@/components/forms/QuestionEditor";
import { useQuestions } from "@/hooks/useQuestions";
import FormPreviewModal from "@/components/forms/FormPreviewModal";
import React from "react";

export default function EditFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);
  
  // 1. Add state to control modal visibility and form field data
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    errors: {
      title: "",
      description: "",
    },
  });

  // Destructure dispatch and ACTION_TYPES from the hook
  const { questions, addQuestion, areQuestionsValid, dispatch, ACTION_TYPES } = useQuestions();

  useEffect(() => {
    async function loadForm() {
      if (!id) return;
      const data = await getFormById(id);
      if (data) {
        setForm(data); // Set the full form object
        setFormState({
          title: data.title,
          description: data.description ?? "",
          errors: { title: "", description: "" },
        });
        dispatch({ type: ACTION_TYPES.SET_QUESTIONS, payload: { questions: data.questions ?? [] } });
      } else {
        setForm(null);
      }
    }
    loadForm();
  }, [id, dispatch, ACTION_TYPES]);

  if (!form) return <div>Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  
  const handleSave = async () => {
    let hasError = false;
    const newErrors = { title: "", description: "" };

    if (!formState.title.trim()) {
      newErrors.title = "Form title cannot be empty.";
      hasError = true;
    }

    if (!areQuestionsValid) {
      alert("Please fix all errors in your questions before saving.");
      return;
    }

    if (hasError) {
      setFormState((prevState) => ({ ...prevState, errors: newErrors }));
      return;
    }

    const updatedFormData = {
      ...form,
      title: formState.title,
      description: formState.description,
      questions,
    };
    await updateForm(form.id, updatedFormData);
    navigate("/forms");
  };

  const goToPreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>

      {/* Form Title */}
      <label className="block mb-2 font-poppins font-normal">
        Title
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          className="border border-gray-200 rounded-md p-2 w-full mt-1"
        />
        {formState.errors.title && <p className="text-red-500 text-sm mt-1">{formState.errors.title}</p>}
      </label>

      {/* Form Description */}
      <label className="block mb-4">
        Description
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          className="border border-gray-200 rounded-md p-2 w-full mt-1"
        />
        {formState.errors.description && <p className="text-red-500 text-sm mt-1">{formState.errors.description}</p>}
      </label>

      {/* Questions Section */}
      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {questions.map((q, index) => (
        <QuestionEditor
          key={q.id}
          question={q}
          index={index}
          dispatch={dispatch}
          ACTION_TYPES={ACTION_TYPES}
        />
      ))}

      {/* Add Question Button */}
      <div className="mb-4">
        <div className="group inline-block">
          <button
            type="button"
            onClick={addQuestion}
            className="relative w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center
                       hover:border-blue-400 transition"
          >
            <span className="text-gray-600 text-2xl select-none">+</span>
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Add question
            </span>
          </button>
        </div>
      </div>

      {/* Save and Preview Buttons */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-md border border-gray-200 bg-white text-black px-6 py-2 hover:bg-blue-100 transition"
        >
          Save Changes
        </button>

        <div className="group inline-block relative">
          <button
            onClick={goToPreview}
            className="w-12 h-12 bg-white rounded flex items-center justify-center transition border border-gray-200 hover:border-blue-400"
          >
            {/* Eye icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>

            {/* Hover tooltip */}
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Preview
            </span>
          </button>
        </div>
      </div>
      
      {/* 3. Conditionally render the FormPreviewModal */}
      {isPreviewOpen && form && (
        <FormPreviewModal
          form={{ ...form, questions, title: formState.title, description: formState.description }}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}