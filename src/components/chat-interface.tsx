'use client';

import { useEffect, useRef, useState, useId, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { submitUserMessage, getAudioForText, analyzeDiseaseFromImage, analyzeVoiceTranscript, analyzeAudioFile } from '@/app/actions';
import type { ActionResult, DisplayMessage, VoiceAnalysisAction, AudioAnalysisAction, ImageDiseaseAnalysisAction } from '@/lib/types';
import type { SymptomAnalysisOutput } from '@/ai/flows/symptom-analysis';
import type { HealthInfoOutput } from '@/ai/flows/health-information-retrieval';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Bot,
  User,
  Send,
  FileQuestion,
  Stethoscope,
  Mic,
  Volume2,
  Waves,
  Image as ImageIcon,
  FileAudio,
  Music
} from 'lucide-react';
import { LoadingDots } from './icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const botAvatar = PlaceHolderImages.find((img) => img.id === 'bot-avatar');

const initialMessageState: ActionResult = {
  type: null,
  payload: null,
};

const initialAudioAnalysisState: AudioAnalysisAction = {
    success: false,
    message: '',
}

const initialImageAnalysisState: ImageDiseaseAnalysisAction = {
    success: false,
    message: '',
}

const initialVoiceAnalysisState: VoiceAnalysisAction = {
    success: false,
    message: '',
}

function PlayAudioButton({ text }: { text: string }) {
  const [audio, setAudio] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audio) {
      if (audioRef.current) {
        audioRef.current.src = audio;
        audioRef.current.play();
      }
    }
    if (error) {
      console.error(error);
    }
  }, [audio, error]);

  const handlePlay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(undefined);
    const formData = new FormData();
    formData.set('text', text);
    try {
      const result = await getAudioForText(null, formData);
      if (result.error) {
        setError(result.error);
      } else {
        setAudio(result.audio);
      }
    } catch(e) {
      setError('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };
  
  

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePlay}
        disabled={isPending}
        className="ml-2"
      >
        {isPending ? <LoadingDots /> : <Volume2 className="h-5 w-5" />}
        <span className="sr-only">Play audio</span>
      </Button>
      <audio ref={audioRef} className="hidden" />
    </>
  );
}

function ChatMessageContent({
  content,
  sourceText,
}: {
  content: React.ReactNode;
  sourceText?: string;
}) {
  return (
    <div className="flex items-center">
      <div>{content}</div>
      {sourceText && <PlayAudioButton text={sourceText} />}
    </div>
  );
}

