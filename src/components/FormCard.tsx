import type { Form } from "@/types/form";
import FormActions from "./FormActions";

type Props = {
  form: Form;
  onDelete: (id: string) => void;
};

export default function FormCard({ form, onDelete }: Props) {
  return (
    <li
      className="w-[250px] h-[300px] bg-white border border-gray-100 rounded-sm
                  transition flex flex-col relative"
    >
      {/* Image / Preview section */}
      <div className="h-[80%] w-full flex items-center justify-center bg-gray-50 overflow-hidden">
        <img
          src="/assets/google-forms.png"
          alt="Form Preview"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Bottom section: title + description + actions */}
      <div className="h-[20%] px-3 py-2 flex items-center justify-between">
        <div className="overflow-hidden">
          <h3 className="text-gray-800 font-medium text-md truncate">
            {form.title}
          </h3>
          <p className="text-gray-500 text-sm truncate">{form.description}</p>
        </div>

        {/* Form actions dropdown */}
        <FormActions form={form} onDelete={onDelete} />
      </div>
    </li>
  );
}
