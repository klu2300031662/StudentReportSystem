export interface User {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  email: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  currentGrade: number;
  previousGrade: number;
  attendance: number;
  remarks: string;
  date: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grades: Grade[];
  overallPercentage: number;
}

export interface PerformanceData {
  subject: string;
  current: number;
  previous: number;
}