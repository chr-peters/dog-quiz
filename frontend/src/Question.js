import { Card, CardMedia, CardActions, Grid, Button } from "@material-ui/core";
import { useState } from "react";

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

function Solution({ submittedAnswer, trueAnswer, nextQuestion }) {
  return <div>Solution here...</div>;
}

function Question({ question, nextQuestion, updateScore }) {
  const [displaySolution, setDisplaySolution] = useState(false);
  const allAnswers = question.wrong_answers.concat([question.true_answer]);
  shuffleArray(allAnswers);

  console.log(question.true_answer);

  function handleAnswer(answer) {
    if (answer === question.true_answer) {
      updateScore();
    }
    setDisplaySolution(true);
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
        {displaySolution && <Solution />}
      </CardActions>
    </Card>
  );
}

export default Question;
