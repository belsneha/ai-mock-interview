import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let retries = 0;
  
  while (true) {
    try {
      return await operation();
    } catch (error: any) {
      if (error?.status === 429) { // Rate limit exceeded
        if (retries >= maxRetries) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        
        const delay = initialDelay * Math.pow(2, retries);
        await sleep(delay);
        retries++;
        continue;
      }
      throw error;
    }
  }
}

export async function generateFeedback(question: string, answer: string) {
  try {
    const response = await retryWithExponentialBackoff(async () => {
      return await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert interviewer providing feedback on interview answers. Provide structured feedback with a score, strengths, areas for improvement, and detailed analysis."
          },
          {
            role: "user",
            content: `Question: ${question}\nAnswer: ${answer}\n\nProvide feedback with the following structure:\n- Score (0-100)\n- Strengths (list)\n- Areas for improvement (list)\n- Analysis (paragraph)`
          }
        ]
      });
    });

    const feedback = response.choices[0].message.content;
    
    // Parse the feedback into structured format
    const lines = feedback.split('\n');
    const score = parseInt(lines[0].match(/\d+/)?.[0] || "70");
    const strengths = lines.slice(1, 4).map(s => s.replace(/^- /, ''));
    const improvements = lines.slice(4, 7).map(s => s.replace(/^- /, ''));
    const analysis = lines.slice(7).join(' ').trim();

    return {
      score,
      strengths,
      improvements,
      analysis
    };
  } catch (error: any) {
    console.error('Error generating feedback:', error);
    
    // Handle rate limit errors specifically
    if (error.message.includes('Rate limit exceeded')) {
      return {
        score: 0,
        strengths: [],
        improvements: [],
        analysis: 'The service is currently experiencing high demand. Please wait a moment and try again.'
      };
    }
    
    // Handle other errors
    return {
      score: 0,
      strengths: ['Unable to analyze response'],
      improvements: ['Please try again later'],
      analysis: 'An error occurred while analyzing your response. Please try again in a few moments.'
    };
  }
}