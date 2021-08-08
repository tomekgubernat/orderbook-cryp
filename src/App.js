import { useState, useEffect } from "react";
// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";

import LoadingScreen from "./components/LoadingScreen";
import ThemePrimaryColor from "./components/ThemePrimaryColor";

function App() {
  const delay = 1;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer1 = setTimeout(() => setLoading(true), delay * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        {loading ? <Router /> : <LoadingScreen />}
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}

export default App;
