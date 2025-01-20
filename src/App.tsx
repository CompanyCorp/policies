import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "wouter";

import { mainTheme } from "./components/styling/index.ts";
import { SpecContext } from "./data/spec.context.tsx";
import HomePage from "./pages/home.page.tsx";
import NightmarePage from "./pages/nightmare.page.tsx";
import { CMId } from "./gw2/cms.ts";
import { Specs, SpecType, SpecTypeMap } from "./gw2/type.ts";

function App() {
  const [specType, setSpecType] = useState<Specs>(SpecType.POWER);
  const [activeSpec, setSpec] = useState<Specs>(Specs.SLB);

  const handleChange = (_event: React.SyntheticEvent, newValue: Specs) => {
    setSpec(newValue);
    setSpecType(SpecTypeMap[newValue]);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <SpecContext.Provider
        value={{
          activeSpec,
          setSpec: handleChange,
          specList: [Specs.SLB, Specs.HARB],
          specType,
        }}
      >
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path={`/${CMId.Nightmare}`} component={NightmarePage} />
        </Switch>
      </SpecContext.Provider>
    </ThemeProvider>
  );
}

export default App;
