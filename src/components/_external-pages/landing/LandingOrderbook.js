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

import OrderTable from "./OrderTable";

//utils
import axios from "../../../utils/axios";

import { useState, useEffect } from "react";

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

const data = {
  status: "Ok",
  sell: [
    {
      ra: "25285.31",
      ca: "0.02839638",
      sa: "0.02839638",
      pa: "0.02839638",
      co: 1,
    },
  ],
  buy: [
    {
      ra: "25280",
      ca: "0.82618498",
      sa: "3.59999",
      pa: "0.82618498",
      co: 1,
    },
  ],
  timestamp: "1529512856512",
  seqNo: "139098",
};

// ----------------------------------------------------------------------

export default function LandingOrderbook() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [dataFromApi, setDataFromApi] = useState();

  const fetchData = async () => {
    const limit = 10;

    try {
      const response = await axios.get(
        `/trading/orderbook-limited/BTC-PLN/${limit}`
      );
      console.log(response);
      if (response.data.status === "Ok") setDataFromApi(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('Data is fetching every second!');
  //     fetchData();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const selectedCurrency = "USD";

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
                  <OrderTable
                    data={dataFromApi}
                    type={card.title}
                    currency={selectedCurrency}
                  />
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
