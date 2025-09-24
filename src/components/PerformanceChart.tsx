import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Student } from '../types';
import { subjects } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceChartProps {
  student: Student;
  type?: 'bar' | 'line';
}

export default function PerformanceChart({ student, type = 'bar' }: PerformanceChartProps) {
  const subjectNames = student.grades.map(grade => {
    const subject = subjects.find(s => s.id === grade.subjectId);
    return subject?.code || 'Unknown';
  });

  const currentGrades = student.grades.map(grade => grade.currentGrade);
  const previousGrades = student.grades.map(grade => grade.previousGrade);

  const data = {
    labels: subjectNames,
    datasets: [
      {
        label: 'Previous Grades',
        data: previousGrades,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Current Grades',
        data: currentGrades,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: `${student.name}'s Performance Analysis`,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutCubic' as const,
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {type === 'bar' ? (
        <Bar data={data} options={options} />
      ) : (
        <Line data={data} options={options} />
      )}
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        {student.grades.map((grade, index) => {
          const improvement = grade.currentGrade - grade.previousGrade;
          const subject = subjects.find(s => s.id === grade.subjectId);
          
          return (
            <div key={grade.id} className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">{subject?.code}</h4>
              <div className={`text-2xl font-bold ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {improvement >= 0 ? '+' : ''}{improvement}%
              </div>
              <p className="text-sm text-gray-600">
                {improvement >= 0 ? 'Improvement' : 'Decline'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}