import './App.css';
import { useState } from 'react';
import Question from './components/Question';
import Score from './components/Score';

const DUMMYQUESTIONS = [
  {
    id: 'q1', 
    question: 'What kind of scoping does JavaScript use', 
    options : [
      'Literal', 
      'Lexical',
      'Segmental',
      'Sequential',
    ], 
    answer: 1 //index of correct answer in selection array
  },
  {
    id: 'q2', 
    question: 'Which of the following keywords is used to define a variable in Javascript?', 
    options : [
      'var', 
      'let',
      'const',
      'Both A and B',
      'None of the above',
    ], 
    answer: 2,
  },
  {
    id: 'q3', 
    question: 'The external JavaScript file must contain the <script> tag.', 
    options : [
      'True', 
      'False',
    ], 
    answer: 0,
  }
]; 

function App() {
  // States
  const [usedQuestionIndices, setUsedQuestionIndices] = useState([])
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);

  const [quizCounter, setQuizCounter] = useState(1)
  const [quizLength, setQuizLength] = useState(4)
  const [scoreTotal, setScoreTotal] = useState(0);

  //
  const {id, question, options, answer} = DUMMYQUESTIONS[currentSelectedIndex]

  // Handlers
  const submitAnswerHandler = (isAnswerCorrect) => {
    // update used questions array and select a new question to display
    setUsedQuestionIndices([...usedQuestionIndices, currentSelectedIndex])
    setCurrentSelectedIndex(currentSelectedIndex + 1);

    // increment currentIndex
    setQuizCounter(quizCounter + 1)

    // update the score
    if(isAnswerCorrect){
      setScoreTotal(scoreTotal + 10);
    }
  }

  return (
    <div>
      <div className='header'>
        <h1>
          React Quiz App
        </h1>
        <h2>A simple quiz application</h2>
      </div>

      <div className='body'>
        <Score
          quizCounter={quizCounter}
          quizLength={quizLength}
          total={scoreTotal}
        />

        <Question
          id={id} 
          question={question} 
          options={options} 
          answer={answer}
          onSubmitAnswer={submitAnswerHandler}
        />
      </div>
    </div>
  );
}

export default App;
