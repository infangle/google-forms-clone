// src/components/forms/FormList.tsx
import type { Form } from "@/types/form";
import FormCard from "./FormCard";

type Props = {
  forms: Form[];
  onDelete: (id: string) => void;
};

export default function FormList({ forms, onDelete }: Props) {
  return (
    <div className="flex justify-center mt-4">
      <ul
        className="grid gap-4 
                   grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
                   max-w-[calc(5*250px+4*16px)]"
      >
        {forms.map((form) => (
          <FormCard key={form.id} form={form} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
