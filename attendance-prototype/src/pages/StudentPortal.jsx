import { useState } from 'react';
import StudentScan from '../components/StudentScan';
import BiometricMock from '../components/BiometricMock';
import AttendanceLogger from '../components/AttendanceLogger';
import { checkWifi } from '../utils/wifiCheck';

const StudentPortal = () => {
  const [sessionId, setSessionId] = useState(null);
  const [biometricVerified, setBiometricVerified] = useState(false);

  if (!sessionId) {
    return <StudentScan onScan={(id) => {
      if (checkWifi()) setSessionId(id);
      else alert('Not on same Wi-Fi network ❌');
    }} />;
  }

  if (!biometricVerified) {
    return <BiometricMock onVerify={(status) => setBiometricVerified(status)} />;
  }

  return <AttendanceLogger sessionId={sessionId} />;
};

export default StudentPortal;