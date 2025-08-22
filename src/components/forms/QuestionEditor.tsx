import { v4 as uuid } from "uuid";
import type { Question, Option } from "@/types/question";

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
  const handleAddOption = () => {
    const newOption: Option = { id: uuid(), text: "" };
    const updatedOptions = question.options ? [...question.options, newOption] : [newOption];
    onChange({ ...question, options: updatedOptions });
  };

  const handleOptionChange = (idx: number, value: string) => {
    if (!question.options) return;
    const updatedOptions = question.options.map((opt, i) =>
      i === idx ? { ...opt, text: value } : opt
    );
    onChange({ ...question, options: updatedOptions });
  };

  const handleRemoveOption = (idx: number) => {
    if (!question.options) return;
    const updatedOptions = question.options.filter((_, i) => i !== idx);
    onChange({ ...question, options: updatedOptions });
  };

  const handleTypeChange = (newType: Question["type"]) => {
    let updatedOptions: Option[] | undefined = undefined;
    if (newType === "multiple-choice" || newType === "checkbox") {
      updatedOptions = question.options && question.options.length > 0
        ? question.options
        : [{ id: uuid(), text: "" }];
    }
    onChange({ ...question, type: newType, options: updatedOptions });
  };

  return (
    <div className="border p-4 mb-2 rounded">
      <div className="flex justify-end mt-2">
  <button
    type="button"
    onClick={onRemove}
    className="text-red-500 px-2 py-1 rounded hover:text-red-500 hover:underline focus:outline-none"
  >
    Remove Question
  </button>
</div>

      <label className="block mb-1">
        Question {index + 1}:
        <input
          type="text"
          value={question.text}
          onChange={(e) => onChange({ ...question, text: e.target.value })}
          className="border p-1 w-full mt-1"
        />
      </label>
      <label className="flex justify-end items-center mb-1 gap-2 w-full">
  Required
  <input
    type="checkbox"
    checked={question.required}
    onChange={(e) => onChange({ ...question, required: e.target.checked })}
    className=""
  />
</label>




      <label className="block mb-1">
        Type:
        <select
          value={question.type}
          onChange={(e) => handleTypeChange(e.target.value as Question["type"])}
          className="border p-1 w-full mt-1"
        >
          <option value="text">Text</option>
          <option value="paragraph">Paragraph</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </label>

      

      {(question.type === "multiple-choice" || question.type === "checkbox") && (
        <div className="mt-2">
          <p className="font-semibold mb-1">Options:</p>
          {question.options?.map((opt, idx) => (
            <div key={opt.id} className="flex items-center mb-1">
              <input
                type="text"
                value={opt.text}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="border p-1 w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(idx)}
                className="ml-2 text-red-500 px-2 py-1 rounded hover: hover:text-red-500 hover:underline focus:outline-none"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="mt-1  text-blue-400 px-2 py-1 rounded hover: hover:text-blue-500 hover:underline focus:outline-none"
          >
            Add Option
          </button>
        </div>
      )}

      
    </div>
  );
}
