// src/pages/forms/edit.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Form, Question } from "@/types/form";
import { getFormById, updateForm } from "@/data/formsRepo";

interface FormWithQuestions extends Form {
  questions: Question[]; // Add questions field
}

export default function EditFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormWithQuestions | null>(null);

  // Load the form on mount
  useEffect(() => {

    async function loadForm() {
          if (!id) return;

      const data = await getFormById(id);
      if (data) {
        // Ensure questions array exists
        setForm({ ...data, questions: data.questions ?? [] });
      } else {
        setForm(null);
      }
    }

    loadForm();
  }, [id]);

  if (!form) return <div>Loading...</div>;

  // Update a field in the form
  const handleChange = (field: keyof Form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Update a question
  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setForm({ ...form, questions: updatedQuestions });
  };

  // Add a new question
  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      formId: form.id,
      text: "",
      type: "text",
    };
    setForm({ ...form, questions: [...form.questions, newQuestion] });
  };

  // Remove a question
  const removeQuestion = (index: number) => {
    const updatedQuestions = form.questions.filter((_, i) => i !== index);
    setForm({ ...form, questions: updatedQuestions });
  };

  // Save changes
  const handleSave = async () => {
    // Validate questions
    if (form.questions.some(q => q.text.trim() === "")) {
      alert("Please fill in all question text.");
      return;
    }

    if (!form.id) return; // safety check
    await updateForm(form.id, form);
    navigate("/forms");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>

      <label className="block mb-2">
        Title:
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-4">
        Description:
        <textarea
          value={form.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </label>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {form.questions.map((q, index) => (
        <div key={q.id} className="mb-3 border p-3 rounded">
          <input
            type="text"
            value={q.text}
            onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
            placeholder={`Question ${index + 1}`}
            className="border p-2 w-full mb-2"
          />
          <select
            value={q.type}
            onChange={(e) =>
              handleQuestionChange(index, "type", e.target.value as Question["type"])
            }
            className="border p-2 w-full mb-2"
          >
            <option value="text">Text</option>
            <option value="checkbox">Checkbox</option>
            <option value="multiple-choice">Multiple Choice</option>
          </select>
          <button
            type="button"
            onClick={() => removeQuestion(index)}
            className="text-red-600 hover:underline"
          >
            Remove Question
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Question
      </button>

      <div>
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
