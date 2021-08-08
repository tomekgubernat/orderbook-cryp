import * as React from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

// ----------------------------------------------------------------------

export default function LandingOrderbook() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [code, setCode] = React.useState("BTC-PLN");
  const [codeList, setCodeList] = React.useState([]);
  const [selectedCurrency, setSelectedCurrency] = React.useState("PLN");
  const [statistics, setStatistics] = React.useState();

  const [orderbook, setOrderbook] = useState();

  const fetchData = async () => {
    const limit = 10;

    try {
      const response = await axios.get(
        `/trading/orderbook-limited/${code}/${limit}`
      );
      //console.log("fetchData", response);
      if (response.data.status === "Ok") setOrderbook(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`/trading/stats/${code}`);
      //console.log("fetchStatistics", response);
      if (response.data.status === "Ok") setStatistics(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTicker = async () => {
    try {
      const response = await axios.get(`/trading/ticker`);
      //console.log("fetchTicker", response);
      let codeList = await createCodeList(response.data);
      setCodeList(codeList);
    } catch (error) {
      console.error(error);
    }
  };

  const createCodeList = (data) => {
    let codeList = [];
    Object.entries(data.items).forEach(([key]) => {
      codeList.push({
        value: key,
      });
    });
    return codeList;
  };

  const getCurrencyName = (code) => {
    const words = code.split("-");
    return words[1];
  };

  useEffect(() => {
    fetchData();
    fetchTicker();
    fetchStatistics();
  }, []);

  useEffect(() => {
    const fetchNewData = async () => {
      await fetchData();
      fetchStatistics();
    };

    fetchNewData();
  }, [code]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Data is fetching every 5 seconds!");
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event) => {
    setCode(event.target.value);
    let codeName = getCurrencyName(event.target.value);
    setSelectedCurrency(codeName);
  };

  const countSpread = () => {
    let bidPrice = orderbook?.buy ? orderbook.buy?.[0]?.ra : 0;
    let askPrice = orderbook?.sell ? orderbook.sell?.[0]?.ra : 0;
    let result = (askPrice - bidPrice).toFixed(2);
    return result;
  };

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 10 } }}>
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

        <Box sx={{ mb: { xs: 10, md: 20 } }}>
          <Grid container spacing={isDesktop ? 10 : 5}>
            <Grid item xs={12} md={3} alignItems="center">
              <MotionInView variants={varFadeInUp}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={code}
                    // label="Pair"
                    onChange={handleChange}
                    sx={{ textAlign: "center" }}
                  >
                    {codeList.map((code) => (
                      <MenuItem value={code.value}>{code.value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: "text.secondary", textAlign: "center" }}
                >
                  spread
                </Typography>

                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  {countSpread()}
                </Typography>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: "text.secondary", textAlign: "center" }}
                >
                  Highest • 24H
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", color: "green" }}
                >
                  {statistics?.h || 0}
                </Typography>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: "text.secondary", textAlign: "center" }}
                >
                  Lowest • 24h
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", color: "red" }}
                >
                  {statistics?.l || 0}
                </Typography>
              </MotionInView>
            </Grid>
          </Grid>
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
                    data={orderbook}
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
