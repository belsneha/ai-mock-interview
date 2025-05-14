import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    type: 'technical',
    text: 'Can you explain how you would implement a caching system for a web application?',
    hint: 'Consider discussing different cache strategies and their trade-offs.',
    keywords: ['Performance', 'Architecture', 'Trade-offs']
  },
  {
    id: 2,
    type: 'behavioral',
    text: 'Tell me about a time you had to work under a tight deadline. How did you handle it?',
    hint: 'Use the STAR method: Situation, Task, Action, Result.',
    keywords: ['Time Management', 'Prioritization', 'Teamwork']
  },
  {
    id: 3,
    type: 'technical',
    text: 'How would you design a URL shortening service like bit.ly?',
    hint: 'Consider scalability, database choice, and potential bottlenecks.',
    keywords: ['System Design', 'Scalability', 'Databases']
  },
  {
    id: 4,
    type: 'behavioral',
    text: 'Describe a situation where you had a conflict with a team member. How did you resolve it?',
    hint: 'Focus on your communication skills and conflict resolution approach.',
    keywords: ['Conflict Resolution', 'Communication', 'Teamwork']
  },
  {
    id: 5,
    type: 'technical',
    text: "How would you optimize a website that's loading slowly?",
    hint: 'Consider both frontend and backend optimizations.',
    keywords: ['Performance', 'Optimization', 'Web Development']
  }
];