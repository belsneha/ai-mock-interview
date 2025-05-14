import React from 'react';
import { Calendar, Clock, TrendingUp as Trending, BarChart3 } from 'lucide-react';

const History: React.FC = () => {
  const interviewHistory = [
    {
      id: 1,
      type: 'Technical Interview',
      date: '2025-04-10',
      score: 85,
      duration: 18,
      improvement: 7
    },
    {
      id: 2,
      type: 'Behavioral Interview',
      date: '2025-04-05',
      score: 78,
      duration: 22,
      improvement: 3
    },
    {
      id: 3,
      type: 'System Design',
      date: '2025-03-28',
      score: 72,
      duration: 25,
      improvement: -2
    },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Interview History</h1>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Performance Overview
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 border-b border-gray-200">
          <div className="p-6 border-r border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Average Score</h3>
            <p className="text-3xl font-bold text-indigo-600">78%</p>
            <p className="text-sm text-gray-600 mt-1">Across all interviews</p>
          </div>
          <div className="p-6 border-r border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Improvement</h3>
            <p className="text-3xl font-bold text-green-500">+15%</p>
            <p className="text-sm text-gray-600 mt-1">From first interview</p>
          </div>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Practice Time</h3>
            <p className="text-3xl font-bold text-gray-800">2.8 hrs</p>
            <p className="text-sm text-gray-600 mt-1">Across 12 interviews</p>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-medium text-gray-800 mb-4">Recent Interviews</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interview Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Improvement
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviewHistory.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-800">{interview.type}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(interview.date)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        interview.score >= 80 ? 'text-green-600' : 
                        interview.score >= 70 ? 'text-indigo-600' : 'text-amber-600'
                      }`}>
                        {interview.score}%
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {interview.duration} min
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium flex items-center ${
                        interview.improvement > 0 ? 'text-green-600' : 
                        interview.improvement < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <Trending className="w-4 h-4 mr-1" />
                        {interview.improvement > 0 ? '+' : ''}
                        {interview.improvement}%
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;