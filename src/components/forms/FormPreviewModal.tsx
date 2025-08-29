// src/components/forms/FormPreviewModal.tsx

import type { Form } from "@/types/form";
import type { Question, Option } from "@/types/question";
import React from "react";

interface FormPreviewModalProps {
  form: Form & { questions: Question[] };
  onClose: () => void;
}

export default function FormPreviewModal({ form, onClose }: FormPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-bold">{form.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none font-semibold">
            &times;
          </button>
        </div>
        <p className="text-gray-600 mb-4">{form.description}</p>
        
        <div className="space-y-4">
          {form.questions.map((question, index) => (
            <div key={question.id} className="p-4 border border-gray-200 rounded-md">
              <p className="font-semibold">{index + 1}. {question.text}</p>
              {question.type === "text" && <input type="text" className="w-full mt-2 p-2 border rounded" disabled />}
              {question.type === "paragraph" && <textarea className="w-full mt-2 p-2 border rounded" rows={4} disabled />}
              {(question.type === "multiple-choice" || question.type === "checkbox") && (
                <div className="mt-2 space-y-2">
                  {question.options?.map((option) => (
                    <label key={option.id} className="flex items-center space-x-2">
                      <input type={question.type === "multiple-choice" ? "radio" : "checkbox"} name={question.id} disabled />
                      <span>{option.text}</span>
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
}