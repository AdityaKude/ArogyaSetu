'use server';
/**
 * @fileOverview Generates a multiple-choice quiz on a given health topic.
 *
 * - generateQuiz - A function that takes a topic and returns a set of quiz questions.
 * - QuizInput - The input type for the generateQuiz function.
 * - QuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizInputSchema = z.object({
  topic: z.string().describe('The health topic for the quiz (e.g., Diabetes, Nutrition).'),
});
export type QuizInput = z.infer<typeof QuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe('The quiz question.'),
    options: z.array(z.string()).describe('A list of 4 possible answers.'),
    correctAnswerIndex: z.number().describe('The index of the correct answer in the options array.'),
    explanation: z.string().describe('A brief explanation of why the answer is correct.'),
});

const QuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('A list of 5 quiz questions.'),
});
export type QuizOutput = z.infer<typeof QuizOutputSchema>;


export async function generateQuiz(input: QuizInput): Promise<QuizOutput> {
  return quizFlow(input);
}

const quizPrompt = ai.definePrompt({
  name: 'quizPrompt',
  input: {schema: QuizInputSchema},
  output: {schema: QuizOutputSchema},
  prompt: `You are an expert in public health education. Generate a multiple-choice quiz with 5 questions on the following topic. Each question should have 4 options. Ensure the questions are clear, concise, and relevant for a general audience. Provide the correct answer and a simple explanation.

  Topic: {{{topic}}}
  `,
});

const quizFlow = ai.defineFlow(
  {
    name: 'quizFlow',
    inputSchema: QuizInputSchema,
    outputSchema: QuizOutputSchema,
  },
  async input => {
    const {output} = await quizPrompt(input);
    return output!;
  }
);
