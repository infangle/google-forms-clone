import { useEffect, useState } from "react";
import type { Form } from "@/types/form";
import { getAllForms, deleteForm } from "@/data/repos";
import CreateFormButton from "@/components/CreateFormButton";
import FormList from "@/components/FormList";

export default function FormsListPage() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    getAllForms().then(setForms);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteForm(id);
    setForms(await getAllForms());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Forms</h1>

      <CreateFormButton />

      <FormList forms={forms} onDelete={handleDelete} />
    </div>
  );
}
