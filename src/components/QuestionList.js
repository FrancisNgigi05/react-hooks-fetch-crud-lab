import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( { question, onHandleDelete, onHandleUpdate } ) {

  const questionDisplayed = question.map((quiz, index) => {
    return (
      <QuestionItem key={index} question={quiz} onHandleDelete={onHandleDelete} onHandleUpdate={onHandleUpdate} />
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questionDisplayed}
      </ul>
    </section>
  );
}

export default QuestionList;