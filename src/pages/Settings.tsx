import React, { useState } from 'react';
import { Save, ChevronDown } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    interviewDuration: 20,
    responseTime: 2,
    difficultyLevel: 'intermediate',
    feedbackDetail: 'detailed',
    notifications: true,
    darkMode: false,
    audioFeedback: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic would go here
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Interview Preferences</h2>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="interviewDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  Interview Duration (minutes)
                </label>
                <select
                  id="interviewDuration"
                  name="interviewDuration"
                  value={settings.interviewDuration}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={10}>10 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="responseTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Response Time per Question (minutes)
                </label>
                <select
                  id="responseTime"
                  name="responseTime"
                  value={settings.responseTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={1}>1 minute</option>
                  <option value={2}>2 minutes</option>
                  <option value={3}>3 minutes</option>
                  <option value={5}>5 minutes</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <div className="relative">
                  <select
                    id="difficultyLevel"
                    name="difficultyLevel"
                    value={settings.difficultyLevel}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="feedbackDetail" className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback Detail Level
                </label>
                <div className="relative">
                  <select
                    id="feedbackDetail"
                    name="feedbackDetail"
                    value={settings.feedbackDetail}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="detailed">Detailed</option>
                    <option value="comprehensive">Comprehensive</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Application Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                  <p className="text-sm text-gray-500">Receive practice reminders and tips</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Use dark theme for the application</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={settings.darkMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Audio Feedback</h3>
                  <p className="text-sm text-gray-500">Enable spoken feedback after interviews</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="audioFeedback"
                    checked={settings.audioFeedback}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex justify-end">
            <button 
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;