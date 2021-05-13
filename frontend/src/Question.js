import {
  Typography,
  Card,
  CardMedia,
  CardActions,
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import { useState } from "react";
const indefinite = require("indefinite");

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function AnswerGroup({ answers, handleAnswer }) {
  return (
    <Grid container spacing={1}>
      {answers.map((answer) => {
        return (
          <Grid item xs={6} key={answer}>
            <Button
              style={{ textTransform: "none" }}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}

function Solution({
  submittedAnswer,
  trueAnswer,
  nextQuestion,
  isLastQuestion,
}) {
  return (
    <Container>
      <Typography variant="h6" align="center" paragraph={true}>
        {submittedAnswer === trueAnswer
          ? "You're right! 🥳"
          : "That's not correct. 😢"}
      </Typography>
      <Typography paragraph={true}>
        This is {indefinite(trueAnswer)}.
      </Typography>
      <Button
        onClick={nextQuestion}
        variant="contained"
        color="secondary"
        fullWidth
      >
        {isLastQuestion ? "See Results" : "Next Question"}
      </Button>
    </Container>
  );
}

function Question({ question, isLastQuestion, nextQuestion, updateScore }) {
  const [displaySolution, setDisplaySolution] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  const allAnswers = question.wrong_answers.concat([question.true_answer]);
  shuffleArray(allAnswers);

  function handleAnswer(answer) {
    if (answer === question.true_answer) {
      updateScore();
    }
    setSubmittedAnswer(answer);
    setDisplaySolution(true);
  }

  function handleNextQuestion() {
    setDisplaySolution(false);
    nextQuestion();
  }

  return (
    <Card>
      <CardMedia
        image={question.img_url}
        title="A cute dog."
        style={{ paddingTop: "56.25%", backgroundSize: "contain" }}
      />
      <CardActions>
        {!displaySolution && (
          <AnswerGroup answers={allAnswers} handleAnswer={handleAnswer} />
        )}
        {displaySolution && (
          <Solution
            isLastQuestion={isLastQuestion}
            submittedAnswer={submittedAnswer}
            trueAnswer={question.true_answer}
            nextQuestion={handleNextQuestion}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default Question;
