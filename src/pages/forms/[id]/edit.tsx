import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Form } from "@/types/form";
import type { Question } from "@/types/question";
import { getFormById, updateForm } from "@/data/repos";
import { updateQuestion } from "@/data/repos/questionsRepo";
import QuestionEditor from "@/components/forms/QuestionEditor";
import { useQuestions } from "@/hooks/useQuestions";
import { PreviewFormModal } from "@/components/PreviewFormModal";
import { useForm } from "@/forms/hooks/useForm";

interface FormWithQuestions extends Form {
  questions: Question[];
}

export default function EditFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormWithQuestions | null>(null);
  const { questions, setQuestions, addQuestion, updateQuestionAt, removeQuestionAt } = useQuestions();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, isValid } = useForm({
    initialValues: {
      title: formData?.title || "",
      description: formData?.description || "",
    },
    schema: {
      title: [], // Add validators if needed
      description: [], // Add validators if needed
    },
    onSubmit: async (values) => {
      if (!formData) return;
      
      // Validate question text
      if (questions.some((q) => q.text.trim() === "")) {
        alert("Please fill in all question text.");
        return;
      }
      
      await updateForm(formData.id, { ...formData, ...values, questions });
      navigate("/forms");
    },
  });

  useEffect(() => {
    async function loadForm() {
      if (!id) return;
      const data = await getFormById(id);
      if (data) {
        setFormData({ ...data, questions: data.questions ?? [] });
        setQuestions(data.questions ?? []);
      } else {
        setFormData(null);
      }
    }
    loadForm();
  }, [id, setQuestions]);

  if (!formData) return <div>Loading...</div>;

  const handleQuestionChange = async (index: number, updated: Question) => {
    updateQuestionAt(index, updated);
    await updateQuestion(updated);
  };


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Form Title */}
        <label className="block mb-2 font-poppins font-normal">
          Title
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-gray-200 rounded-md p-2 w-full mt-1"
          />
        </label>

        {/* Form Description */}
        <label className="block mb-4">
          Description
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-gray-200 rounded-md p-2 w-full mt-1"
          />
        </label>
      </form>

      {/* Questions Section */}
      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {questions.map((q, index) => (
        <QuestionEditor
          key={q.id}
          question={q}
          index={index}
          onChange={(updated) => handleQuestionChange(index, updated)}
          onRemove={() => removeQuestionAt(index)}
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
          type="submit"
          className="rounded-md border border-gray-200 bg-white text-black px-6 py-2 hover:bg-blue-100 transition"
          disabled={!isValid}
        >
          Save Changes
        </button>

        {/* Preview Button */}
        <div className="group inline-block relative">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            {/* Eye Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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

      {/* Preview Modal */}
      {isPreviewOpen && (
        <PreviewFormModal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          form={{ ...formData, ...values }}
        />
      )}
    </div>
  );
}
