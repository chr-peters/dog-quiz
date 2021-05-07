import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Button,
} from "@material-ui/core";

function Quiz() {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6" component="div">
            Dog 1 of 10
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right" component="div">
            Score: 0
          </Typography>
        </Grid>
      </Grid>
      <Card>
        <CardMedia
          image="https://cdn2.thedogapi.com/images/HyJvcl9N7_1280.jpg"
          title="A cute dog."
          style={{ paddingTop: "56.25%" }}
        />
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                style={{ textTransform: "none" }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Labrador
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ textTransform: "none" }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Pug
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ textTransform: "none" }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Golden Retriever
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ textTransform: "none" }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                German Shepherd
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}

export default Quiz;
