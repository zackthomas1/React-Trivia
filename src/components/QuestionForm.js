import React, { useState, useEffect, useCallback } from "react";

import Card from "./ui/Card";
import Question from './Question'

/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns random integer from [min, max)
 */
const GenerateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 

const QuestionForm = (props) => {
    // States
    const [usedQuestionIndices, setUsedQuestionIndices] = useState([])
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);
  
    const [question, setQuestion] = useState({            
      id :'',
      question : '',
      options : [],
      answer : 0
    })

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // get request to firebase server to get question
    const fetchQuestion = useCallback(
      async () => {
        setIsLoading(true);
        try{
          const response = await fetch('https://react-trivia-6d4aa-default-rtdb.firebaseio.com/Questions.json')
  
          if(!response.ok){
            throw new Error(`Error: ${response.status} - ${response.statusText}`)
          }
  
          const data = await response.json();
          
          //Select Random Question
          const dataLength = data.length;
          let randomIndex = GenerateRandomNumber(0,dataLength-1); 
          while(usedQuestionIndices.includes(randomIndex)){
            randomIndex = GenerateRandomNumber(0,dataLength-1); 
          }
          console.log(randomIndex)
          console.log("Response data", data[randomIndex]); 
  
          props.setMaxQuizLength(dataLength)
          setCurrentSelectedIndex(randomIndex);
          setQuestion(data[randomIndex]);
        }catch(error){
          setError(error.message);
        }
        setIsLoading(false);
      }, [props, usedQuestionIndices])
  
    useEffect(()=>{
      fetchQuestion();
    },[fetchQuestion])


    // Handlers
    const nextQuestionHandler = () => {
        // update used questions array and select a new question to display
        setUsedQuestionIndices([...usedQuestionIndices, currentSelectedIndex])
        setCurrentSelectedIndex(currentSelectedIndex + 1);

        // increment currentIndex
        props.setQuizCounter(props.quizCounter + 1)
    }

    const submitAnswerHandler = (isAnswerCorrect) => {
        // update the score
        if(isAnswerCorrect){
        props.setScoreTotal(props.scoreTotal + 10);
        }
    }

    // JSX Elements
    let questionElem = ''
    if(isLoading){
        questionElem = <p>Loading</p>
    }else if(error){
        questionElem = <p>{error}</p>
    }else{
        questionElem = (
        <Question
            id={question.id} 
            question={question.question} 
            options={question.options} 
            answer={question.answer}
            onSubmitAnswer={submitAnswerHandler}
            onNextQuestion={nextQuestionHandler}
        />)
    }

    return(
        <Card>
            {questionElem}
        </Card>
    )
}

export default QuestionForm;