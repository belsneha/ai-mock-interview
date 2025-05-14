import React from 'react';
import { ArrowRight } from 'lucide-react';

interface InterviewTypeCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  level: string;
  onClick: () => void;
}

const InterviewTypeCard: React.FC<InterviewTypeCardProps> = ({
  id,
  title,
  description,
  color,
  icon,
  level,
  onClick
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`${color} p-4`}>
        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
            {level}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button 
          onClick={onClick}
          className="flex items-center space-x-1 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          <span>Start Interview</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InterviewTypeCard;