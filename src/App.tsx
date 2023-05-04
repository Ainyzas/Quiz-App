import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard/QuestionCard';
import Result from './components/Result/Result';
import { myQuestions } from './content/questions';

export type Question = {
  questionText: string;
  options: string[];
  correctAnswer: string;
};

function shuffleQuestions(questions: Question[]): Question[] {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

let questions = shuffleQuestions(myQuestions);

function App() {
  const [isOver, setIsOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  function handleSubmit(selectedAnswer: string | null) {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      } else {
        setIsOver(true);
      }
      if (currentQuestionIndex === questions.length - 1) {
        setIsOver(true);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  }

  function handleRestart() {
    setCurrentQuestionIndex(0);
    setIsOver(false);
    setScore(0);
    questions = shuffleQuestions(myQuestions);
  }

  return (
    <div>
      {isOver ? (
        <Result score={score} onRestart={handleRestart} />
      ) : (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onSubmit={(selectedAnswer) => handleSubmit(selectedAnswer)}
        />
      )}
    </div>
  );
}

export default App;
