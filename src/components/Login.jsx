import React, { useState } from "react";
import { User, LogIn, GraduationCap, Users, UserPlus } from "lucide-react";
import { signIn, signUp } from "../api";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [registerRole, setRegisterRole] = useState("0"); // 0=student, 1=teacher
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signIn(email, password);
      if (res.data.startsWith("200::")) {
        const parts = res.data.split("::");
        const name = parts[1];
        const userRole = parts[2];
        const token = parts[3];

        onLogin({
          id: email,
          name,
          role: userRole === "1" ? "teacher" : "student",
          email,
          token,
        });
      } else {
        setError(res.data);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await signUp(fullname, email, password, registerRole);
      setMessage(res.data);
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Report System
          </h1>
          <p className="text-gray-600">
            {isRegister ? "Create a new account" : "Access your academic dashboard"}
          </p>
        </div>

        {!isRegister ? (
          // ================= LOGIN FORM =================
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                  role === "student"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <User size={18} className="mr-2" /> Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                  role === "teacher"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                <Users size={18} className="mr-2" /> Teacher
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder={
                  role === "teacher" ? "teacher@school.edu" : "student@student.edu"
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
                role === "student"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              }`}
            >
              <LogIn size={20} className="mr-2" /> Login as {role}
            </button>
          </form>
        ) : (
          // ================= REGISTER FORM =================
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={registerRole}
                onChange={(e) => setRegisterRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="0">Student</option>
                <option value="1">Teacher</option>
              </select>
            </div>

            {message && (
              <div className="bg-gray-50 border px-4 py-3 rounded-lg text-sm text-gray-700">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all transform hover:scale-105 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              <UserPlus size={20} className="mr-2" /> Register
            </button>
          </form>
        )}

        {/* Toggle login/register */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-blue-600 hover:underline"
              >
                Register here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
