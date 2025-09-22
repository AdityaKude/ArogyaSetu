
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/icons';

// Sample quiz data - this will be replaced by the AI flow later
const sampleQuiz = {
  questions: [
    {
      question: 'Which of the following is a primary symptom of Diabetes?',
      options: ['High blood pressure', 'Frequent urination', 'Chest pain', 'Joint swelling'],
      correctAnswerIndex: 1,
      explanation: 'Frequent urination (polyuria) is a classic sign of diabetes as the body tries to get rid of excess sugar.',
    },
    {
        question: 'What is the main purpose of a vaccine?',
        options: ['To cure a disease', 'To provide nutrients', 'To build immunity against a disease', 'To relieve pain'],
        correctAnswerIndex: 2,
        explanation: 'Vaccines work by training the immune system to recognize and combat pathogens, either viruses or bacteria.',
    },
    {
        question: 'Which of these is NOT a good practice for preventing infections?',
        options: ['Washing hands regularly', 'Sharing personal items', 'Covering your mouth when you cough', 'Getting vaccinated'],
        correctAnswerIndex: 1,
        explanation: 'Sharing personal items like towels, razors, or toothbrushes can easily spread germs and infections.'
    }
  ],
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const isQuizFinished = currentQuestionIndex >= sampleQuiz.questions.length;
  const currentQuestion = !isQuizFinished ? sampleQuiz.questions[currentQuestionIndex] : null;
  const isCorrect = currentQuestion && selectedAnswer === currentQuestion.correctAnswerIndex;

  const handleNext = () => {
    if (showResult) {
      // Move to the next question
      setShowResult(false);
      setSelectedAnswer(null);
      if (currentQuestionIndex < sampleQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // End of quiz
        setCurrentQuestionIndex(sampleQuiz.questions.length);
      }
    } else {
      // Show the result of the current question
      if (selectedAnswer !== null) {
        setShowResult(true);
        if (isCorrect) {
          setScore(score + 1);
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  }
  
  const getCompletionMessage = () => {
    const percentage = (score / sampleQuiz.questions.length) * 100;
    if (percentage === 100) {
      return "Excellent work! You're a health expert!";
    } else if (percentage >= 60) {
      return "Great job! You have a strong knowledge of this topic.";
    } else {
      return "Good effort! Keep learning to improve your health awareness.";
    }
  }

  return (
     <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-card shadow-sm">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold ml-2">ArogyaSetu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Home</Link>
          <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Features</Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>About</Link>
          <Link href="/quiz" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Quiz</Link>
          <Link href="/chat" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Chatbot</Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Login</Link>
        </nav>
      </header>
       <main className="flex-1 flex items-center justify-center p-4 bg-muted/40">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Health Awareness Quiz</CardTitle>
            <CardDescription>Test your knowledge and learn important health facts.</CardDescription>
          </CardHeader>
          <CardContent>
            {!isQuizFinished && currentQuestion ? (
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg mb-4">Question {currentQuestionIndex + 1}/{sampleQuiz.questions.length}</p>
                  <p>{currentQuestion.question}</p>
                </div>
                <RadioGroup
                  value={selectedAnswer !== null ? `option-${selectedAnswer}` : undefined}
                  onValueChange={(value) => setSelectedAnswer(Number(value.split('-')[1]))}
                  disabled={showResult}
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={`option-${index}`} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>

                {showResult && (
                  <div className={`p-4 rounded-md flex items-center gap-2 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <div>
                      <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                      <p>{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}

                <Button onClick={handleNext} disabled={selectedAnswer === null} className="w-full">
                  {showResult ? 'Next Question' : 'Check Answer'}
                </Button>
              </div>
            ) : (
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Quiz Complete!</h2>
                    <p className="text-lg">You scored {score} out of {sampleQuiz.questions.length}.</p>
                    <p className="text-muted-foreground">{getCompletionMessage()}</p>
                    <Button onClick={handleRestart} className="w-full">
                        Play Again
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
