import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Form } from "@/types/form";
import type { Question } from "@/types/question";
import { getFormById, updateForm } from "@/data/repos";
import { updateQuestion } from "@/data/repos/questionsRepo";
import QuestionEditor from "@/components/forms/QuestionEditor";
import { useQuestions } from "@/hooks/useQuestions";

interface FormWithQuestions extends Form {
  questions: Question[];
}

export default function EditFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormWithQuestions | null>(null);
  const { questions, setQuestions, addQuestion, updateQuestionAt, removeQuestionAt } = useQuestions();

  useEffect(() => {
    async function loadForm() {
      if (!id) return;
      const data = await getFormById(id);
      if (data) {
        setForm({ ...data, questions: data.questions ?? [] });
        setQuestions(data.questions ?? []);
      } else {
        setForm(null);
      }
    }
    loadForm();
  }, [id, setQuestions]);

  if (!form) return <div>Loading...</div>;

  const handleChange = (field: keyof Form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleQuestionChange = async (index: number, updated: Question) => {
    updateQuestionAt(index, updated);
    await updateQuestion(updated); // Persist immediately
  };

  const handleSave = async () => {
    if (questions.some((q) => q.text.trim() === "")) {
      alert("Please fill in all question text.");
      return;
    }
    await updateForm(form.id, { ...form, questions });
    navigate("/forms");
  };

  const goToPreview = () => {
    navigate(`/forms/${form.id}/preview`, { state: { form: { ...form, questions } } });
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
      {questions.map((q, index) => (
        <QuestionEditor
          key={q.id}
          question={q}
          index={index}
          onChange={(updated) => handleQuestionChange(index, updated)}
          onRemove={() => removeQuestionAt(index)}
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
        <button onClick={goToPreview} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Preview
        </button>
      </div>
    </div>
  );
}
