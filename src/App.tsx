import { CssBaseline, ThemeProvider } from "@mui/material";
// @deno-types="npm:@types/react@18"
import { useState } from "react";
import { Route, Router, Switch } from "wouter";

import { mainTheme } from "./components/styling/index.ts";
import { SpecContext } from "./data/spec.context.tsx";
import HomePage from "./pages/home.page.tsx";
import { CMId, NightmareFight } from "./gw2/cms.ts";
import { Specs, SpecType, SpecTypeMap } from "./gw2/type.ts";
import Layout from "./components/MainLayout.component.tsx";
import FightPage from "./pages/fight.page.tsx";
import FractalPage from "./pages/fractal.page.tsx";
import { useHashLocation } from 'wouter/use-hash-location';
import { CookiesProvider, useCookies } from 'react-cookie';

type SpecCookie = {
  specialization: Specs | undefined;
  'specialization-type': SpecType | undefined;
}

function App() {
  const [cookies, setCookie] = useCookies(['specialization', 'specialization-type']) as [SpecCookie,(name: string, value: string) => void];

  const [specType, setSpecType] = useState<SpecType>(cookies['specialization-type'] || SpecType.POWER);
  const [activeSpec, setSpec] = useState<Specs>(cookies['specialization'] || Specs.SLB);

  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: Specs,
  ) => {
    setSpec(newValue);
    setCookie('specialization', newValue);
    setCookie('specialization-type', SpecTypeMap[newValue]);
    setSpecType(SpecTypeMap[newValue]);
  };

  return (
    <CookiesProvider defaultSetOptions={{ path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'Lax', secure: false }}>
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
        <Router hook={useHashLocation}>
        <Layout>
            <Switch>
            <Route path={`${CMId.Nightmare}`} nest>
              <Switch>
                <Route path={`/${NightmareFight.MAMA}`} component={FightPage} />
                <Route path={`/${NightmareFight.Siax}`} component={FightPage} />
                <Route path={`/${NightmareFight.Ensolyss}`} component={FightPage} />
                <Route path="*" component={FractalPage} />
                </Switch>
              </Route>
              <Route path={`${CMId.ShatteredObservatory}`} nest>
                <FightPage />
                <Route path="/" component={FractalPage} />
              </Route>
              <Route path={`${CMId.SunquaPeak}`} nest>
                <FightPage />
                <Route path="/" component={FractalPage} />
              </Route>
              <Route path={`${CMId.SilentSurf}`} nest>
                <FightPage />
                <Route path="/" component={FractalPage} />
              </Route>
              <Route path="*" component={HomePage} />
            </Switch>
        </Layout>
        </Router>
      </SpecContext.Provider>
    </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
