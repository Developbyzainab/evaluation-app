import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { skills, difficulty, count, language = "English" } = body;

    // Validate required fields
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: "Skills are required and must be a non-empty array" },
        { status: 400 }
      );
    }

    if (skills.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 skills allowed" },
        { status: 400 }
      );
    }

    if (!skills.every(s => typeof s === "string" && s.trim())) {
      return NextResponse.json(
        { error: "All skills must be non-empty strings" },
        { status: 400 }
      );
    }

    const validDifficulties = ["easy", "medium", "hard"];
    const difficultyValue = (difficulty || "easy").toLowerCase();
    if (!validDifficulties.includes(difficultyValue)) {
      return NextResponse.json(
        { error: "Invalid difficulty. Must be one of: easy, medium, hard" },
        { status: 400 }
      );
    }

    const questionCount = parseInt(count, 10);
    if (isNaN(questionCount) || questionCount < 1 || questionCount > 100) {
      return NextResponse.json(
        { error: "Count must be a number between 1 and 100" },
        { status: 400 }
      );
    }

    const validLanguages = ["English", "Urdu"];
    const languageValue = validLanguages.includes(language) ? language : "English";

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not found in environment");
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 120000,
      maxRetries: 0,
    });

    const difficultyMap = {
      easy: "beginner",
      medium: "intermediate",
      hard: "advanced"
    };

    const diffLevel = difficultyMap[difficultyValue] || "beginner";

    const prompt = `Generate ${questionCount} unique multiple-choice questions for a ${diffLevel} level assessment covering these skills: ${skills.join(", ")}.
    
Requirements:
- Each question must be specific to one of the skills listed: ${skills.join(", ")}
- Questions should be at ${difficultyValue} difficulty level
- Each question must have exactly 4 options (A, B, C, D)
- Only one correct answer per question
- Questions should be practical and test real knowledge
- No duplicate questions
- Language: ${languageValue}
- Distribute questions evenly across all skills provided

Return ONLY a JSON object with this exact structure:
{
  "questions": [
    {
      "question": "question text",
      "options": ["option A", "option B", "option C", "option D"],
      "correct": 0,
      "explanation": "why this answer is correct",
      "skill": "skill name from the provided list",
      "difficulty": "Difficulty"
    }
  ]
}`;

    console.log("[generate-questions] Starting question generation for skills:", skills, "difficulty:", difficultyValue, "count:", questionCount);

    // Race between OpenAI completion and timeout
    let completion;
    try {
      completion = await Promise.race([
        openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an expert technical assessment generator. Create high-quality, unique multiple-choice questions that accurately test practical knowledge for the specified skills only."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 8000,
          response_format: { type: "json_object" }
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Request timed out after 120 seconds")), 120000)
        )
      ]);

      const content = completion.choices[0].message.content;
      console.log("[generate-questions] OpenAI response received, length:", content.length);
      let questions;

      try {
        const parsed = JSON.parse(content);
        questions = parsed.questions || parsed;
      } catch (e) {
        console.error("Failed to parse OpenAI response:", content);
        return NextResponse.json(
          { error: "Failed to parse AI response" },
          { status: 500 }
        );
      }

      // Validate that questions match requested skills
      const validSkills = new Set(skills);
      const validatedQuestions = questions
        .filter(q => q.question && q.options && q.options.length === 4 && typeof q.correct === "number" && validSkills.has(q.skill))
        .slice(0, questionCount)
        .map((q, i) => ({
          id: `${q.skill}-${i}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          question: q.question,
          options: q.options,
          correct: Math.min(Math.max(q.correct, 0), 3),
          explanation: q.explanation || "",
          skill: q.skill,
          difficulty: q.difficulty || difficultyValue.charAt(0).toUpperCase() + difficultyValue.slice(1)
        }));

      console.log("[generate-questions] Generated questions for skills:", [...new Set(validatedQuestions.map(q => q.skill))]);
      console.log("Total questions:", validatedQuestions.length);

      if (validatedQuestions.length === 0) {
        return NextResponse.json(
          { error: "No valid questions generated" },
          { status: 500 }
        );
      }

      console.log(`[generate-questions] Completed in ${Date.now() - startTime}ms`);
      return NextResponse.json({ questions: validatedQuestions });

    } catch (error) {
      console.error("Generate questions error:", error);
      
      // Handle specific OpenAI errors
      if (error.status === 401) {
        return NextResponse.json(
          { error: "Invalid OpenAI API key" },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: "OpenAI rate limit exceeded. Please check your API credits." },
          { status: 429 }
        );
      }
      if (error.status === 500) {
        return NextResponse.json(
          { error: "OpenAI server error. Please try again later." },
          { status: 502 }
        );
      }
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 }
        );
      }

      console.error("Generate questions error:", error);
      return NextResponse.json(
        { error: "Failed to generate questions: " + error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[generate-questions] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}