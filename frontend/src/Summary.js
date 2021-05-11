import {
  Button,
  Card,
  CardMedia,
  CardActions,
  Container,
  Typography,
} from "@material-ui/core";

function SummaryTemplate({ score, restartHandler, text, imgUrl }) {
  return (
    <Card>
      <CardMedia
        image={imgUrl}
        title="A disappointed dog."
        style={{ paddingTop: "56.25%", backgroundSize: "contain" }}
      />
      <CardActions>
        <Container>
          <Typography variant="h6" component="div" paragraph>
            You scored {score} out of 100 points.
          </Typography>
          <Typography paragraph>{text}</Typography>
          <Button
            onClick={restartHandler}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Try again
          </Button>
        </Container>
      </CardActions>
    </Card>
  );
}

function Summary({ score, restartHandler }) {
  let text = "";
  let imgUrl = "";
  if (score <= 30) {
    text = "Don't be sad. You will do better next time!";
    imgUrl = "https://media.giphy.com/media/Pn1gZzAY38kbm/giphy.gif";
  } else if (score <= 70) {
    text = "That's not bad. But you can do better!";
    imgUrl = "https://media.giphy.com/media/kBZBlLVlfECvOQAVno/source.gif";
  } else {
    text = "Great job! You are the number one!";
    imgUrl = "https://media.giphy.com/media/l0Ex3vQtX5VX2YtAQ/source.gif";
  }
  return (
    <SummaryTemplate
      score={score}
      restartHandler={restartHandler}
      text={text}
      imgUrl={imgUrl}
    />
  );
}

export default Summary;
