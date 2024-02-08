import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  // This is where I will display the questions
  const [questions, setQuestions] = useState([]);

  // Using useEffect to fetch the data to be displayed from the server
  useEffect(() => {
    // Fetching the data from the server
    fetch("http://localhost:4000/questions")
      // Converting the data to json format
      .then((response) => response.json())
      // The data to be displayed after fetching
      .then((quizes) => setQuestions(quizes))
  },[]); // Empty array dependency since i just want to render the questions once and for all

  // Mapping over the
  // Function that will handle the deletion of question
  function handleDelete(id) {
    // Fetching data from the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE", // Informing the server that I want to delete 
    })
    // Converting the data from the server to json format
      .then((response) => response.json())
      .then(() => {
        // return false if the button clicked in the question matches the id of the question
        const updatedQuizes = questions.filter((quiz) => {
          return (quiz.id !== id);
        })
        // Setting the state of original questions to the updated questions
        setQuestions(updatedQuizes);
      })
  }

  function handleChangeOfAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH", // Updating a part of the data
      "Content-Type": "application/json",
      body: JSON.stringify({ correctIndex }) // stringifying the data to be updated
    })
    // Converting the data to be used to json format
      .then((response) => response.json())
      .then((updatedQuiz) => {
        const updatedQuizes = questions.map((quiz) => {
          if(quiz.id === updatedQuiz.id) {
            return (updatedQuiz);
          }
          else {
            return (quiz);
          }
        });
        setQuestions(updatedQuizes);
      })
  }
  const questionItems = questions.map((oneQuestion) => {
    return (
      <QuestionItem key={oneQuestion.id} question={oneQuestion} onDelete={handleDelete} onChangeOfAnswer={handleChangeOfAnswer}/>
    )
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> { questionItems } </ul>
    </section>
  );
}

export default QuestionList;
