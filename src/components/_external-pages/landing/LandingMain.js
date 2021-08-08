import { motion } from "framer-motion";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, Link, Container, Typography, Stack } from "@material-ui/core";
//
import { varFadeIn, varWrapEnter, varFadeInRight } from "../../animate";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: "auto",
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
    },
  })
);

const OverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

export default function LandingMain() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <OverlayStyle alt="overlay" src="/overlay.svg" variants={varFadeIn} />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h1" sx={{ color: "common.white" }}>
                Discover the <br />
                new
                <Typography
                  component="span"
                  variant="h1"
                  sx={{ color: "primary.main" }}
                >
                  &nbsp;CRYPTO
                </Typography>
                <br />
                order book
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: "common.white" }}>
                This is a simple order book that allows you to check the
                selected currency pair in real time.
              </Typography>
            </motion.div>

            <Stack
              component={motion.div}
              variants={varFadeInRight}
              direction="row"
              spacing={1}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <Link
                underline="always"
                href="https://docs.bitbay.net/"
                target="_blank"
                sx={{ color: "primary.main" }}
              >
                Powered by BitBay API
              </Link>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <motion.img
                variants={varFadeInRight}
                src="/static/bitbay_logo.png"
              />
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: "100vh" } }} />
    </>
  );
}
