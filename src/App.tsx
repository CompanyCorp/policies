import { CssBaseline, ThemeProvider } from "@mui/material";
// @deno-types="npm:@types/react@18"
import { useState } from "react";
import { Route, useLocation, useSearch } from "wouter";

import { mainTheme } from "./components/styling/index.ts";
import { SpecContext } from "./data/spec.context.tsx";
import HomePage from "./pages/home.page.tsx";
import { CMId } from "./gw2/cms.ts";
import { Specs, SpecType, SpecTypeMap } from "./gw2/type.ts";
import Layout from "./components/Layout.component.tsx";
import FightPage from "./pages/fight.page.tsx";
import FractalPage from "./pages/fractal.page.tsx";

function App() {
  const [_path, navigate] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);

  const [specType, setSpecType] = useState<SpecType>(
    SpecTypeMap[searchParams.get("spec") as Specs] || SpecType.POWER,
  );
  const [activeSpec, setSpec] = useState<Specs>(
    searchParams.get("spec") as Specs || Specs.SLB,
  );

  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: Specs,
  ) => {
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
              <Route path="/" component={FractalPage} />
            </Route>
            <Route path={`/${CMId.ShatteredObservatory}`} nest>
              <FightPage />
              <Route path="/" component={FractalPage} />
            </Route>
            <Route path={`/${CMId.SunquaPeak}`} nest>
              <FightPage />
              <Route path="/" component={FractalPage} />
            </Route>
            <Route path={`/${CMId.SilentSurf}`} nest>
              <FightPage />
              <Route path="/" component={FractalPage} />
            </Route>
            <Route path="/" component={HomePage} />
          </Route>
        </Layout>
      </SpecContext.Provider>
    </ThemeProvider>
  );
}

export default App;
