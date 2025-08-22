import { useNavigate } from "react-router-dom";
import { createForm } from "@/data/repos/formsRepo";
import QuestionEditor from "@/components/forms/QuestionEditor";
import { useQuestions } from "@/hooks/useQuestions";

export default function CreateFormPage() {
  const navigate = useNavigate();
  const { questions, addQuestion, updateQuestionAt, removeQuestionAt } = useQuestions();

  const handleSubmit = async (title: string, description: string) => {
    // Optional: validate questions
    if (questions.some((q) => q.text.trim() === "")) {
      alert("Please fill in all question text.");
      return;
    }

    const form = await createForm({ title, description });
    navigate(`/forms/${form.id}/edit`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Form</h1>

      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={() => {
            const titleInput = (document.getElementById("title") as HTMLInputElement).value;
            const descInput = (document.getElementById("description") as HTMLTextAreaElement).value;
            handleSubmit(titleInput, descInput);
          }}
    className="text-green-500 px-2 py-1 rounded hover:text-green-500 hover:underline focus:outline-none"
        >
          Create Form
        </button>
      </div>

      <label className="block mb-2">
        Title:
        <input type="text" placeholder="Form title" className="border p-2 w-full mt-1" id="title" />
      </label>

      <label className="block mb-4">
        Description:
        <textarea placeholder="Form description" className="border p-2 w-full mt-1" id="description" />
      </label>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {questions.map((q, index) => (
        <QuestionEditor
          key={q.id}
          question={q}
          index={index}
          onChange={(updated) => updateQuestionAt(index, updated)}
          onRemove={() => removeQuestionAt(index)}
        />
      ))}

      <button type="button" onClick={addQuestion}             className="mt-1  text-blue-400 px-2 py-1 rounded hover: hover:text-blue-500 hover:underline focus:outline-none"
>
        Add Question
      </button>

      
    </div>
  );
}
