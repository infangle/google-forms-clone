import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormsListPage from "./pages/forms";
import CreateFormPage from "./pages/forms/create";
import EditFormPage from "./pages/forms/[id]/edit";
import PreviewFormPage from "./pages/forms/[id]/preview";
import ResponsesPage from "./pages/forms/[id]/responses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /forms */}
        <Route path="/" element={<Navigate to="/forms" replace />} />

        {/* List all forms */}
        <Route path="/forms" element={<FormsListPage />} />

        {/* Create a new form */}
        <Route path="/forms/create" element={<CreateFormPage />} />

        {/* Single form routes */}
        <Route path="/forms/:id/edit" element={<EditFormPage />} />
        <Route path="/forms/:id/preview" element={<PreviewFormPage />} />
        <Route path="/forms/:id/responses" element={<ResponsesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
