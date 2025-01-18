import { Card, CssBaseline, Grid2, ThemeProvider } from "@mui/material";
import { Specs } from "./components/gw2/type.ts";
import { theme } from "./components/styling/index.ts";
import Sidebar from "./components/navigation/Sidebar.component.tsx";
import NavigationBar from "./components/navigation/bar.component.tsx";
import { SpecContext } from "./data/spec.context.tsx";
import { useState } from "react";
import SetupTable from "./components/gw2/SetupTable.component.tsx";

function App() {
  const [activeSpec, setSpec] = useState<Specs>(Specs.SLB);

  const handleChange = (_event: React.SyntheticEvent, newValue: Specs) => {
    setSpec(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpecContext.Provider
        value={{
          activeSpec,
          setSpec: handleChange,
          specList: [Specs.SLB, Specs.HARB],
        }}
      >
        <NavigationBar websiteName="Awooo" />
        <Grid2
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mx: 3, my: 1, flexShrink: 1, flexGrow: 0, flexBasis: "auto" }}
        >
          <Grid2 size={2}>
            <Sidebar isPower isCondi />
          </Grid2>
          <Grid2
            size={10}
            sx={{ flexShrink: 0, flexGrow: 1, flexBasis: "auto" }}
            bgcolor={theme.palette.background.paper}
          >
            <SetupTable
              relicId={100090}
              sigilIds={[24615, 24868]}
              consumablesIds={[24615, 24868]}
            />
          </Grid2>
        </Grid2>
      </SpecContext.Provider>
    </ThemeProvider>
  );
}

export default App;
