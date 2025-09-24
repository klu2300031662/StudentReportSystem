import React, { useState } from 'react';
import { User, BookOpen, TrendingUp, Calendar, Award, LogOut, BarChart3, LineChart } from 'lucide-react';
import PerformanceChart from './PerformanceChart';

const mockGrades = {
  'Somanath': [
    { subject: 'CI CD', current: 92, previous: 85, attendance: 95, remarks: 'Excellent improvement in CI/CD practices' },
    { subject: 'SVV', current: 88, previous: 80, attendance: 92, remarks: 'Good understanding of verification concepts' },
    { subject: 'Embedded', current: 90, previous: 88, attendance: 98, remarks: 'Strong performance in embedded programming' },
  ],
  'Abdul': [
    { subject: 'CI CD', current: 90, previous: 82, attendance: 88, remarks: 'Great progress in automation tools' },
    { subject: 'SVV', current: 87, previous: 85, attendance: 90, remarks: 'Consistent performance in testing' },
    { subject: 'Embedded', current: 89, previous: 78, attendance: 94, remarks: 'Significant improvement in hardware concepts' },
  ],
  'Shankar': [
    { subject: 'CI CD', current: 85, previous: 80, attendance: 85, remarks: 'Steady progress in deployment strategies' },
    { subject: 'SVV', current: 83, previous: 88, attendance: 80, remarks: 'Need to focus more on validation techniques' },
    { subject: 'Embedded', current: 87, previous: 84, attendance: 92, remarks: 'Good understanding of embedded architectures' },
  ],
};

export default function StudentDashboard({ student, onLogout }) {
  const [chartType, setChartType] = useState('bar');
  
  const studentGrades = mockGrades[student.name] || [];
  const averageAttendance = studentGrades.reduce((sum, grade) => sum + grade.attendance, 0) / studentGrades.length;
  const totalImprovement = studentGrades.reduce((sum, grade) => sum + (grade.current - grade.previous), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {student.name}!</h1>
                <p className="text-gray-600">Student Dashboard</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Grade</p>
                <p className="text-3xl font-bold text-blue-600">{student.percentage}%</p>
              </div>
              <Award className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-3xl font-bold text-green-600">{averageAttendance.toFixed(1)}%</p>
              </div>
              <Calendar className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Improvement</p>
                <p className={`text-3xl font-bold ${totalImprovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalImprovement >= 0 ? '+' : ''}{totalImprovement}%
                </p>
              </div>
              <TrendingUp className={totalImprovement >= 0 ? 'text-green-600' : 'text-red-600'} size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-3xl font-bold text-purple-600">{studentGrades.length}</p>
              </div>
              <BookOpen className="text-purple-600" size={32} />
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Performance Analytics</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('bar')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  chartType === 'bar' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BarChart3 size={18} />
                <span>Bar Chart</span>
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  chartType === 'line' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <LineChart size={18} />
                <span>Line Chart</span>
              </button>
            </div>
          </div>
          <PerformanceChart student={student} grades={studentGrades} type={chartType} />
        </div>

        {/* Subject Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Subject Details</h2>
          <div className="space-y-4">
            {studentGrades.map((grade, index) => {
              const improvement = grade.current - grade.previous;
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{grade.subject}</h3>
                      <p className="text-gray-600">Subject Code: {grade.subject}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{grade.current}%</div>
                      <div className={`text-sm ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {improvement >= 0 ? '+' : ''}{improvement}% from previous
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Attendance</span>
                        <span className="text-sm font-semibold text-gray-800">{grade.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${grade.attendance}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Current Grade</span>
                        <span className="text-sm font-semibold text-gray-800">{grade.current}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${grade.current}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {grade.remarks && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Teacher's Remarks:</h4>
                      <p className="text-gray-700">{grade.remarks}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}