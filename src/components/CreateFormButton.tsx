// src/components/forms/CreateFormButton.tsx
import { Link } from "react-router-dom";

export default function CreateFormButton() {
  return (
    <div className="flex flex-col items-start space-y-4 pl-16">
      {/* Text above button */}
      <span className="font-poppins text-base font-normal">
        Start new form
      </span>

      {/* Card button */}
      <Link
        to="/forms/create"
        className="w-[150px] h-[150px] flex items-center justify-center bg-white border border-gray-200 rounded-sm hover:border-blue-400 transition-colors"
      >
        {/* Plus icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          className="text-gray-600"
        >
          <path
            fill="currentColor"
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
          />
        </svg>
      </Link>
    </div>
  );
}
