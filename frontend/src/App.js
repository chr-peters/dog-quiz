import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Quiz from "./Quiz";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Typography
        className={classes.header}
        variant="h3"
        component="h1"
        align="center"
        noWrap
      >
        🐶Guess the dog!🐶
      </Typography>
      <Quiz />
    </Container>
  );
}

export default App;
