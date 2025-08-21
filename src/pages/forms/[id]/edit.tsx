import { useParams } from "react-router-dom";

export default function EditFormPage() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Edit Form {id}</h1>;
}
