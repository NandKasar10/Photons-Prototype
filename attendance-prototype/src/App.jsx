import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentPortal from './pages/StudentPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Photons-Prototype/teacher" element={<TeacherDashboard />} />
        <Route path="/Photons-Prototype/student" element={<StudentPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;