
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/icons';

// Question bank (expanded) – can be replaced by AI later
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
      explanation: 'Vaccines train the immune system to recognize and combat pathogens.',
    },
    {
      question: 'Which of these is NOT a good practice for preventing infections?',
      options: ['Washing hands regularly', 'Sharing personal items', 'Covering your mouth when you cough', 'Getting vaccinated'],
      correctAnswerIndex: 1,
      explanation: 'Sharing personal items can spread germs and infections.',
    },
    {
      question: 'How long should you wash your hands with soap and water?',
      options: ['At least 5 seconds', 'At least 10 seconds', 'At least 20 seconds', 'At least 40 seconds'],
      correctAnswerIndex: 2,
      explanation: '20 seconds is recommended to effectively remove germs.',
    },
    {
      question: 'Which nutrient is essential for building and repairing tissues?',
      options: ['Carbohydrates', 'Proteins', 'Fats', 'Water'],
      correctAnswerIndex: 1,
      explanation: 'Proteins are the body’s building blocks for growth and repair.',
    },
    {
      question: 'What is a normal resting heart rate for most adults?',
      options: ['20-40 bpm', '40-60 bpm', '60-100 bpm', '100-140 bpm'],
      correctAnswerIndex: 2,
      explanation: 'A normal resting rate typically ranges from 60 to 100 bpm.',
    },
    {
      question: 'Which vitamin is primarily obtained from sunlight exposure?',
      options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
      correctAnswerIndex: 2,
      explanation: 'Sunlight helps the skin synthesize Vitamin D.',
    },
    {
      question: 'Which habit is most effective for preventing seasonal flu?',
      options: ['Antibiotics', 'Flu vaccination', 'Vitamin supplements', 'Sauna therapy'],
      correctAnswerIndex: 1,
      explanation: 'Annual flu vaccination significantly reduces infection risk.',
    },
    {
      question: 'Which of the following is a sign of dehydration?',
      options: ['Frequent urination', 'Clear urine', 'Dry mouth', 'Increased saliva'],
      correctAnswerIndex: 2,
      explanation: 'Dry mouth and dark urine often indicate dehydration.',
    },
    {
      question: 'What is the recommended minimum daily steps for general health?',
      options: ['1,000', '3,000', '6,000', '10,000'],
      correctAnswerIndex: 3,
      explanation: '10,000 steps is a common guideline for daily activity.',
    },
    {
      question: 'Which fat type is considered heart-healthy?',
      options: ['Trans fats', 'Saturated fats', 'Unsaturated fats', 'All fats'],
      correctAnswerIndex: 2,
      explanation: 'Unsaturated fats (e.g., olive oil, nuts) support heart health.',
    },
    {
      question: 'Which practice helps improve sleep quality?',
      options: ['Caffeine late at night', 'Irregular bed times', 'Bright screens in bed', 'Consistent sleep schedule'],
      correctAnswerIndex: 3,
      explanation: 'A consistent schedule helps regulate the sleep-wake cycle.',
    },
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPage() {
  // Avoid SSR/client mismatch: don't shuffle on the server. Shuffle after mount.
  const [shuffledQuestions, setShuffledQuestions] = useState(sampleQuiz.questions);
  const [numQuestions, setNumQuestions] = useState(() => Math.min(3, sampleQuiz.questions.length));
  const questionSet = shuffledQuestions.slice(0, numQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setShuffledQuestions(shuffle(sampleQuiz.questions));
  }, []);

  // Scroll animation initialization
  useEffect(() => {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isQuizFinished = currentQuestionIndex >= questionSet.length;
  const currentQuestion = !isQuizFinished ? questionSet[currentQuestionIndex] : null;
  const isCorrect = currentQuestion && selectedAnswer === currentQuestion.correctAnswerIndex;

  const handleNext = () => {
    if (showResult) {
      // Move to the next question
      setShowResult(false);
      setSelectedAnswer(null);
      if (currentQuestionIndex < questionSet.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // End of quiz
        setCurrentQuestionIndex(questionSet.length);
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
    setShuffledQuestions(shuffle(sampleQuiz.questions));
    setNumQuestions(Math.min(3, sampleQuiz.questions.length));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  }
  
  const getCompletionMessage = () => {
    const percentage = (score / questionSet.length) * 100;
    if (percentage === 100) {
      return "Excellent work! You're a health expert!";
    } else if (percentage >= 60) {
      return "Great job! You have a strong knowledge of this topic.";
    } else {
      return "Good effort! Keep learning to improve your health awareness.";
    }
  }

  return (
     <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-sky-50/30">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-sky-600" />
          <span className="font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">ArogyaSetu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-sky-600 transition-colors" prefetch={false}>Home</Link>
          <Link href="/#features" className="text-sm font-medium hover:text-sky-600 transition-colors" prefetch={false}>Features</Link>
          <Link href="/about" className="text-sm font-medium hover:text-sky-600 transition-colors" prefetch={false}>About</Link>
          <Link href="/quiz" className="text-sm font-medium hover:text-sky-600 transition-colors" prefetch={false}>Quiz</Link>
          <Link href="/chat" className="text-sm font-medium hover:text-sky-600 transition-colors" prefetch={false}>Chatbot</Link>
          <Link href="/login" className="text-sm font-medium hover:text-sky-600 transition-colors" prefetch={false}>Login</Link>
        </nav>
      </header>
       <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl rounded-2xl border bg-white shadow-lg" data-aos>
          <CardHeader className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-t-2xl">
            <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">Health Awareness Quiz</CardTitle>
            <CardDescription>Test your knowledge and learn important health facts.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{currentQuestionIndex + (isQuizFinished ? 0 : 1)} / {questionSet.length}</span>
              </div>
              <div className="h-2 bg-sky-50 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-sky-600 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + (isQuizFinished ? 0 : 1)) / questionSet.length) * 100}%` }}
                />
              </div>
            </div>
            {!isQuizFinished && currentQuestion ? (
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg mb-4">Question {currentQuestionIndex + 1}/{questionSet.length}</p>
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
                  <div className={`p-4 rounded-xl flex items-center gap-3 border ${isCorrect ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                    {isCorrect ? <CheckCircle className="h-5 w-5 flex-shrink-0" /> : <XCircle className="h-5 w-5 flex-shrink-0" />}
                    <div>
                      <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                      <p className="text-sm">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleNext} 
                  disabled={selectedAnswer === null} 
                  className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 btn-glow"
                >
                  {showResult ? 'Next Question' : 'Check Answer'}
                </Button>
              </div>
            ) : (
                <div className="text-center space-y-4" data-aos>
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 mb-4">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">Quiz Complete!</h2>
                    </div>
                    <p className="text-lg font-semibold">You scored {score} out of {questionSet.length}.</p>
                    <p className="text-muted-foreground">{getCompletionMessage()}</p>
                    <Button 
                      onClick={handleRestart} 
                      className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 btn-glow"
                    >
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