export function ChatInterface() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [messageState, messageAction] = useActionState(
    submitUserMessage,
    initialMessageState
  );
    const [audioAnalysisState, audioAnalysisAction] = useActionState(analyzeAudioFile, initialAudioAnalysisState);
    const [imageAnalysisState, imageAnalysisAction] = useActionState(analyzeDiseaseFromImage, initialImageAnalysisState);
    const [voiceAnalysisState, voiceAnalysisAction] = useActionState(analyzeVoiceTranscript, initialVoiceAnalysisState);

  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [intent, setIntent] = useState<'symptom' | 'info' | 'voice' | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const id = useId();

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        if (inputRef.current) {
          inputRef.current.value = transcript;
        }
        setIsRecording(false);

        const userMessage: DisplayMessage = {
          id: crypto.randomUUID(),
          role: 'user',
          display: <ChatMessageContent content={<p>{transcript}</p>} />,
          createdAt: new Date(),
        };

        const loadingMessage: DisplayMessage = {
          id: 'loading',
          role: 'assistant',
          display: <ChatMessageContent content={<LoadingDots />} />,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, userMessage, loadingMessage]);

        if (intent === 'voice') {
            const formData = new FormData();
            formData.set('transcript', transcript);
            startTransition(() => voiceAnalysisAction(formData));
        } else {
            const formData = new FormData();
            formData.set('intent', intent || '');
            formData.set('message', transcript);
            startTransition(() => messageAction(formData));
        }
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      };
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        toast({
          variant: 'destructive',
          title: 'Voice Error',
          description: `Could not recognize speech: ${event.error}`,
        });
        setIsRecording(false);
      };
      recognition.onend = () => {
        setIsRecording(false);
      };
      recognitionRef.current = recognition;
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast, intent]);

  const handleVoiceAnalysisResult = (result: VoiceAnalysisAction) => {
    if (!result.success || !result.data) {
      setMessages((prev) =>
        prev.slice(0, prev.length - 1).concat({
          id: crypto.randomUUID(),
          role: 'assistant',
          display: (
            <ChatMessageContent
              content={<p className="text-sm">{result.message || 'Failed to analyze voice.'}</p>}
            />
          ),
          createdAt: new Date(),
        })
      );
      return;
    }

    const data = result.data;
    const displayNode = (
      <Card>
        <CardHeader>
          <CardTitle>Vocal Symptom Analysis</CardTitle>
          <CardDescription>
            This is not a medical diagnosis. Consult a healthcare professional.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {data.isCoughDetected && <p>Cough detected.</p>}
          {data.isBreathlessnessDetected && <p>Breathlessness detected.</p>}
          {data.isFatigueDetected && <p>Fatigue detected.</p>}
          {data.detectedSymptoms.length > 0 && <div><h3 className="font-semibold mb-2">Other Detected Symptoms</h3><p>{data.detectedSymptoms.join(', ')}</p></div>}
        </CardContent>
      </Card>
    );

    setMessages((prev) =>
      prev.slice(0, prev.length - 1).concat({
        id: crypto.randomUUID(),
        role: 'assistant',
        display: <ChatMessageContent content={displayNode} />,
        createdAt: new Date(),
      })
    );
  }
  
    const handleAudioAnalysisResult = (result: AudioAnalysisAction) => {
    if (!result.success || !result.data) {
      setMessages((prev) =>
        prev.slice(0, prev.length - 1).concat({
          id: crypto.randomUUID(),
          role: 'assistant',
          display: (
            <ChatMessageContent
              content={<p className="text-sm">{result.message || 'Failed to analyze audio.'}</p>}
            />
          ),
          createdAt: new Date(),
        })
      );
      return;
    }

    const data = result.data;
    const displayNode = (
      <Card>
        <CardHeader>
          <CardTitle>Audio Clip Analysis</CardTitle>
          <CardDescription>
            This is not a medical diagnosis. Consult a healthcare professional.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {data.isCoughDetected && <p>Cough detected.</p>}
          {data.isBreathlessnessDetected && <p>Breathlessness detected.</p>}
          {data.isFatigueDetected && <p>Fatigue detected.</p>}
          {data.detectedSymptoms.length > 0 && <div><h3 className="font-semibold mb-2">Other Detected Symptoms</h3><p>{data.detectedSymptoms.join(', ')}</p></div>}
          {data.transcription && <div><h3 className="font-semibold mb-2">Transcription</h3><p>{data.transcription}</p></div>}
        </CardContent>
      </Card>
    );

    setMessages((prev) =>
      prev.slice(0, prev.length - 1).concat({
        id: crypto.randomUUID(),
        role: 'assistant',
        display: <ChatMessageContent content={displayNode} />,
        createdAt: new Date(),
      })
    );
  }

  useEffect(() => {
    if (isClient) {
      setMessages([
        {
          id: `initial-${id}`,
          role: 'assistant',
          display: (
            <ChatMessageContent
              content={
                <div>
                  <p className="mb-4">
                    Welcome to ArogyaSetu. I can provide potential
                    insights into your symptoms or retrieve information on
                    health topics. How can I help you today?
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      onClick={() => handleIntentSelection('symptom')}
                    >
                      <Stethoscope className="mr-2 h-4 w-4" /> Analyze Symptoms
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleIntentSelection('info')}
                    >
                      <FileQuestion className="mr-2 h-4 w-4" /> Get Health Info
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" /> Analyze Image
                    </Button>
                     <Button
                      variant="outline"
                      onClick={() => handleIntentSelection('voice')}
                    >
                      <FileAudio className="mr-2 h-4 w-4" /> Analyze Voice
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => audioFileInputRef.current?.click()}
                    >
                      <Music className="mr-2 h-4 w-4" /> Analyze Audio Clip
                    </Button>
                  </div>
                </div>
              }
            />
          ),
          createdAt: new Date(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, id]);

  const handleIntentSelection = (selectedIntent: 'symptom' | 'info' | 'voice') => {
    setIntent(selectedIntent);
    const systemMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      role: 'system',
      display: (
        <ChatMessageContent
          content={
            <p className="text-center text-sm text-muted-foreground">
              {selectedIntent === 'symptom'
                ? 'Please list your symptoms or use the microphone to speak.'
                : selectedIntent === 'voice'
                ? 'Please press the microphone button and speak about your symptoms.'
                : 'What health topic are you interested in?'}
            </p>
          }
        />
      ),
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, systemMessage]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messageState.type === null || !isClient) {
      return;
    }

    const { type, payload } = messageState;
    if (type === 'error') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (payload as { message: string }).message,
      });
      setMessages((prev) => prev.filter((msg) => msg.id !== 'loading'));
      return;
    }

    let displayNode: React.ReactNode;
    let sourceText: string | undefined;

    if (type === 'symptom_analysis') {
      const data = payload as SymptomAnalysisOutput;
      sourceText = `Possible Conditions: ${data.possibleConditions}. Recommended Actions: ${data.recommendedActions}.`;
      displayNode = (
        <Card>
          <CardHeader>
            <CardTitle>Symptom Analysis</CardTitle>
            <CardDescription>
              Based on the symptoms you provided, here are some possibilities.
              This is not a medical diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Possible Conditions</h3>
              <p>{data.possibleConditions}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommended Actions</h3>
              <p>{data.recommendedActions}</p>
            </div>
          </CardContent>
        </Card>
      );
    } else if (type === 'health_info') {
      const data = payload as HealthInfoOutput;
      sourceText = data.summary;
      displayNode = (
        <Card>
          <CardHeader>
            <CardTitle>Health Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.summary}</p>
          </CardContent>
        </Card>
      );
    }

    setMessages((prev) =>
      prev.slice(0, prev.length - 1).concat({
        id: crypto.randomUUID(),
        role: 'assistant',
        display: (
          <ChatMessageContent content={displayNode} sourceText={sourceText} />
        ),
        createdAt: new Date(),
      })
    );
    setIntent(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageState, isClient]);

  useEffect(() => {
    if (audioAnalysisState.success) {
        handleAudioAnalysisResult(audioAnalysisState);
    }
  }, [audioAnalysisState]);

  useEffect(() => {
    if (imageAnalysisState.success) {
        handleImageAnalysisResult(imageAnalysisState);
    }
  }, [imageAnalysisState]);

  useEffect(() => {
    if (voiceAnalysisState.success) {
        handleVoiceAnalysisResult(voiceAnalysisState);
    }
  }, [voiceAnalysisState]);

  const handleFormSubmit = (formData: FormData) => {
    const messageContent = formData.get('message') as string;
    if (!messageContent.trim()) return;

    const userMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      display: <ChatMessageContent content={<p>{messageContent}</p>} />,
      createdAt: new Date(),
    };

    const loadingMessage: DisplayMessage = {
      id: 'loading',
      role: 'assistant',
      display: <ChatMessageContent content={<LoadingDots />} />,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    startTransition(() => messageAction(formData));
    formRef.current?.reset();
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        variant: 'destructive',
        title: 'Not Supported',
        description: 'Your browser does not support voice recognition.',
      });
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };
  
  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    const context = inputRef.current?.value || '';

    const userImageMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      display: (
        <div className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={localUrl} alt="uploaded" className="max-w-xs rounded" />
          {context && <p className="text-sm whitespace-pre-wrap">{context}</p>}
        </div>
      ),
      createdAt: new Date(),
    };

    const loadingMessage: DisplayMessage = {
      id: 'loading',
      role: 'assistant',
      display: <ChatMessageContent content={<LoadingDots />} />,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userImageMessage, loadingMessage]);

    const formData = new FormData();
    formData.set('image', file);
    if (context) formData.set('context', context);
    startTransition(() => imageAnalysisAction(formData));

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

      const handleImageAnalysisResult = (result: ImageDiseaseAnalysisAction) => {
    if (!result.success || !result.data) {
        setMessages((prev) =>
          prev.slice(0, prev.length - 1).concat({
            id: crypto.randomUUID(),
            role: 'assistant',
            display: (
              <ChatMessageContent
                content={<p className="text-sm">{result.message || 'Failed to analyze image.'}</p>}
              />
            ),
            createdAt: new Date(),
          })
        );
        return;
      }

      const data = result.data;
      const displayNode = (
        <Card>
          <CardHeader>
            <CardTitle>Image Analysis</CardTitle>
            <CardDescription>
              This is not a medical diagnosis. Consult a healthcare professional.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="whitespace-pre-wrap text-sm">{data.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Possible Conditions</h3>
              <p className="whitespace-pre-wrap text-sm">{data.possibleConditions}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommended Actions</h3>
              <p className="whitespace-pre-wrap text-sm">{data.recommendedActions}</p>
            </div>
            <p className="text-xs text-muted-foreground">Confidence: {data.confidence}</p>
          </CardContent>
        </Card>
      );

      setMessages((prev) =>
        prev.slice(0, prev.length - 1).concat({
          id: crypto.randomUUID(),
          role: 'assistant',
          display: <ChatMessageContent content={displayNode} />,
          createdAt: new Date(),
        })
      );
  }
  
    const handleAudioFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    const userAudioMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      display: (
        <div className="space-y-2">
          <audio controls src={localUrl} className="max-w-xs rounded" />
        </div>
      ),
      createdAt: new Date(),
    };

    const loadingMessage: DisplayMessage = {
      id: 'loading',
      role: 'assistant',
      display: <ChatMessageContent content={<LoadingDots />} />,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userAudioMessage, loadingMessage]);

    const formData = new FormData();
    formData.set('audio', file);
    startTransition(() => audioAnalysisAction(formData));

    if (audioFileInputRef.current) audioFileInputRef.current.value = '';
  };
  
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" size="icon" disabled={pending || !intent || intent === 'voice'}>
        {pending ? <LoadingDots /> : <Send />}
        <span className="sr-only">Send message</span>
      </Button>
    );
  }


  if (!isClient) {
    return (
        <div className="flex h-full items-center justify-center">
            <LoadingDots />
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-start gap-4',
              message.role === 'user' && 'justify-end',
              message.role === 'system' && 'justify-center'
            )}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-9 w-9 border">
                <AvatarImage
                  src={botAvatar?.imageUrl}
                  alt="Bot"
                  data-ai-hint={botAvatar?.imageHint}
                />
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
            )}

            {message.role !== 'system' && (
              <div
                className={cn(
                  'max-w-md rounded-lg px-4 py-2',
                  message.role === 'assistant'
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                {message.display}
              </div>
            )}

            {message.role === 'system' && (
              <div className="max-w-md w-full">{message.display}</div>
            )}

            {message.role === 'user' && (
              <Avatar className="h-9 w-9 border">
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-card border-t">
        <form
          ref={formRef}
          action={handleFormSubmit}
          className="flex items-center gap-2"
        >
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelected}
          />
          <input
            ref={audioFileInputRef}
            type="file"
            name="audio"
            accept="audio/*"
            className="hidden"
            onChange={handleAudioFileSelected}
          />
          <Input
            ref={inputRef}
            name="message"
            placeholder={
              !intent
                ? 'Choose an option above to start...'
                : intent === 'symptom'
                ? 'e.g., headache, fever, cough'
                : intent === 'voice'
                ? 'Click the mic to start recording'
                : 'e.g., What is diabetes?'
            }
            autoComplete="off"
            disabled={!intent || intent === 'voice'}
          />
          <input type="hidden" name="intent" value={intent || ''} />
          <Button
            type="button"
            size="icon"
            variant={isRecording ? 'destructive' : 'outline'}
            onClick={toggleRecording}
            disabled={!intent}
          >
            {isRecording ? <Waves /> : <Mic />}
            <span className="sr-only">
              {isRecording ? 'Stop recording' : 'Start recording'}
            </span>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon />
            <span className="sr-only">Upload image</span>
          </Button>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
