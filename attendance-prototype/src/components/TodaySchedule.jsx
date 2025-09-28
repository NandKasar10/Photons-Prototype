const TodaySchedule = () => {
  const todayLectures = [
    { time: '09:00 AM - 10:00 AM', subject: 'Physics - Class 12' },
    { time: '10:15 AM - 11:15 AM', subject: 'Maths - Class 11' },
    { time: '12:00 PM - 01:00 PM', subject: 'Chemistry - Class 12' },
    { time: '02:00 PM - 03:00 PM', subject: 'Doubt Session - Class 10' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 rounded-xl bg-red-500 shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">📅 Today's Lecture Schedule</h2>
      <div className="space-y-4">
        {todayLectures.map((lecture, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white rounded-lg shadow px-4 py-3 border border-gray-200 hover:shadow-md transition"
          >
            <span className="text-gray-700 font-medium">{lecture.subject}</span>
            <span className="text-sm text-gray-500">{lecture.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;