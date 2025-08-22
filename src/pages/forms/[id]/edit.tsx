// src/pages/forms/edit.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Form, Question } from "@/types/form";
import { getFormById, updateForm } from "@/data/formsRepo";
import QuestionEditor from "@/components/forms/QuestionEditor";

interface FormWithQuestions extends Form {
  questions: Question[];
}

export default function EditFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormWithQuestions | null>(null);
  
  useEffect(() => {
    
    async function loadForm() {
      if (!id) return;
      const data = await getFormById(id);
      if (data) {
        setForm({ ...data, questions: data.questions ?? [] });
      } else {
        setForm(null);
      }
    }
    loadForm();
  }, [id]);

  if (!form) return <div>Loading...</div>;

  const handleChange = (field: keyof Form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index] = updatedQuestion;
    setForm({ ...form, questions: updatedQuestions });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      formId: form.id,
      text: "",
      type: "text",
      options: [],
      required: false,
    };
    setForm({ ...form, questions: [...form.questions, newQuestion] });
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = form.questions.filter((_, i) => i !== index);
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleSave = async () => {
    // Validate all question texts
    if (form.questions.some((q) => q.text.trim() === "")) {
      alert("Please fill in all question text.");
      return;
    }
    await updateForm(form.id, form);
    navigate("/forms");
  };

  const goToPreview = () => {
    navigate(`/forms/${form.id}/preview`, { state: { form } });
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
        <QuestionEditor
          key={q.id}
          question={q}
          index={index}
          onChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
          onRemove={() => removeQuestion(index)}
        />
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
        <button onClick={goToPreview} className="bg-blue-500 text-white px-4 py-2 rounded">
          Preview
        </button>
      </div>
    </div>
  );
}
