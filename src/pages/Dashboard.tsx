import React from 'react';
import { PlayCircle, BookOpen, BarChart3, UserCircle } from 'lucide-react';
import InterviewTypeCard from '../components/InterviewTypeCard';

interface DashboardProps {
  startInterview: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ startInterview }) => {
  const interviewTypes = [
    { 
      id: 'technical', 
      title: 'Technical Interview', 
      description: 'Practice coding challenges and technical questions.',
      color: 'bg-indigo-600', 
      icon: <BookOpen className="w-6 h-6 text-white" />,
      level: 'Intermediate'
    },
    { 
      id: 'behavioral', 
      title: 'Behavioral Interview', 
      description: 'Answer questions about your work experience and soft skills.',
      color: 'bg-sky-500', 
      icon: <UserCircle className="w-6 h-6 text-white" />,
      level: 'All Levels'
    },
    { 
      id: 'system-design', 
      title: 'System Design', 
      description: 'Practice designing scalable systems and architectures.',
      color: 'bg-purple-600', 
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      level: 'Advanced'
    },
  ];

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">Master Your Interview Skills</h1>
          <p className="text-indigo-100 mb-6">
            Practice with our AI interviewer and get instant feedback to help you land your dream job.
          </p>
          <button 
            onClick={startInterview}
            className="flex items-center space-x-2 bg-white text-indigo-600 px-5 py-3 rounded-lg font-medium transition-transform hover:scale-105"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Start New Interview</span>
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Interview Type</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {interviewTypes.map((type) => (
            <InterviewTypeCard 
              key={type.id} 
              {...type} 
              onClick={startInterview}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Interviews Completed</h3>
            <p className="text-3xl font-bold text-indigo-600">12</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Average Score</h3>
            <p className="text-3xl font-bold text-sky-500">78%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Improvement</h3>
            <p className="text-3xl font-bold text-green-500">+15%</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;