import { useNavigate } from "react-router-dom";
import { createForm } from "@/data/repos/formsRepo";
import { addQuestionToForm } from "@/data/repos/questionsRepo";
import QuestionEditor from "@/components/forms/QuestionEditor";
import { useQuestions } from "@/hooks/useQuestions";
import { useForm } from "@/forms/hooks/useForm";
import { createFormSchema } from "@/forms/validation/schema";

export default function CreateFormPage() {
  const navigate = useNavigate();
  const { questions, addQuestion, updateQuestionAt, removeQuestionAt } = useQuestions();

  const initialValues = {
    title: "untitled",
    description: "",
  };

  const schema = createFormSchema;

  const { values, handleChange, handleBlur, handleSubmit, isValid } = useForm({
    initialValues,
    schema,
    onSubmit: async (values) => {
      // Validate question text
      if (questions.some((q) => q.text.trim() === "")) {
        alert("Please fill in all question text.");
        return;
      }

      // Validate options for multiple-choice and checkbox
      for (const q of questions) {
        if ((q.type === "multiple-choice" || q.type === "checkbox") && (!q.options || q.options.length === 0)) {
          alert(`Question "${q.text}" must have at least one option.`);
          return;
        }
      }

      // All validations passed, create form
      const form = await createForm({ title: values.title, description: values.description || "" });
      
      // Save all questions to the newly created form
      for (const question of questions) {
        await addQuestionToForm(form.id, {
          text: question.text,
          type: question.type,
          options: question.options,
          required: question.required
        });
      }
      
      navigate("/forms");
    },
  });


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Form</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            placeholder="Form title"
            className="border p-2 w-full mt-1"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>

        <label className="block mb-4">
          Description:
          <textarea
            placeholder="Form description"
            className="border p-2 w-full mt-1"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>

        <h2 className="text-xl font-semibold mb-2">Questions</h2>
        <button
          type="button"
          onClick={addQuestion}
          className="text-blue-500 mb-4"
        >
          Add Question
        </button>
        {questions.map((q, index) => (
          <QuestionEditor
            key={q.id}
            question={q}
            index={index}
            onChange={(updated) => updateQuestionAt(index, updated)}
            onRemove={() => removeQuestionAt(index)}
          />
        ))}

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="text-green-500 px-2 py-1 rounded hover:text-green-500 hover:underline focus:outline-none"
            disabled={!isValid}
          >
            Create Form
          </button>
        </div>
      </form>


      
    </div>
  );
}
