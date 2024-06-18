
import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestion(data))
  }, []);

  const onAddQuestion = (quizObj) => {
    setQuestion([...question, quizObj]);
  }

  const onHandleDelete = (id) => {
    const questionsDisplayed = question.filter((quiz) => quiz.id !== id)
    setQuestion(questionsDisplayed);
  }

  const onHandleUpdate = (updatedQuestion) => {
    const updatedQuestions = question.map((quiz) => {
      if (quiz.id === updatedQuestion.id) {
        return updatedQuestion;
      }
      return quiz;
    });
    setQuestion(updatedQuestions);
  };


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={onAddQuestion} /> : <QuestionList question={question} onHandleDelete={onHandleDelete} onHandleUpdate={onHandleUpdate} />}
    </main>
  );
}

export default App;
