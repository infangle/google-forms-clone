import { useParams } from "react-router-dom";

export default function PreviewFormPage() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Preview Form {id}</h1>;
}
