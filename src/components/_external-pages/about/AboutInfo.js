// material
import { Box, Container, Typography, Grid } from "@material-ui/core";
//
import { varFadeInUp, MotionInView } from "../../animate";

// ----------------------------------------------------------------------

export default function AboutInfo() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              My name is Tomasz and I created this application only for
              training.
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}
