import { CssBaseline, ThemeProvider } from "@mui/material";
// @deno-types="npm:@types/react@18"
import { useState } from "react";
import { Route, Router, Switch } from "wouter";

import { mainTheme } from "./components/styling/index.ts";
import { SpecContext } from "./data/spec.context.tsx";
import HomePage from "./pages/home.page.tsx";
import NightmarePage from "./pages/nightmare.page.tsx";
import { CMId } from "./gw2/cms.ts";
import { Specs, SpecType, SpecTypeMap } from "./gw2/type.ts";
import ShatteredPage from "./pages/shattered.page.tsx";
import { useHashLocation } from "wouter/use-hash-location";

function App() {
  const [specType, setSpecType] = useState<SpecType>(SpecType.POWER);
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
          <Router hook={useHashLocation}>
              <Route path={`/${CMId.Nightmare}`} component={NightmarePage} nest/>
              <Route path={`/${CMId.ShatteredObservatory}`} component={ShatteredPage} nest/>
              <Route path="/" component={HomePage} />
          </Router>
        </Switch>
      </SpecContext.Provider>
    </ThemeProvider>
  );
}

export default App;
