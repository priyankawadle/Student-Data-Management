import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentsList from './components/StudentsList';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Add your navigation bar or header here if needed */}
        <Routes>
          <Route path="/" element={<StudentsList />} />
          {/* Add more routes if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
