import type { Question } from "@/types/question";

interface QuestionEditorProps {
  question: Question;
  index: number;
  onChange: (updated: Question) => void;
  onRemove: () => void;
}

export default function QuestionEditor({
  question,
  index,
  onChange,
  onRemove,
}: QuestionEditorProps) {
  return (
    <div className="border p-4 mb-2 rounded">
      <label className="block mb-1">
        Question {index + 1}:
        <input
          type="text"
          value={question.text}
          onChange={(e) => onChange({ ...question, text: e.target.value })}
          className="border p-1 w-full mt-1"
        />
      </label>

      <label className="block mb-1">
        Type:
        <select
          value={question.type}
          onChange={(e) => onChange({ ...question, type: e.target.value as Question['type'] })}
          className="border p-1 w-full mt-1"
        >
          <option value="text">Text</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>
      </label>

      <label className="block mb-1">
        Required:
        <input
          type="checkbox"
          checked={question.required}
          onChange={(e) => onChange({ ...question, required: e.target.checked })}
          className="ml-2"
        />
      </label>

      <button
        type="button"
        onClick={onRemove}
        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
      >
        Remove
      </button>
    </div>
  );
}
