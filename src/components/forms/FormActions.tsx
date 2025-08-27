// src/components/forms/FormActions.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Form } from "@/types/form";
import {PreviewFormModal} from "../PreviewFormModal"; // new modal component

type Props = {
  form: Form;
  onDelete: (id: string) => void;
};

export default function FormActions({ form, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Options button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        {/* Three dots icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {/* Dropdown card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 flex flex-col space-y-1 p-2">
          <Link
            to={`/forms/${form.id}/edit`}
            className="text-blue-600 hover:underline px-2 py-1 rounded"
          >
            Edit
          </Link>

          {/* Preview as modal link */}
          <span
            onClick={() => setIsPreviewOpen(true)}
            className="text-green-600 hover:underline cursor-pointer px-2 py-1 rounded"
          >
            Preview
          </span>

          <Link
            to={`/forms/${form.id}/responses`}
            className="text-purple-600 hover:underline px-2 py-1 rounded"
          >
            Responses
          </Link>

          <button
            onClick={() => onDelete(form.id)}
            className="text-red-600 hover:underline text-left px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}

      {/* Preview modal */}
      {isPreviewOpen && (
        <PreviewFormModal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          form={form}
        />
      )}
    </div>
  );
}
