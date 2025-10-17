'use client';

import { useState } from 'react';
import Image from 'next/image';
import { analyzeDiseaseFromImage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ImageAnalysisPage() {
	const [preview, setPreview] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [result, setResult] = useState<{
		summary?: string;
		possibleConditions?: string;
		recommendedActions?: string;
		confidence?: string;
		message?: string;
	} | null>(null);

	return (
		<div className="mx-auto max-w-2xl p-6 space-y-6">
			<h1 className="text-2xl font-semibold">Image Disease Analysis</h1>
			<form
				action={async (formData) => {
					setSubmitting(true);
					setResult(null);
					const res = await analyzeDiseaseFromImage(undefined as any, formData);
					if (res.success) {
						setResult(res.data || null);
					} else {
						setResult({ message: res.message || 'Analysis failed' });
					}
					setSubmitting(false);
				}}
				className="space-y-4"
			>
				<div className="space-y-2">
					<label className="text-sm font-medium">Image</label>
					<Input
						type="file"
						name="image"
						accept="image/*"
						onChange={async (e) => {
							const file = e.target.files?.[0];
							if (!file) {
								setPreview(null);
								return;
							}
							const url = URL.createObjectURL(file);
							setPreview(url);
						}}
						required
					/>
					{preview && (
						<div className="relative mt-2 w-full overflow-hidden rounded-md border">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={preview} alt="preview" className="w-full h-auto" />
						</div>
					)}
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Context (optional)</label>
					<Textarea name="context" placeholder="Describe symptoms, duration, location, etc." />
				</div>
				<Button type="submit" disabled={submitting}>
					{submitting ? 'Analyzing…' : 'Analyze Image'}
				</Button>
			</form>

			{result && (
				<div className="rounded-md border p-4 space-y-3">
					{result.message && (
						<p className="text-sm text-red-600">{result.message}</p>
					)}
					{result.summary && (
						<div>
							<h2 className="font-semibold">Summary</h2>
							<p className="text-sm whitespace-pre-wrap">{result.summary}</p>
						</div>
					)}
					{result.possibleConditions && (
						<div>
							<h2 className="font-semibold">Possible Conditions</h2>
							<p className="text-sm whitespace-pre-wrap">{result.possibleConditions}</p>
						</div>
					)}
					{result.recommendedActions && (
						<div>
							<h2 className="font-semibold">Recommended Actions</h2>
							<p className="text-sm whitespace-pre-wrap">{result.recommendedActions}</p>
						</div>
					)}
					{result.confidence && (
						<p className="text-xs text-muted-foreground">Confidence: {result.confidence}</p>
					)}
					<p className="text-xs text-muted-foreground">
						Disclaimer: This is not a medical diagnosis. Consult a healthcare professional.
					</p>
				</div>
			)}
		</div>
	);
}











