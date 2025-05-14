import React, { useState, useEffect } from 'react';
import { Clock, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';
import InterviewQuestion from '../components/InterviewQuestion';
import FeedbackPanel from '../components/FeedbackPanel';
import { questions } from '../data/questions';
import { generateFeedback } from '../services/openai';

interface InterviewProps {
  goToDashboard: () => void;
}

const Interview: React.FC<InterviewProps> = ({ goToDashboard }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswering, setIsAnswering] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [feedback, setFeedback] = useState<null | {
    score: number;
    strengths: string[];
    improvements: string[];
    analysis: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAnswering && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isAnswering) {
      submitAnswer();
    }
    
    return () => clearInterval(timer);
  }, [timeRemaining, isAnswering]);
  
  const submitAnswer = async () => {
    setIsAnswering(false);
    setIsLoading(true);
    setError(null);
    
    try {
      const aiFeedback = await generateFeedback(currentQuestion.text, userAnswer);
      
      if (aiFeedback.analysis.includes('high demand') || aiFeedback.analysis.includes('try again')) {
        setError('The service is currently busy. Please wait a moment and try again.');
        setIsAnswering(true);
        return;
      }
      
      setFeedback(aiFeedback);
    } catch (error) {
      console.error('Error getting feedback:', error);
      setError('There was an error analyzing your response. Please try again.');
      setIsAnswering(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setIsAnswering(true);
      setTimeRemaining(120);
      setFeedback(null);
      setError(null);
    } else {
      // End of interview
      goToDashboard();
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={goToDashboard}
        className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Technical Interview
            </h1>
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span className={`font-medium ${timeRemaining < 30 ? 'text-red-500' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="ml-4 flex-grow">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600" 
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <InterviewQuestion 
            question={currentQuestion}
            isAnswering={isAnswering}
          />
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {isAnswering ? (
            <div className="space-y-4">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
              <div className="flex justify-end">
                <button 
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim()}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          ) : (
            <FeedbackPanel
              feedback={feedback}
              loading={isLoading}
              onNext={nextQuestion}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;