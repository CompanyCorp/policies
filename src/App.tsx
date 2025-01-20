import { CssBaseline, ThemeProvider } from "@mui/material";
// @deno-types="npm:@types/react@18"
import { useState } from "react";
import { Route, useLocation } from "wouter";

import { mainTheme } from "./components/styling/index.ts";
import { SpecContext } from "./data/spec.context.tsx";
import HomePage from "./pages/home.page.tsx";
import {
  CMId,
} from "./gw2/cms.ts";
import { Specs, SpecType, SpecTypeMap } from "./gw2/type.ts";
import Layout from "./components/layout.component.tsx";
import FightPage from "./pages/fight.page.tsx";

function App() {
  const [_path, navigate] = useLocation();
  const [specType, setSpecType] = useState<SpecType>(SpecType.POWER);
  const [activeSpec, setSpec] = useState<Specs>(Specs.SLB);

  const handleChange = (_event: React.SyntheticEvent, newValue: Specs) => {
    setSpec(newValue);

    navigate(`~${_path}?spec=${newValue}`);
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
        <Layout>
          <Route path="/policies" nest>
            <Route path={`/${CMId.Nightmare}`} nest>
              <FightPage />
            </Route>
            <Route path={`/${CMId.ShatteredObservatory}`} nest>
              <FightPage />
            </Route>
            <Route path={`/${CMId.SunquaPeak}`} nest>
              <FightPage />
            </Route>
            <Route path={`/${CMId.SilentSurf}`} nest>
              <FightPage />
            </Route>
            <Route path="/" component={HomePage} />
          </Route>
        </Layout>
      </SpecContext.Provider>
    </ThemeProvider>
  );
}

export default App;
