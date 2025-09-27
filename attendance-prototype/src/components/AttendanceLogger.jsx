const AttendanceLogger = ({ sessionId }) => {
  const timestamp = new Date().toLocaleString();
  console.log(`Attendance marked for session ${sessionId} at ${timestamp}`);
  return <p className="text-green-600 font-semibold">Attendance marked ✅</p>;
};

export default AttendanceLogger;