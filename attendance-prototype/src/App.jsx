import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import StudentLogin from './pages/StudentLogin.jsx';
import TeacherLogin from './pages/TeacherLogin.jsx';
import StudentPortal from './pages/StudentPortal.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import QRGenerator from './pages/QRGenerator.jsx';
import StudentScan from './pages/StudentScan.jsx';
import FaceScan from './pages/FaceScan.jsx';
import CursorFollower from './components/CursorFollower.jsx';

function App() {
  return (
    <>
    <CursorFollower/>
    <BrowserRouter basename="/Photons-Prototype">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        
        {/* QR Generator */}
        <Route path="/teacher/qr" element={<QRGenerator />} />
        <Route path="/student/scan" element={<StudentScan />} />
<Route path="/student/face" element={<FaceScan />} />
        {/* Protected Routes (redirect handled inside components) */}
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;