import './App.css';
import { useState } from 'react';

import Header from './components/Header';
import QuestionForm from './components/QuestionForm';
import Score from './components/Score';

function App() {
  // States
  const [quizCounter, setQuizCounter] = useState(1)
  const [quizLength, setQuizLength] = useState(4)
  const [maxQuizLength, setMaxQuizLength] = useState(0)
  const [scoreTotal, setScoreTotal] = useState(0);
  
  return (
    <div>
      <Header/>

      <div className='body'>
        <Score
          quizCounter={quizCounter}
          quizLength={quizLength}
          total={scoreTotal}
        />

        <QuestionForm
          quizCounter={quizCounter}
          scoreTotal={scoreTotal}
          setQuizCounter={setQuizCounter}
          setMaxQuizLength={setMaxQuizLength}
          setScoreTotal={setScoreTotal}
        />
      </div>
    </div>
  );
}

export default App;
