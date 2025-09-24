import { Student, Subject, Grade } from '../types';

export const subjects: Subject[] = [
  { id: '1', name: 'Continuous Integration & Continuous Deployment', code: 'CI CD' },
  { id: '2', name: 'Software Verification & Validation', code: 'SVV' },
  { id: '3', name: 'Embedded Systems', code: 'Embedded' },
];

export const students: Student[] = [
  {
    id: '1',
    name: 'Somanath',
    email: 'somanath@student.edu',
    overallPercentage: 90,
    grades: [
      {
        id: '1',
        studentId: '1',
        subjectId: '1',
        currentGrade: 92,
        previousGrade: 85,
        attendance: 95,
        remarks: 'Excellent improvement in CI/CD practices',
        date: '2025-01-10',
      },
      {
        id: '2',
        studentId: '1',
        subjectId: '2',
        currentGrade: 88,
        previousGrade: 80,
        attendance: 92,
        remarks: 'Good understanding of verification concepts',
        date: '2025-01-10',
      },
      {
        id: '3',
        studentId: '1',
        subjectId: '3',
        currentGrade: 90,
        previousGrade: 88,
        attendance: 98,
        remarks: 'Strong performance in embedded programming',
        date: '2025-01-10',
      },
    ],
  },
  {
    id: '2',
    name: 'Abdul',
    email: 'abdul@student.edu',
    overallPercentage: 89,
    grades: [
      {
        id: '4',
        studentId: '2',
        subjectId: '1',
        currentGrade: 90,
        previousGrade: 82,
        attendance: 88,
        remarks: 'Great progress in automation tools',
        date: '2025-01-10',
      },
      {
        id: '5',
        studentId: '2',
        subjectId: '2',
        currentGrade: 87,
        previousGrade: 85,
        attendance: 90,
        remarks: 'Consistent performance in testing',
        date: '2025-01-10',
      },
      {
        id: '6',
        studentId: '2',
        subjectId: '3',
        currentGrade: 89,
        previousGrade: 78,
        attendance: 94,
        remarks: 'Significant improvement in hardware concepts',
        date: '2025-01-10',
      },
    ],
  },
  {
    id: '3',
    name: 'Shankar',
    email: 'shankar@student.edu',
    overallPercentage: 85,
    grades: [
      {
        id: '7',
        studentId: '3',
        subjectId: '1',
        currentGrade: 85,
        previousGrade: 80,
        attendance: 85,
        remarks: 'Steady progress in deployment strategies',
        date: '2025-01-10',
      },
      {
        id: '8',
        studentId: '3',
        subjectId: '2',
        currentGrade: 83,
        previousGrade: 88,
        attendance: 80,
        remarks: 'Need to focus more on validation techniques',
        date: '2025-01-10',
      },
      {
        id: '9',
        studentId: '3',
        subjectId: '3',
        currentGrade: 87,
        previousGrade: 84,
        attendance: 92,
        remarks: 'Good understanding of embedded architectures',
        date: '2025-01-10',
      },
    ],
  },
];

export const teacherCredentials = {
  email: 'teacher@school.edu',
  password: 'teacher123',
};

export const studentCredentials = [
  { email: 'somanath@student.edu', password: 'student123' },
  { email: 'abdul@student.edu', password: 'student123' },
  { email: 'shankar@student.edu', password: 'student123' },
];