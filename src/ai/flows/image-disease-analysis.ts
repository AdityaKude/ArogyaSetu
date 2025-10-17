'use server';

/**
 * @fileOverview Analyze an image to identify potential diseases or conditions.
 * Uses multimodal Gemini to describe notable medical findings and likely conditions.
 * Returns a concise diagnosis summary, confidence, and recommendations.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const ImageDiseaseAnalysisInputSchema = z.object({
	/** Data URL string (e.g., data:image/png;base64,...) or external URL */
	image: z.string().min(10, 'Image is required.'),
	/** Optional: anatomical site or context provided by user */
	context: z.string().optional(),
});
export type ImageDiseaseAnalysisInput = z.infer<typeof ImageDiseaseAnalysisInputSchema>;

const ImageDiseaseAnalysisOutputSchema = z.object({
	summary: z.string().describe('High-level summary of findings'),
	possibleConditions: z.string().describe('Likely conditions ranked or listed'),
	recommendedActions: z.string().describe('Next steps and care guidance'),
	confidence: z.string().describe('Model confidence description, not a medical guarantee'),
});
export type ImageDiseaseAnalysisOutput = z.infer<typeof ImageDiseaseAnalysisOutputSchema>;

export async function analyzeImageDisease(
	input: ImageDiseaseAnalysisInput
): Promise<ImageDiseaseAnalysisOutput> {
	return imageDiseaseAnalysisFlow(input);
}

const imageDiseaseAnalysisPrompt = ai.definePrompt({
	name: 'imageDiseaseAnalysisPrompt',
	input: {
		image: z.string(),
		context: z.string().optional(),
	},
	template: `You are a medical assistant analyzing a clinical image.
SYSTEM INSTRUCTIONS:
- Be cautious, clear, and non-diagnostic. Provide possibilities, not certainties.
- If the image is non-medical or low quality, say so and ask for a clearer image.
- Use accessible language suitable for the public.

USER CONTEXT (may be empty): {{context}}

TASK:
1) Brief Summary of Visible Findings
2) Possible Conditions (bulleted)
3) Recommended Actions (bulleted)
4) Confidence (qualitative)
`,
});

const imageDiseaseAnalysisFlow = ai.defineFlow(
	{
		name: 'imageDiseaseAnalysisFlow',
		inputSchema: ImageDiseaseAnalysisInputSchema,
		outputSchema: ImageDiseaseAnalysisOutputSchema,
	},
	async ({ image, context }) => {
    const promptText = `You are a cautious medical assistant analyzing a clinical image.
Provide possibilities, not certainties. If the image is non-medical or unclear, say so.

Context: ${context || 'N/A'}

Return the following sections:
1) Summary of Visible Findings
2) Possible Conditions (bulleted)
3) Recommended Actions (bulleted)
4) Confidence (qualitative)`;
		const { text } = await ai.generate({
			model: googleAI.model('gemini-2.5-flash'),
			messages: [
				{
					role: 'user',
					content: [
						{ text: promptText },
						{ media: { url: image, mimeType: inferMimeTypeFromDataUrl(image) } },
					],
				},
			],
		});

		const parsed = extractSections(text || '');
		return parsed;
	}
);

function inferMimeTypeFromDataUrl(dataUrl: string): string {
	if (dataUrl.startsWith('data:image/png')) return 'image/png';
	if (dataUrl.startsWith('data:image/jpeg') || dataUrl.startsWith('data:image/jpg')) return 'image/jpeg';
	if (dataUrl.startsWith('data:image/webp')) return 'image/webp';
	// Fallback
	return 'image/*';
}

function extractSections(text: string): ImageDiseaseAnalysisOutput {
	// Very simple parsing based on headings; fallback to entire text as summary
	const get = (label: string) => {
		const regex = new RegExp(`${label}[:\n]+([\s\S]*?)(?:\n\n|$)`, 'i');
		const m = text.match(regex);
		return m ? m[1].trim() : '';
	};
	const summary = get('Summary') || text.trim().slice(0, 600);
	const possibleConditions = get('Possible Conditions') || 'Not enough information to reliably suggest conditions.';
	const recommendedActions = get('Recommended Actions') || 'Consider consulting a qualified healthcare professional for further evaluation.';
	const confidence = get('Confidence') || 'Low to moderate confidence based on image quality and context provided.';
	return { summary, possibleConditions, recommendedActions, confidence };
}




