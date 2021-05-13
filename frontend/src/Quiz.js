import {
  Button,
  Container,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import getQuiz from "./api";
import Question from "./Question";
import Summary from "./Summary";

function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [error, setError] = useState(false);

  function loadQuiz() {
    getQuiz()
      .then((response) => {
        setQuiz(response);
      })
      .catch((error) => setError(true));
  }

  function restart() {
    setQuiz([]);
    setCurrentQuestion(0);
    setCurrentScore(0);
    setError(false);
    loadQuiz();
  }

  useEffect(loadQuiz, []);

  if (error) {
    return (
      <Container>
        <Typography variant="h6" component="div" align="center" paragraph>
          Ooops, something went wrong!
        </Typography>
        <Button
          onClick={restart}
          color="secondary"
          variant="contained"
          style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
        >
          Try again
        </Button>
      </Container>
    );
  }

  if (quiz.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (currentQuestion >= quiz.length) {
    return <Summary score={currentScore} restartHandler={restart} />;
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
        isLastQuestion={currentQuestion === quiz.length - 1}
        nextQuestion={() => setCurrentQuestion(currentQuestion + 1)}
        updateScore={() => setCurrentScore(currentScore + 10)}
      />
    </div>
  );
}

export default Quiz;
