import { Link as ScrollLink } from "react-scroll";
import { useLocation, Outlet } from "react-router-dom";
// material
import { Box, Link, Container, Typography, Stack } from "@material-ui/core";
// components
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
            position: "relative",
            bgcolor: "background.default",
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Stack
                // direction="column"
                alignItems="center"
                display="flex"
              >
                <img
                  src="/static/btc_logo.svg"
                  alt="Logo"
                  style={{ height: 20, margin: 10 }}
                />
              </Stack>
            </ScrollLink>

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by &nbsp;
              <Link href="https://github.com/tomekgubernat/orderbook-cryp">
                TG
              </Link>
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}
