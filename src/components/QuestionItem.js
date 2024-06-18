import React, { useState } from "react";

function QuestionItem({ question, onHandleDelete, onHandleUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correctAnswer, setCorrectAnswer] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleAnswerChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    setCorrectAnswer(newCorrectIndex);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctIndex : newCorrectIndex})
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        onHandleUpdate(data)
      })
  }
  
  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(()=>onHandleDelete(id));
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctAnswer} onClick={handleAnswerChange} >{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;