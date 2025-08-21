import { useParams } from "react-router-dom";

export default function ResponsesPage() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Responses for Form {id}</h1>;
}
