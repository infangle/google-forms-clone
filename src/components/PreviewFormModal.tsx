// src/components/PreviewFormModal.tsx
import React from "react";
import type { Form } from "../types/form";
import type { Question, Option } from "../types/question";

interface PreviewFormModalProps {
  open: boolean;
  onClose: () => void;
  form: Form;
}

export const PreviewFormModal: React.FC<PreviewFormModalProps> = ({ open, onClose, form }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-auto"
      onClick={onClose} // clicking outside closes modal
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-3xl relative"
        onClick={(e) => e.stopPropagation()} // prevent modal click from closing
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-3 py-1 bg-gray-200 rounded"
        >
          Close
        </button>

        {/* Form title and description */}
        <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
        {form.description && <p className="mb-4">{form.description}</p>}

        {/* Questions */}
        <div className="space-y-4">
          {form.questions.map((q: Question, index: number) => (
            <div key={q.id} className="mb-3">
              <p className="font-medium mb-1">
                {index + 1}. {q.text} {q.required ? "*" : ""}
              </p>

              {q.type === "text" && (
                <input type="text" className="border p-2 w-full" disabled />
              )}

              {q.type === "paragraph" && (
                <textarea className="border p-2 w-full" disabled />
              )}

              {q.type === "checkbox" &&
                q.options?.map((opt: Option) => (
                  <label key={opt.id} className="flex items-center mb-1">
                    <input type="checkbox" className="mr-2" disabled /> {opt.text}
                  </label>
                ))}

              {q.type === "multiple-choice" &&
                q.options?.map((opt: Option) => (
                  <label key={opt.id} className="flex items-center mb-1">
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      className="mr-2"
                      disabled
                    />{" "}
                    {opt.text}
                  </label>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
