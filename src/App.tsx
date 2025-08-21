import React from 'react';
import Button from './components/common/Button';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500">Google Forms Clone</h1>
<Button label="Create New Form" onClick={() => alert('Button clicked!')} />
      </div>
  );
};

export default App;