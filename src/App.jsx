import React, { useState } from "react";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData); // userData comes from API
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === "teacher") {
    return <TeacherDashboard onLogout={handleLogout} />;
  }

  return <StudentDashboard student={user} onLogout={handleLogout} />;
}

export default App;
