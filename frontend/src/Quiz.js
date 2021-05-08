import { Typography, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import getQuiz from "./api";
import Question from "./Question";

function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  function loadQuiz() {
    getQuiz().then((response) => setQuiz(response));
  }

  useEffect(loadQuiz, []);

  if (quiz.length === 0) {
    return <div>Loading screen here...</div>;
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6" component="div">
            Dog {currentQuestion + 1} of {quiz.length}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right" component="div">
            Score: {currentScore}
          </Typography>
        </Grid>
      </Grid>
      <Question
        question={quiz[currentQuestion]}
        nextQuestion={() => setCurrentQuestion(currentQuestion + 1)}
        updateScore={() => setCurrentScore(currentScore + 10)}
      />
    </div>
  );
}

export default Quiz;