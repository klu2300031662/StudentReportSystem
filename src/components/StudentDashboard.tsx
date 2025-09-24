import React, { useState } from 'react';
import { User, BookOpen, TrendingUp, Calendar, Award, LogOut, BarChart3, LineChart } from 'lucide-react';
import { Student } from '../types';
import { subjects } from '../data/mockData';
import PerformanceChart from './PerformanceChart';

interface StudentDashboardProps {
  student: Student;
  onLogout: () => void;
}

export default function StudentDashboard({ student, onLogout }: StudentDashboardProps) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const averageAttendance = student.grades.reduce((sum, grade) => sum + grade.attendance, 0) / student.grades.length;
  const totalImprovement = student.grades.reduce((sum, grade) => sum + (grade.currentGrade - grade.previousGrade), 0);

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
                <p className="text-3xl font-bold text-blue-600">{student.overallPercentage}%</p>
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
                <p className="text-3xl font-bold text-purple-600">{student.grades.length}</p>
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
          <PerformanceChart student={student} type={chartType} />
        </div>

        {/* Subject Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Subject Details</h2>
          <div className="space-y-4">
            {student.grades.map((grade) => {
              const subject = subjects.find(s => s.id === grade.subjectId);
              const improvement = grade.currentGrade - grade.previousGrade;
              
              return (
                <div key={grade.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{subject?.name}</h3>
                      <p className="text-gray-600">{subject?.code}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{grade.currentGrade}%</div>
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
                        <span className="text-sm font-semibold text-gray-800">{grade.currentGrade}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${grade.currentGrade}%` }}
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