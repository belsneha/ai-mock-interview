import React from 'react';
import { Question } from '../types';

interface InterviewQuestionProps {
  question: Question;
  isAnswering: boolean;
}

const InterviewQuestion: React.FC<InterviewQuestionProps> = ({ question, isAnswering }) => {
  return (
    <div className={`bg-gray-50 p-5 rounded-lg border ${isAnswering ? 'border-indigo-200' : 'border-gray-200'}`}>
      <div className="flex items-start space-x-3">
        <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{question.text}</h3>
          {question.hint && (
            <p className="mt-1 text-sm text-gray-600">{question.hint}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {question.keywords.map((keyword, index) => (
              <span 
                key={index} 
                className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestion;