function PatientDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg">My Profile</h3>
          <p className="text-slate-600 mt-2">
            View and manage your profile
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg">My Consultations</h3>
          <p className="text-slate-600 mt-2">
            View your doctor consultations
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Reminders</h3>
          <p className="text-slate-600 mt-2">
            Medicine & appointment reminders
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
