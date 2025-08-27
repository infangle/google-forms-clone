import React from "react";
import type { Form } from "../../types/form";
import type { Question } from "../../types/question";

interface FormPreviewProps {
  form: Form;
  questions: Question[];
  onClose: () => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({ form, questions, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{form.title || "Untitled Form"}</h2>
        <p className="text-gray-600 mb-6">{form.description || "No description"}</p>

        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="border-b pb-2">
              <p className="font-medium">{q.text}</p>
              {q.type === "text" && (
                <input
                  type="text"
                  className="mt-2 p-2 border rounded w-full"
                  placeholder="Your answer"
                  disabled
                />
              )}
             {q.type === "multiple-choice" && q.options && (
  <div className="mt-2 space-y-1">
    {q.options.map((opt, i) => (
      <label key={opt.id} className="flex items-center gap-2">
        <input type="radio" disabled />
        {opt.text || `Option ${i + 1}`}
      </label>
    ))}
  </div>
)}

              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
