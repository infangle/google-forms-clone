import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Form} from "@/types/form";
import type { Response } from "@/types/response";
import type { Question } from "@/types/question";
import { getFormById, getResponsesByFormId } from "@/data/repos";

export default function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      setLoading(true);
      if (!id) return;
      const fetchedForm = await getFormById(id);
      const fetchedResponses = await getResponsesByFormId(id);

      if (fetchedForm) setForm(fetchedForm);
      if (fetchedResponses) setResponses(fetchedResponses);

      setLoading(false);
    }

    loadData();
  }, [id]);

  if (!id) return <div>No form ID provided.</div>;
  if (loading) return <div>Loading responses...</div>;
  if (!form) return <div>Form not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      <p className="text-lg text-gray-500 mb-4">
        Total responses: {responses.length}
      </p>

      {responses.length === 0 ? (
        <div>No responses submitted yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                {form.questions.map((q: Question) => (
                  <th key={q.id} className="border px-4 py-2">
                    {q.text || "Untitled Question"}
                  </th>
                ))}
                <th className="border px-4 py-2">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((res, index) => (
                <tr key={res.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  {form.questions.map((q: Question) => {
                    if (!id) return
                    const answer = res.answers[q.id];
                    if (Array.isArray(answer)) {
                      return (
                        <td key={q.id} className="border px-4 py-2">
                          {answer.join(", ")}
                        </td>
                      );
                    }
                    return (
                      <td key={q.id} className="border px-4 py-2">
                        {answer || "-"}
                      </td>
                    );
                  })}
                  <td className="border px-4 py-2">
                    {new Date(res.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
