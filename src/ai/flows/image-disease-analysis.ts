
'use server';

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const ImageDiseaseAnalysisInputSchema = z.object({
	image: z.string().min(10, 'Image is required.'),
	context: z.string().nullable().optional(),
});
export type ImageDiseaseAnalysisInput = z.infer<typeof ImageDiseaseAnalysisInputSchema>;

const ImageDiseaseAnalysisOutputSchema = z.object({
	summary: z.string(),
	possibleConditions: z.string(),
	recommendedActions: z.string(),
	confidence: z.string(),
});
export type ImageDiseaseAnalysisOutput = z.infer<typeof ImageDiseaseAnalysisOutputSchema>;

export async function analyzeImageDisease(
	input: ImageDiseaseAnalysisInput
): Promise<ImageDiseaseAnalysisOutput> {
	return imageDiseaseAnalysisFlow(input);
}

const imageDiseaseAnalysisFlow = ai.defineFlow(
	{
		name: 'imageDiseaseAnalysisFlow',
		inputSchema: ImageDiseaseAnalysisInputSchema,
		outputSchema: ImageDiseaseAnalysisOutputSchema,
	},
	async ({ image, context }) => {

    const promptText = `You are a medical assistant AI analyzing an image for a user on a messaging app. Your responses MUST be brief and easy to read on a small screen.

**CRITICAL INSTRUCTIONS:**
- **BE CONCISE.** Use short sentences.
- **DO NOT** use more than 3 bullet points per section.
- **DO NOT** write long paragraphs.

Context from user: ${context || 'N/A'}

Analyze the image and provide the following information in this exact format:

1) Summary: [MAX 2 sentences describing the key visual signs.]

2) Possible Conditions: [MAX 3 bullet points of likely conditions. Be non-diagnostic.]

3) Recommended Actions: [MAX 3 bullet points for next steps.]

4) Confidence: [One phrase: "Very Low", "Low", "Moderate", "High", or "Very High".]`;

		const { text } = await ai.generate({
			model: googleAI.model('gemini-pro-latest'),
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
	return 'image/*';
}

// **Improved Parsing Logic:** This function is now more robust and less sensitive to formatting changes.
function extractSections(text: string): ImageDiseaseAnalysisOutput {
  const sections = {
    summary: '',
    possibleConditions: '',
    recommendedActions: '',
    confidence: '',
  };

  // Split the text by the numbered headings (e.g., "1)", "2)").
  const parts = text.split(/\n?\d+\)/).filter(part => part.trim() !== '');

  if (parts.length > 0) {
    // The first part after the split contains the summary.
    const summaryPart = parts[0].split('Summary:');
    if (summaryPart.length > 1) sections.summary = summaryPart[1].trim();
  }
  if (parts.length > 1) {
    // The second part contains the possible conditions.
    const conditionsPart = parts[1].split('Possible Conditions:');
    if (conditionsPart.length > 1) sections.possibleConditions = conditionsPart[1].trim();
  }
  if (parts.length > 2) {
    // The third part contains the recommended actions.
    const actionsPart = parts[2].split('Recommended Actions:');
    if (actionsPart.length > 1) sections.recommendedActions = actionsPart[1].trim();
  }
  if (parts.length > 3) {
    // The fourth part contains the confidence.
    const confidencePart = parts[3].split('Confidence:');
    if (confidencePart.length > 1) sections.confidence = confidencePart[1].trim();
  }

  return sections;
}
