// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
//
import { varFadeInUp, MotionInView, varFadeInDown } from "../../animate";

//import OrderTable from "./OrderTable";

// ----------------------------------------------------------------------

const ORDERS = [
  {
    title: "BID",
    description: "Buy orders",
  },
  {
    title: "ASL",
    description: "Sell orders",
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(5),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 480,
    minHeight: 600,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(10, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up("md")]: {
      boxShadow: "none",
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    "&.cardLeft": {
      [theme.breakpoints.up("md")]: { marginTop: -40 },
    },
    "&.cardCenter": {
      [theme.breakpoints.up("md")]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        "&:before": {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: "auto",
          position: "absolute",
          width: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function LandingOrderbook() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              component="p"
              variant="overline"
              sx={{ mb: 2, color: "text.secondary", textAlign: "center" }}
            >
              orderbook
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Check out the best odds below
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {ORDERS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={6}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle className="cardCenter">
                  <Typography
                    variant="h5"
                    paragraph
                    sx={{ color: card.title === "BID" ? "green" : "red" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: isLight ? "text.secondary" : "common.white",
                      mb: 2,
                    }}
                  >
                    {card.description}
                  </Typography>
                  {/* <OrderTable /> */}
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
