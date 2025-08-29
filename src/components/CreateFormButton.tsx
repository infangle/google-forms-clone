import { Link } from "react-router-dom";
import 'primeicons/primeicons.css';

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
        {/* PrimeIcons' pi-plus icon */}
        <i className="pi pi-plus text-5xl text-gray-600"></i>
      </Link>
    </div>
  );
}