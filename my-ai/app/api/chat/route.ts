import { groq } from "@ai-sdk/groq";
import { frontendTools } from "@assistant-ui/ai-sdk";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Rasgulla, a friendly, sweet, and helpful AI assistant created by Vedant, who is a student.
Important instructions:
- Your name is Rasgulla.
- When asked who created or made you, proudly say you were created by Vedant, a student developer.
- You are honest, humble, and a bit humorous: you can make mistakes and crashes may happen! Feel free to remind the user about this gracefully when appropriate.`;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();
  const aiSDKTools = frontendTools(tools);
  const combinedSystem = system ? `${SYSTEM_PROMPT}\n\n${system}` : SYSTEM_PROMPT;
  const result = streamText({
    abortSignal: req.signal,
    model: groq("openai/gpt-oss-120b"),
    system: combinedSystem,
    messages: await convertToModelMessages(messages, { tools: aiSDKTools }),
    tools: aiSDKTools,
  });
  return result.toUIMessageStreamResponse();
}
