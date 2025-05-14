import React from 'react';
import { ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react';

interface FeedbackProps {
  feedback: {
    score: number;
    strengths: string[];
    improvements: string[];
    analysis: string;
  } | null;
  loading: boolean;
  onNext: () => void;
  isLastQuestion: boolean;
}

const FeedbackPanel: React.FC<FeedbackProps> = ({ 
  feedback, 
  loading, 
  onNext,
  isLastQuestion
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin mb-4">
          <RotateCw className="w-8 h-8 text-indigo-600" />
        </div>
        <p className="text-gray-700">Analyzing your response...</p>
      </div>
    );
  }

  if (!feedback) return null;

  const { score, strengths, improvements, analysis } = feedback;
  
  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-indigo-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">AI Feedback</h3>
        <div>
          <span className="text-sm text-gray-600 mr-2">Score:</span>
          <span className={`text-xl font-bold ${getScoreColor()}`}>{score}%</span>
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ThumbsUp className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
            <ul className="space-y-1">
              {strengths.map((strength, index) => (
                <li key={index} className="text-green-700">• {strength}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ThumbsDown className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-2">Areas for Improvement</h4>
            <ul className="space-y-1">
              {improvements.map((improvement, index) => (
                <li key={index} className="text-amber-700">• {improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-2">Analysis</h4>
        <p className="text-gray-700">{analysis}</p>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={onNext}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          {isLastQuestion ? 'Finish Interview' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default FeedbackPanel;