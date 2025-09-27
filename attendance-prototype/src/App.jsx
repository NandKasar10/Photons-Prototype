import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentPortal from './pages/StudentPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;