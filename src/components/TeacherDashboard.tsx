import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, Edit3, Save, LogOut, BarChart3, User } from 'lucide-react';
import { students as initialStudents, subjects } from '../data/mockData';
import { Student, Grade } from '../types';
import PerformanceChart from './PerformanceChart';

interface TeacherDashboardProps {
  onLogout: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingGrade, setEditingGrade] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Grade>>({});

  const handleEditGrade = (grade: Grade) => {
    setEditingGrade(grade.id);
    setEditForm({ ...grade });
  };

  const handleSaveGrade = () => {
    if (!editForm.id) return;

    setStudents(prev => prev.map(student => ({
      ...student,
      grades: student.grades.map(grade => 
        grade.id === editForm.id ? { ...grade, ...editForm } : grade
      ),
    })));

    setEditingGrade(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingGrade(null);
    setEditForm({});
  };

  const totalStudents = students.length;
  const averageGrade = students.reduce((sum, student) => sum + student.overallPercentage, 0) / totalStudents;
  const totalSubjects = subjects.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-red-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
                <p className="text-gray-600">Manage Student Performance</p>
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
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-red-600">{totalStudents}</p>
              </div>
              <Users className="text-red-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-3xl font-bold text-blue-600">{averageGrade.toFixed(1)}%</p>
              </div>
              <TrendingUp className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-3xl font-bold text-green-600">{totalSubjects}</p>
              </div>
              <BookOpen className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Performance</p>
                <p className="text-3xl font-bold text-purple-600">Excellent</p>
              </div>
              <BarChart3 className="text-purple-600" size={32} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Students</h2>
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedStudent?.id === student.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-red-600 w-10 h-10 rounded-full flex items-center justify-center">
                          <User className="text-white" size={18} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{student.name}</h3>
                          <p className="text-sm text-gray-600">Overall: {student.overallPercentage}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="lg:col-span-2">
            {selectedStudent ? (
              <div className="space-y-6">
                {/* Performance Chart */}
                <PerformanceChart student={selectedStudent} />

                {/* Grade Management */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Grade Management - {selectedStudent.name}
                  </h2>
                  <div className="space-y-4">
                    {selectedStudent.grades.map((grade) => {
                      const subject = subjects.find(s => s.id === grade.subjectId);
                      const isEditing = editingGrade === grade.id;

                      return (
                        <div key={grade.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{subject?.name}</h3>
                              <p className="text-gray-600">{subject?.code}</p>
                            </div>
                            <div className="flex space-x-2">
                              {!isEditing ? (
                                <button
                                  onClick={() => handleEditGrade(grade)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit3 size={18} />
                                </button>
                              ) : (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={handleSaveGrade}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  >
                                    <Save size={18} />
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    ×
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Current Grade
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={editForm.currentGrade || ''}
                                  onChange={(e) => setEditForm(prev => ({ 
                                    ...prev, 
                                    currentGrade: parseFloat(e.target.value) 
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Attendance %
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={editForm.attendance || ''}
                                  onChange={(e) => setEditForm(prev => ({ 
                                    ...prev, 
                                    attendance: parseFloat(e.target.value) 
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Previous Grade
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={editForm.previousGrade || ''}
                                  onChange={(e) => setEditForm(prev => ({ 
                                    ...prev, 
                                    previousGrade: parseFloat(e.target.value) 
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Remarks
                                </label>
                                <textarea
                                  value={editForm.remarks || ''}
                                  onChange={(e) => setEditForm(prev => ({ 
                                    ...prev, 
                                    remarks: e.target.value 
                                  }))}
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-600">{grade.currentGrade}%</div>
                                  <div className="text-sm text-gray-600">Current</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-green-600">{grade.attendance}%</div>
                                  <div className="text-sm text-gray-600">Attendance</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-red-600">{grade.previousGrade}%</div>
                                  <div className="text-sm text-gray-600">Previous</div>
                                </div>
                              </div>
                              {grade.remarks && (
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <p className="text-sm text-gray-700">{grade.remarks}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Users className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Select a Student</h3>
                <p className="text-gray-500">Choose a student from the list to view and manage their grades</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}