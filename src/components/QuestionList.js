import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  // This is where I will display the qsns
  const [questions, setQuestions] = useState('');

  // Using useEffect to fetch the data to be displayed from the server
  useEffect(() => {
    // Fetching the data from the server
    fetch("http://localhost:4000/questions")
      // Converting the data to json format
      .then((response) => response.json())
      // The data to be dsiplayed after fetching
      .then((question) => setQuestions(question))
  },[]); // Empty array dependancy since i just want to render the questions once and for all

  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>  </ul>
    </section>
  );
}

export default QuestionList;
