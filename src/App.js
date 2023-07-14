import './App.css';
import React, { useCallback, useEffect, useState } from 'react';

import Header from './components/Header';
import QuestionForm from './components/QuestionForm';
import Score from './components/Score';

function App() {
  // States
  const [quizCounter, setQuizCounter] = useState(1)
  const [quizLength, setQuizLength] = useState(4)
  const [maxQuizLength, setMaxQuizLength] = useState(0)
  const [scoreTotal, setScoreTotal] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaxQuizLength = useCallback(async() => {
    setIsLoading(true);
    try{
      const response = await fetch('https://react-trivia-6d4aa-default-rtdb.firebaseio.com/Questions.json')

      if(!response.ok){
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json();
      setMaxQuizLength(data.length) 
      console.log("Max quiz length: ", data.length)

    }catch(error){
      setError(error.message);
    }
    setIsLoading(true);
  }, []);
  
  useEffect(()=>{
    fetchMaxQuizLength();
  },[fetchMaxQuizLength])

  return (
    <div>
      <Header/>
        <div className='body'>
          {error && <p>{error}</p>}

          {!error && 
            <React.Fragment>
              <Score
                quizCounter={quizCounter}
                quizLength={quizLength}
                total={scoreTotal}
              />

              <QuestionForm
                quizCounter={quizCounter}
                scoreTotal={scoreTotal}
                setQuizCounter={setQuizCounter}
                setScoreTotal={setScoreTotal}
              />
            </React.Fragment>
          }

        </div>
    </div>
  );
}

export default App;
