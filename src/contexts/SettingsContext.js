import { createContext } from "react";
// theme
import palette from "../theme/palette";

// ----------------------------------------------------------------------

const PRIMARY_COLOR = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#fbc988",
    light: "#f9ae4d",
    main: "#f79413",
    dark: "#c07006",
    darker: "#804a04",
    contrastText: "#fff",
  },
];

const initialState = {
  themeMode: "light",
  themeDirection: "ltr",
  themeColor: "default",
  setColor: PRIMARY_COLOR[1],
  colorOption: [],
};

const SettingsContext = createContext(initialState);

export { SettingsContext };
