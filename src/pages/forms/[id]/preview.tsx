import { useLocation } from "react-router-dom";
import type { Form, Question } from "@/types/form";

export default function PreviewPage() {
  const location = useLocation();
  const { form } = location.state as { form: Form };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      <p className="mb-4">{form.description}</p>

      {form.questions.map((q: Question, index: number) => (
        <div key={q.id} className="mb-3">
          <p className="font-medium mb-1">
            {index + 1}. {q.text} {q.required ? "*" : ""}
          </p>
          {q.type === "text" && <input type="text" className="border p-2 w-full" />}
          {q.type === "paragraph" && <textarea className="border p-2 w-full" />}
          {q.type === "checkbox" &&
            q.options?.map((opt: string, oIndex: number) => (
              <label key={oIndex} className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" /> {opt}
              </label>
            ))}
          {q.type === "multiple-choice" &&
            q.options?.map((opt: string, oIndex: number) => (
              <label key={oIndex} className="flex items-center mb-1">
                <input type="radio" name={`q${q.id}`} className="mr-2" /> {opt}
              </label>
            ))}
        </div>
      ))}
    </div>
  );
}
