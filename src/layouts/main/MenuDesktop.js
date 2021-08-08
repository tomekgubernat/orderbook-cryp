import PropTypes from "prop-types";

import { NavLink as RouterLink, useLocation } from "react-router-dom";

// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, Link, Stack } from "@material-ui/core";

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shortest,
  }),
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(["subheader", "item"]),
};

function IconBullet({ type = "item" }) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}

MenuDesktopItem.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
};

function MenuDesktopItem({ item, pathname, isHome, isOffset }) {
  const { title, path, children } = item;
  const isActive = pathname === path;

  return (
    <LinkStyle
      key={title}
      to={path}
      component={RouterLink}
      sx={{
        ...(isHome && { color: "common.white" }),
        ...(isOffset && { color: "text.primary" }),
        ...(isActive && { color: "primary.main" }),
      }}
    >
      {title}
    </LinkStyle>
  );
}

MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
  const { pathname } = useLocation();

  return (
    <Stack direction="row">
      {navConfig.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          pathname={pathname}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}
