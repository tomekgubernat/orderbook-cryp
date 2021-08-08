// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
// components
import Page from "../components/Page";
import AboutInfo from "../components/_external-pages/about/AboutInfo";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function About() {
  return (
    <RootStyle title="About">
      <AboutInfo />
    </RootStyle>
  );
}
