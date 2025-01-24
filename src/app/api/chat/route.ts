import { createDeepSeek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: Request): Promise<Response> {
  if (!process.env.DEEPSEEK_API_KEY) {
    return new Response("Missing API key", { status: 500 });
  }

  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return new Response("Missing prompt", { status: 400 });
    }

    const response = streamText({
      model: deepseek('deepseek-chat'),
      messages: [
        {
          role: "system",
          content: `You are a professional travel planner. Provide concise, well-structured trip itineraries.
          Format your response using the following markdown structure:

          ## Overview
          A brief 2-3 sentence summary of the trip.

          ## Daily Itinerary
          Clear day-by-day breakdown with specific timings.

          ## Transportation Tips
          3-4 key travel and transport recommendations.

          ## Must-See Attractions
          ### [Attraction Name]
         
          • Brief description with estimated visit duration
          (Repeat for each major attraction)

          ## Local Experiences
          • 3-4 unique local activities or experiences
          • Best times to experience them
          
        `
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return response?.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating trip plan:', error);
    return new Response("Failed to generate trip plan", { status: 500 });
  }
}