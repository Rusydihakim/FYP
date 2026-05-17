import axios from 'axios';

// AI Plan Generator using OpenAI API (or compatible)
export async function generateWorkoutPlan(profile: any) {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  
  if (!apiKey) {
    throw new Error("AI API Key is not configured. Please set VITE_AI_API_KEY.");
  }

  const prompt = `You are a professional fitness coach. Based on the following athlete profile, generate a structured 4-week workout plan. Return ONLY valid JSON in this format:
{
  "title": "string",
  "description": "string",
  "weeks": [
    {
      "week": 1,
      "sessions": [
        {
          "day": "Monday",
          "focus": "string",
          "exercises": [
            { "name": "string", "sets": 3, "reps": 10, "rest_seconds": 60 }
          ]
        }
      ]
    }
  ]
}

Athlete Profile:
- Age: ${profile.age || 'Unknown'}
- Weight: ${profile.weight || 'Unknown'}kg
- Fitness Level: ${profile.fitness_level || 'Beginner'}
- Goals: ${profile.goals || 'General fitness'}
`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo", // or gpt-4
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let content = response.data.choices[0].message.content;
    
    // Strip markdown formatting if any (e.g., ```json ... ```)
    if (content.startsWith('```json')) {
       content = content.replace(/```json\n?/, '').replace(/```$/, '');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("AI Generation failed:", error);
    throw error;
  }
}
