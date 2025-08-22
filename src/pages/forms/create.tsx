import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createForm } from "../../data/repos/formsRepo";

export default function CreateFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = await createForm({title, description});
    navigate(`/forms/${form.id}/edit`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Form description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
