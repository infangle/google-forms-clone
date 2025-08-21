import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllForms, deleteForm } from "../../data/formsRepo";
import type { Form } from "../../types/form";

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
      <Link
        to="/forms/create"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Create Form
      </Link>
      <ul className="mt-4 space-y-2">
        {forms.map((form) => (
          <li key={form.id} className="border p-3 flex justify-between">
            <div>
              <h2 className="font-semibold">{form.title}</h2>
              <p className="text-sm text-gray-500">{form.description}</p>
            </div>
            <div className="space-x-2">
              <Link
                to={`/forms/${form.id}/edit`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <Link
                to={`/forms/${form.id}/preview`}
                className="text-green-600 hover:underline"
              >
                Preview
              </Link>
              <Link
                to={`/forms/${form.id}/responses`}
                className="text-purple-600 hover:underline"
              >
                Responses
              </Link>
              <button
                onClick={() => handleDelete(form.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
