import './App.css';
import React, { useCallback, useEffect, useState } from 'react';

import Header from './components/Header';
import QuestionForm from './components/QuestionForm';
import Score from './components/Score';
import StartModal from './StartModal';
import EndModal from './EndModal';

function App() {
  // States
  const [quizCounter, setQuizCounter] = useState(1)
  const [quizLength, setQuizLength] = useState(4)
  const [maxQuizLength, setMaxQuizLength] = useState(0)
  const [total, setTotal] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayStartModal, setDisplayStartModal] = useState(true);
  const [displayEndModal, setDisplayEndModal] = useState(false);

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
    setIsLoading(false);
  }, []);
  
  useEffect(()=>{
    fetchMaxQuizLength();
  },[fetchMaxQuizLength])

  const restartHandler = (event) => {
    console.log("Restart")

    setQuizCounter(1)
    setTotal(0);
    
    setIsLoading(false);
    setError(null);
    setDisplayStartModal(true);
    setDisplayEndModal(false);
  }

  const questionUpdateHandler = (count) => {
    if(count > quizLength){
      setDisplayEndModal(true)
    }
  }

  return (
    <div>
      <Header/>

      {displayStartModal && 
        <StartModal 
          maxQuizLength={maxQuizLength}
          setQuizLength={setQuizLength}
          setDisplayStartModal={setDisplayStartModal}
        />
      }

      <div className='body'>
        {isLoading && <p>Loading</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && 
          <React.Fragment>
            <Score
              total={total}
              quizCounter={quizCounter}
              quizLength={quizLength}
            />
            {!displayStartModal && 
              <QuestionForm
                total={total}
                quizCounter={quizCounter}
                setTotal={setTotal}
                setQuizCounter={setQuizCounter}
                onQuestionUpdate={questionUpdateHandler}
              />
            }
          </React.Fragment>
        }

        {displayEndModal &&
          <EndModal
            total={total}
            quizLength={quizLength}
            onRestart={restartHandler}
          />
        }

        </div>
    </div>
  );
}

export default App;
