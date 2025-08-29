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
        {/* Custom Google-colored plus icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h5.5" stroke="#F4B400" /> 
          <path d="M13.5 12h5.5" stroke="#4285F4" /> 
          <path d="M12 5v5.5" stroke="#DB4437" /> 
          <path d="M12 13.5v5.5" stroke="#0F9D58" />
        </svg>
      </Link>
    </div>
  );
}
