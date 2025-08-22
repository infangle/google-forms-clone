import type { Question, Option } from "@/types/question";

interface Props {
  question: Question;
  index: number;
  onChange: (updated: Question) => void;
  onRemove: () => void;
}

export default function QuestionEditor({ question, index, onChange, onRemove }: Props) {
  const handleFieldChange = (field: keyof Question, value: any) => {
    onChange({ ...question, [field]: value });
  };

  const handleOptionChange = (optionIndex: number, value: string) => {
    const updatedOptions = [...(question.options || [])];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], text: value }; // <- fix here
    handleFieldChange("options", updatedOptions);
  };

  const addOption = () => {
    const newOption: Option = { id: Date.now().toString(), text: "" }; // <- create Option object
    handleFieldChange("options", [...(question.options || []), newOption]);
  };

  const removeOption = (optionIndex: number) => {
    const updatedOptions = question.options?.filter((_, i) => i !== optionIndex) || [];
    handleFieldChange("options", updatedOptions);
  };

  const isOptionType = question.type === "checkbox" || question.type === "multiple-choice";

  return (
    <div className="mb-4 border p-3 rounded">
      <input
        type="text"
        value={question.text}
        onChange={(e) => handleFieldChange("text", e.target.value)}
        placeholder={`Question ${index + 1}`}
        className="border p-2 w-full mb-2"
      />

      <div className="mb-2">
        <label className="mr-2">Type:</label>
        <select
          value={question.type}
          onChange={(e) => handleFieldChange("type", e.target.value)}
          className="border p-2"
        >
          <option value="text">Text</option>
          <option value="paragraph">Paragraph</option>
          <option value="checkbox">Checkbox</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>
      </div>

      <div className="mb-2">
        <label>
          <input
            type="checkbox"
            checked={question.required || false}
            onChange={(e) => handleFieldChange("required", e.target.checked)}
            className="mr-1"
          />
          Required
        </label>
      </div>

      {isOptionType && (
        <div className="mb-2">
          <p className="font-semibold">Options:</p>
          {question.options?.map((opt, i) => (
            <div key={opt.id} className="flex items-center mb-1">
              <input
                type="text"
                value={opt.text} // <- fix here
                onChange={(e) => handleOptionChange(i, e.target.value)}
                className="border p-1 flex-1 mr-2"
              />
              <button
                type="button"
                onClick={() => removeOption(i)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption} className="text-blue-500 hover:underline mt-1">
            Add Option
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={onRemove}
        className="text-red-600 hover:underline mt-2"
      >
        Remove Question
      </button>
    </div>
  );
}
