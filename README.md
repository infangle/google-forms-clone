# Google Forms Clone

A web-based form creation and management application, inspired by Google Forms. This project allows users to create forms, add different types of questions, collect responses, and view results in an interactive way.

---

## Features

- **Create Forms**
  - Add a title and description.
  - Add multiple types of questions: text, paragraph, multiple-choice, and checkboxes.
  - Mark questions as required.
- **Dynamic Question Management**
  - Add, update, or remove questions in real time.
  - Auto-validate questions for required fields.
  - Auto-fill default options for multiple-choice and checkbox questions to prevent type errors.
- **Data Persistence**
  - Forms and questions are stored locally or via a database (IndexedDB or server-side API).
- **Responsive UI**
  - Works seamlessly across desktop (1440px, 1024px) and mobile devices (375px).
  - Conditional rendering for tables, cards, and charts based on screen size.

---

## Tech Stack & Tools

- **Frontend**
  - [React](https://reactjs.org/) + TypeScript
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Recharts](https://recharts.org/) for charts
  - [React Router](https://reactrouter.com/) for page navigation
- **State Management**
  - Custom React hooks (e.g., `useQuestions`)  
- **Backend / Data Storage**
  - IndexedDB via [Dexie.js](https://dexie.org/) or local JSON storage
  - UUID generation with [`uuid`](https://www.npmjs.com/package/uuid)
- **Build Tools**
  - Vite for development and bundling
- **Version Control**
  - Git and GitHub for source control

---

## Getting Started

### Prerequisites

- Node.js (>=16.x)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/google-forms-clone.git
cd google-forms-clone
